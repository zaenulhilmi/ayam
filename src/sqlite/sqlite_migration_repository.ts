import MigrationRepositoryInterface from "../interfaces/migration_repository_interface.ts";
import MigrationEntityInterface from "../interfaces/entities/migration_entity_interface.ts";

class SqliteMigrationRepository implements MigrationRepositoryInterface {
  query: string = '';

  create(): MigrationRepositoryInterface {
    this.query = `create table migrations (id integer primary key autoincrement, file_name varchar(255), step integer, created_at text, updated_at text);`;
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

  insert(fileName: string, step: number): MigrationRepositoryInterface {
    return this;
  }

  lastMigration(): MigrationRepositoryInterface {
    return this;
  }

  lastStepMigrations(): MigrationRepositoryInterface {
    return this;
  }

  removeAllLastStep(): MigrationRepositoryInterface {
    return this;
  }

  toSql(): string {
    return this.query;
  }
}

export default SqliteMigrationRepository;
