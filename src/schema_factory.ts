import SchemaInterface from "./interfaces/schema_interface.ts";
import MysqlSchemaRepository from "./mysql/mysql_schema_repository.ts";
import PostgresSchemaRepository from "./postgres/postgres_schema_repository.ts";
import SqliteSchemaRepository from "./sqlite/sqlite_schema_repository.ts";
import MySqlBuilder from "./mysql/mysql_builder.ts";
import PostgresBuilder from "./postgres/postgres_builder.ts";
import SqliteBuilder from "./sqlite/sqlite_builder.ts";
import Schema from "./schema.ts";

class SchemaFactory {
  dialect: string;

  constructor(dialect: string) {
    this.dialect = dialect;
  }

  get(): SchemaInterface {
    if (this.dialect == "mysql") {
      return new Schema(new MysqlSchemaRepository(), new MySqlBuilder());
    } else if (this.dialect == "postgres") {
      return new Schema(new PostgresSchemaRepository(), new PostgresBuilder());
    } else if (this.dialect == "sqlite") {
      return new Schema(new SqliteSchemaRepository(), new SqliteBuilder());
    } else {
      throw new Error("dialect is not supported");
    }
  }
}

export default SchemaFactory;
