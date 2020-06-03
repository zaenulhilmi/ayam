import MysqlMigration from "./mysql/mysql_migration.ts";
import MysqlMigrationRepository from "./mysql/mysql_migration_repository.ts";
import MigrationInterface from "./interfaces/migration_interface.ts";
import PostgresMigration from "./postgres/postgres_migration.ts";
import PostgresMigrationRepository from "./postgres/postgres_migration_repository.ts";

class MigrationFactory {
  dialect: string;
  constructor(dialect: string) {
    this.dialect = dialect;
  }

  get(): MigrationInterface {
    switch (this.dialect) {
      case "mysql":
        return new MysqlMigration(new MysqlMigrationRepository());
      case "postgres":
        return new PostgresMigration(new PostgresMigrationRepository());
    }
    throw new Error("dialect is not defined");
  }
}

export default MigrationFactory;
