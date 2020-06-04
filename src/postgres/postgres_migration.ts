import MigrationInterface from "./../interfaces/migration_interface.ts";
import MigrationRepositoryInterface from "../interfaces/migration_repository_interface.ts";
import postgres from "../driver/postgres.ts";

class PostgresMigration implements MigrationInterface {
  migrationRepo: MigrationRepositoryInterface;

  constructor(migrationRepo: MigrationRepositoryInterface) {
    this.migrationRepo = migrationRepo;
  }

  async migrate(): Promise<void> {
    console.log("postgres migrate");
  }

  async rollback(): Promise<void> {
    console.log("postgres rollback");
  }
}

export default PostgresMigration;
