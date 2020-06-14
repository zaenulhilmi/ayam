import MigrationRepositoryInterface from "../interfaces/migration_repository_interface.ts";
import MigrationEntityInterface from "../interfaces/entities/migration_entity_interface.ts";
import sqlite from "./../driver/sqlite.ts"

class SqliteMigrationRepository implements MigrationRepositoryInterface {
  query: string = '';
  tableName: string = 'migrations'

  create(): MigrationRepositoryInterface {
    this.query = `create table ${this.tableName} (id integer primary key autoincrement, file_name varchar(255), step integer, created_at text, updated_at text);`;
    return this;
  }

  insert(fileName: string, step: number): MigrationRepositoryInterface {
    this.query = `insert into ${this.tableName} (file_name, step) values ('${fileName}', '${step}');`
    return this;
  }

  lastMigration(): MigrationRepositoryInterface {
    this.query = `select id, file_name, step, created_at, updated_at from ${this.tableName} order by id desc limit 1;`;
    return this;
  }

  lastStepMigrations(): MigrationRepositoryInterface {
    this.query = `select id, file_name, step, created_at, updated_at from ${this.tableName} where step = (select max(step) from migrations);`;
    return this;
  }

  removeAllLastStep(): MigrationRepositoryInterface {
    this.query = `delete from ${this.tableName} where step = (select max(step) from migrations);`;
    return this;
  }

  async execute(): Promise<void> {
    let client = await sqlite.getInstance()
    await client.query(this.query)
  }

  async first(): Promise<MigrationEntityInterface | null> {
    let client = await sqlite.getInstance()
    let rows = client.query(this.query)
    let migration: MigrationEntityInterface
    for (const [id, file_name, step, created_at, updated_at] of rows){
      migration = {
        id,
        file_name,
        step,
        created_at,
        updated_at
      }
      rows.done();
      return migration
    }
    return null
  }

  async get(): Promise<Array<MigrationEntityInterface>> {
    let migrations : Array<MigrationEntityInterface> = []
    let client = await sqlite.getInstance()
    for (const [id, file_name, step, created_at, updated_at] of client.query(this.query)){
      let migration: MigrationEntityInterface = {
        id,
        file_name,
        step,
        created_at,
        updated_at
      }
      migrations.push(migration)
    }
    return migrations
  }

  toSql(): string {
    return this.query;
  }
}

export default SqliteMigrationRepository;
