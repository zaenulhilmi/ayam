import MigrationRepositoryInterface from "../interfaces/migration_repository_interface.ts";
import postgres from "./../driver/postgres.ts";
import MigrationEntityInterface from "../interfaces/entities/migration_entity_interface.ts";

class PostgresMigrationRepository implements MigrationRepositoryInterface {
  tableName: string = "migrations";
  query: string = "";

  create(): MigrationRepositoryInterface {
    this.query =
      `create table ${this.tableName} (id bigserial primary key, file_name varchar(255) not null, step int not null, created_at timestamp default current_timestamp, updated_at timestamp default current_timestamp);`;
    return this;
  }

  insert(fileName: string, step: number): MigrationRepositoryInterface {
    this.query =
      `insert into ${this.tableName} (file_name, step) values ('${fileName}', '${step}');`;
    return this;
  }

  lastMigration(): MigrationRepositoryInterface {
    this.query = `select * from migrations order by id desc limit 1;`;
    return this;
  }

  lastStepMigrations(): MigrationRepositoryInterface {
    this.query =
      `select * from migrations where step = (select max(step) from migrations);`;
    return this;
  }

  removeAllLastStep(): MigrationRepositoryInterface {
    this.query =
      `delete from migrations where step in (select max(step) from migrations);`;
    return this;
  }

  async execute(): Promise<void> {
    let client = await postgres.getInstance();
    await client.query(this.query);
  }

  async get(): Promise<Array<MigrationEntityInterface>> {
    let client = await postgres.getInstance();
    let result = await client.query(this.query);
    let migrations: Array<MigrationEntityInterface> = [];
    for (let row of result.rows) {
      let migration: MigrationEntityInterface = {
        id: row[0],
        file_name: row[1],
        step: row[2],
        created_at: row[3],
        updated_at: row[4],
      };
      migrations.push(migration);
    }
    return migrations;
  }

  async first(): Promise<MigrationEntityInterface | null> {
    let client = await postgres.getInstance();
    let result = await client.query(this.query);
    if (result.rows.length == 0) {
      return null;
    }
    let row = result.rows[0];
    let migration: MigrationEntityInterface = {
      id: row[0],
      file_name: row[1],
      step: row[2],
      created_at: row[3],
      updated_at: row[4],
    };
    return migration;
  }

  toSql(): string {
    return this.query;
  }
}

export default PostgresMigrationRepository;
