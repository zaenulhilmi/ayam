import SchemaRepositoryInterface from "./../interfaces/schema_repository_interface.ts";
import SchemaEntityInterface from "../interfaces/entities/schema_entity_interface.ts";

class SqliteSchemaRepository implements SchemaRepositoryInterface {
  query: string;

  constructor() {
    this.query = "";
  }

  dropTable(tableName: string): SchemaRepositoryInterface {
    this.query = `drop table '${tableName}';`;
    return this;
  }

  async execute(): Promise<void> {
  }

  findTable(tableName: string): SchemaRepositoryInterface {
    this.query =
      `select * from sqlite_master where type = 'table' and name = '${tableName}';`;
    return this;
  }

  findTableColumn(
    tableName: string,
    columnName: string,
  ): SchemaRepositoryInterface {
    return this;
  }

  get(): Promise<any> {
    return Promise.resolve(undefined);
  }

  insert(tableName: string, object: any): SchemaRepositoryInterface {
    return this;
  }

  renameTable(
    oldTableName: string,
    newTableName: string,
  ): SchemaRepositoryInterface {
    return this;
  }

  toSql(): string {
    return this.query;
  }

  async first(): Promise<SchemaEntityInterface | null> {
    return null;
  }
}

export default SqliteSchemaRepository;
