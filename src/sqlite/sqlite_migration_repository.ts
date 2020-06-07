import MigrationRepositoryInterface from "../interfaces/migration_repository_interface.ts";

class SqliteMigrationRepository implements MigrationRepositoryInterface {
  query: string;

  create(): MigrationRepositoryInterface {
    return undefined;
  }

  execute(): Promise<void> {
    return Promise.resolve(undefined);
  }

  first(): Promise<MigrationEntityInterface | null> {
    return Promise.resolve(undefined);
  }

  get(): Promise<Array<MigrationEntityInterface>> {
    return Promise.resolve(undefined);
  }

  insert(fileName: string, step: number): MigrationRepositoryInterface {
    return undefined;
  }

  lastMigration(): MigrationRepositoryInterface {
    return undefined;
  }

  lastStepMigrations(): MigrationRepositoryInterface {
    return undefined;
  }

  removeAllLastStep(): MigrationRepositoryInterface {
    return undefined;
  }

  toSql(): string {
    return "";
  }
}

export default SqliteMigrationRepository;
