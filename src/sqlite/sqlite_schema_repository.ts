import SchemaRepositoryInterface from "./../interfaces/schema_repository_interface.ts";
import SchemaEntityInterface from "../interfaces/entities/schema_entity_interface.ts";
import sqlite from "../driver/sqlite.ts";
import MigrationEntityInterface from "../interfaces/entities/migration_entity_interface.ts";

class SqliteSchemaRepository implements SchemaRepositoryInterface {
  query: string;

  constructor() {
    this.query = "";
  }

  dropTable(tableName: string): SchemaRepositoryInterface {
    this.query = `drop table '${tableName}';`;
    return this;
  }

  findTable(tableName: string): SchemaRepositoryInterface {
    this.query =
      `select type, name, tbl_name from sqlite_master where type = 'table' and name = '${tableName}';`;
    return this;
  }

  findTableColumn(
    tableName: string,
    columnName: string,
  ): SchemaRepositoryInterface {
    return this;
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
    let client = await sqlite.getInstance()
    let rows = client.query(this.query)
    let schema: SchemaEntityInterface
    for (const [type, name, tableName ] of rows){
      schema = {
        tableName
      }
      rows.done();
      return schema
    }
    return null;
  }

  async get(): Promise<Array<SchemaEntityInterface>> {
    let client = await sqlite.getInstance()
    let rows = client.query(this.query)
    let schemas: Array<SchemaEntityInterface> = []
    for (const [type, name, tableName ] of rows){
      let schema: SchemaEntityInterface = {
        tableName
      }
      schemas.push(schema)
    }
    return schemas;
  }

  async execute(): Promise<void> {
    let client = await sqlite.getInstance()
    await client.query(this.query)
  }
}

export default SqliteSchemaRepository;
