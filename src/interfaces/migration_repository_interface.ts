import MigrationEntityInterface from "./entities/migration_entity_interface.ts";

interface MigrationRepositoryInterface {
  query: string;
  create(): MigrationRepositoryInterface;
  insert(fileName: string, step: number): MigrationRepositoryInterface;
  lastMigration(): MigrationRepositoryInterface;
  lastStepMigrations(): MigrationRepositoryInterface;
  removeAllLastStep(): MigrationRepositoryInterface;

  execute(): Promise<void>;
  get(): Promise<Array<MigrationEntityInterface>>;
  first(): Promise<MigrationEntityInterface | null>;
  toSql(): string;
}

export default MigrationRepositoryInterface;
