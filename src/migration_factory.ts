import MysqlMigration from "./mysql/mysql_migration.ts";
import MigrationInterface from "./interfaces/migration_interface.ts";
import PostgresMigration from "./postgres/postgres_migration.ts";

class MigrationFactory {
  dialect: string;
  constructor(dialect: string) {
    this.dialect = dialect;
  }

  get(): MigrationInterface {
    switch (this.dialect) {
      case "mysql":
        return new MysqlMigration();
      case "postgres":
        return new PostgresMigration();
    }
    throw new Error("dialect is not defined");
  }
}

export default MigrationFactory;
