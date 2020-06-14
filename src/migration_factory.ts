import Migration from "./migration.ts";
import MysqlMigrationRepository from "./mysql/mysql_migration_repository.ts";
import MigrationInterface from "./interfaces/migration_interface.ts";
import PostgresMigrationRepository from "./postgres/postgres_migration_repository.ts";
import SqliteMigrationRepository from "./sqlite/sqlite_migration_repository.ts";

class MigrationFactory {
  dialect: string;
  constructor(dialect: string) {
    this.dialect = dialect;
  }

  get(): MigrationInterface {
    switch (this.dialect) {
      case "mysql":
        return new Migration(new MysqlMigrationRepository());
      case "postgres":
        return new Migration(new PostgresMigrationRepository());
      case "sqlite":
        return new Migration(new SqliteMigrationRepository());
    }
    throw new Error("dialect is not defined");
  }
}

export default MigrationFactory;
