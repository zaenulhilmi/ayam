import CommandInterface from "./interfaces/command_interface.ts";
import MigrationInterface from "./interfaces/migration_interface.ts";

class Migrate implements CommandInterface {
  migration: MigrationInterface;

  constructor(migration: MigrationInterface) {
    this.migration = migration;
  }
  async execute(): Promise<void> {
    this.migration.migrate();
  }
  async undo(): Promise<void> {
    this.migration.rollback();
  }
}

export default Migrate;
