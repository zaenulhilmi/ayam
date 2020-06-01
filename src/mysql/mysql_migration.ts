import MigrationInterface from "./../interfaces/migration_interface.ts";
import mysql from "./../driver/mysql.ts";
import MySqlSchema from "./mysql_schema.ts";
import SchemaInterface from "./../interfaces/schema_interface.ts";
import BuilderInterface from "./../interfaces/builder_interface.ts";
import Configuration from "./../configuration.ts";
import MysqlSchemaRepository from "./mysql_schema_repository.ts";

interface MigrationData {
  id?: number;
  file_name: string;
  step: number;
  created_at?: Date;
  updated_at?: Date;
}

class MysqlMigration implements MigrationInterface {
  data: Array<MigrationData> = [];

  async migrate(): Promise<void> {
    await this._createMigrationTableIfNotExist();
    let lastMigration = await this._getLastMigrationData();
    this.data = await this._getSortedUnexecutedMigrationData(lastMigration);
    await this._executeData();
  }

  async rollback(): Promise<void> {
    let lastStepMigration = await this._getLastStepData();
    await this._executeLastStepData(lastStepMigration);
  }

  async _createMigrationTableIfNotExist(): Promise<void> {
    let schema: SchemaInterface = new MySqlSchema(new MysqlSchemaRepository());
    let dirExist = await schema.hasTable("migrations");
    if (dirExist) {
      return;
    }
    schema.create("migrations", async (table: BuilderInterface) => {
      table.id();
      table.string("file_name");
      table.integer("step");
      table.timestamps();
    });
  }

  async _getLastMigrationData(): Promise<MigrationData> {
    let lastMigration = await mysql.query(
      "SELECT * FROM migrations ORDER BY id DESC LIMIT 1",
    );
    if (lastMigration.length > 0) {
      return lastMigration[0];
    }
    return {
      id: 0,
      file_name: "lala",
      step: 0,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  async _getSortedUnexecutedMigrationData(
    lastMigration: MigrationData,
  ): Promise<Array<MigrationData>> {
    let config = await Configuration.newInstance();
    let migrationDir = await config.get("migrationDirectory");

    let result: Array<string> = [];
    if (lastMigration.id == 0) {
      for await (let dir of await Deno.readDir(migrationDir)) {
        if (dir.name.startsWith("20") && dir.name.endsWith(".ts")) {
          result.push(dir.name);
        }
      }
    } else {
      for await (let dir of await Deno.readDir(migrationDir)) {
        if (
          dir.name.startsWith("20") && dir.name.endsWith(".ts") &&
          dir.name > lastMigration.file_name
        ) {
          result.push(dir.name);
        }
      }
    }

    result.sort();

    let objectResult: Array<MigrationData> = [];
    for await (let fileName of result) {
      let data = { file_name: fileName, step: lastMigration.step + 1 };
      objectResult.push(data);
    }
    return objectResult;
  }

  async _executeData() {
    let config = await Configuration.newInstance();
    let migrationDir = await config.get("migrationDirectory");
    let projectDir = await Deno.cwd();
    for await (let x of this.data) {
      let Class =
        (await import(`${projectDir}/${migrationDir}/${x.file_name}`)).default;
      let mysqlSchemaRepository = new MySqlSchema(new MysqlSchemaRepository());
      let object = new Class();
      await mysql.execute(
        `INSERT INTO migrations SET file_name=?, step=?`,
        [x.file_name, x.step],
      );
      await object.up(mysqlSchemaRepository);
    }
  }

  async _getLastStepData() {
    let lastMigration = await mysql.query(
      "SELECT * FROM migrations WHERE step = (SELECT MAX(step) FROM migrations)",
    );
    if (lastMigration.length > 0) {
      return lastMigration;
    }
    return {
      id: 0,
      file_name: "lala",
      step: 0,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  async _executeLastStepData(lastStepMigrations: Array<MigrationData>) {
    let config = await Configuration.newInstance();
    let migrationDir = await config.get("migrationDirectory");
    let projectDir = await Deno.cwd();
    for await (let x of lastStepMigrations) {
      let Class =
        (await import(`${projectDir}/${migrationDir}/${x.file_name}`)).default;
      let mysqlSchemaRepository = new MySqlSchema(new MysqlSchemaRepository());
      let object = new Class();
      await mysql.execute(`DELETE FROM migrations WHERE id=?`, [x.id]);
      await object.down(mysqlSchemaRepository);
    }
  }
}

export default MysqlMigration;
