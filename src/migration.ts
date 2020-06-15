import MigrationInterface from "./interfaces/migration_interface.ts";
import SchemaInterface from "./interfaces/schema_interface.ts";
import Configuration from "./configuration.ts";
import MigrationRepositoryInterface from "./interfaces/migration_repository_interface.ts";
import SchemaFactory from "./schema_factory.ts";
import MigrationEntityInterface from "./interfaces/entities/migration_entity_interface.ts";

class Migration implements MigrationInterface {
  data: Array<MigrationEntityInterface> = [];
  migrationRepo: MigrationRepositoryInterface;
  dialect: string;

  constructor(migrationRepo: MigrationRepositoryInterface) {
    this.migrationRepo = migrationRepo;
    if (this.migrationRepo.constructor.name == "MysqlMigrationRepository") {
      this.dialect = "mysql";
    } else if (
      this.migrationRepo.constructor.name == "PostgresMigrationRepository"
    ) {
      this.dialect = "postgres";
    } else if(this.migrationRepo.constructor.name == "SqliteMigrationRepository") {
      this.dialect = "sqlite";
    }else {
      throw new Error(`migration repository doesn't exist`);
    }
  }

  async migrate(): Promise<void> {
    await this._createMigrationTableIfNotExist();
    let lastMigration = await this._getLastMigrationEntity();
    this.data = await this._getSortedQueuedMigrationEntity(lastMigration);
    await this.executeData();
  }

  async rollback(): Promise<void> {
    let lastStepMigration = await this.getLastStepMigrations();
    await this.executeLastStepData(lastStepMigration);
  }

  async _createMigrationTableIfNotExist(): Promise<void> {
    let schema: SchemaInterface = new SchemaFactory(this.dialect).get();
    let dirExist = await schema.hasTable("migrations");
    if (dirExist) {
      return;
    }
    await this.migrationRepo.create().execute();
  }

  async _getLastMigrationEntity(): Promise<MigrationEntityInterface | null> {
    let lastMigration = await this.migrationRepo.lastMigration().first();
    if (!lastMigration) {
      return null;
    }
    return lastMigration;
  }

  async _getSortedQueuedMigrationEntity(
    lastMigration: MigrationEntityInterface | null,
  ): Promise<Array<MigrationEntityInterface>> {
    let config = await Configuration.newInstance();
    let migrationDir = await config.get("migrationDirectory");
    let result: Array<string> = [];

    if (lastMigration) {
      for await (let dir of await Deno.readDir(migrationDir)) {
        if (
          dir.name.startsWith("20") && dir.name.endsWith(".ts") &&
          dir.name > lastMigration.file_name
        ) {
          result.push(dir.name);
        }
      }
    } else {
      for await (let dir of await Deno.readDir(migrationDir)) {
        if (dir.name.startsWith("20") && dir.name.endsWith(".ts")) {
          result.push(dir.name);
        }
      }
    }

    result.sort();

    let objectResult: Array<MigrationEntityInterface> = [];
    let step = lastMigration ? lastMigration.step + 1 : 1;
    for await (let fileName of result) {
      let data: MigrationEntityInterface = { file_name: fileName, step: step };
      objectResult.push(data);
    }
    return objectResult;
  }

  private async executeData() {
    let config = await Configuration.newInstance();
    let migrationDir = await config.get("migrationDirectory");
    let projectDir = await Deno.cwd();
    for await (let x of this.data) {
      let Class =
        (await import(`${projectDir}/${migrationDir}/${x.file_name}`)).default;
      let schema: SchemaInterface = new SchemaFactory(this.dialect).get();
      let object = new Class();
      await this.migrationRepo.insert(x.file_name, x.step).execute();
      await object.up(schema);
    }
  }

  private async getLastStepMigrations(): Promise<Array<MigrationEntityInterface>> {
    return await this.migrationRepo.lastStepMigrations().get();
  }

  private async executeLastStepData(
    lastStepMigrations: Array<MigrationEntityInterface>,
  ) {
    let config = await Configuration.newInstance();
    let migrationDir = await config.get("migrationDirectory");
    let projectDir = await Deno.cwd();
    for await (let x of lastStepMigrations) {
      let Class =
        (await import(`${projectDir}/${migrationDir}/${x.file_name}`)).default;
      let schema: SchemaInterface = new SchemaFactory(this.dialect).get();
      let object = new Class();
      await object.down(schema);
    }
    await this.migrationRepo.removeAllLastStep().execute();
  }
}

export default Migration;
