import MigrationRepositoryInterface from "../interfaces/migration_repository_interface.ts";
import MigrationEntityInterface from "../interfaces/entities/migration_entity_interface.ts";

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
    this.query = `select * from ${this.tableName} order by id desc limit 1;`;
    return this;
  }

  lastStepMigrations(): MigrationRepositoryInterface {
    this.query = `select * from ${this.tableName} where step = (select max(step) from migrations);`;
    return this;
  }

  removeAllLastStep(): MigrationRepositoryInterface {
    this.query = `delete from ${this.tableName} where step = (select max(step) from migrations);`;
    return this;
  }

  async execute(): Promise<void> {
  }

  async first(): Promise<MigrationEntityInterface | null> {
    return null;
  }

  async get(): Promise<Array<MigrationEntityInterface>> {
    return [{file_name: 't', step: 2}]
  }

  toSql(): string {
    return this.query;
  }
}

export default SqliteMigrationRepository;
