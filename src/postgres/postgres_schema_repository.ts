import SchemaRepositoryInterface from "./../interfaces/schema_repository_interface.ts";
import postgres from "./../driver/postgres.ts";
import SchemaEntityInterface from "../interfaces/entities/schema_entity_interface.ts";

class PostgresSchemaRepository implements SchemaRepositoryInterface {
  query: string = "";

  insert(tableName: string, object: any): SchemaRepositoryInterface {
    let query = `insert into ${tableName} set `;
    let res: Array<string> = [];
    for (let key in object) {
      res.push(`${key}='${object[key]}'`);
    }
    query += `${res.join(", ")}`;
    this.query = query;
    return this;
  }

  findTable(tableName: string): SchemaRepositoryInterface {
    this.query =
      `select table_name from information_schema.tables where table_schema='public' and table_name='${tableName}';`;
    return this;
  }

  findTableColumn(
    tableName: string,
    columnName: string,
  ): SchemaRepositoryInterface {
    this.query =
      `select table_name, column_name from information_schema.columns where table_schema='public' and table_name='${tableName}' and column_name='${columnName}';`;
    return this;
  }

  dropTable(tableName: string): SchemaRepositoryInterface {
    this.query = `drop table ${tableName};`;
    return this;
  }

  renameTable(
    oldTableName: string,
    newTableName: string,
  ): SchemaRepositoryInterface {
    this.query = `alter table ${oldTableName} rename to ${newTableName};`;
    return this;
  }

  async execute(): Promise<void> {
    let client = await postgres.getInstance();
    await client.query(this.query);
  }

  async get(): Promise<Array<SchemaEntityInterface>> {
    let client = await postgres.getInstance();
    let result = await client.query(this.query);
    let rows: Array<SchemaEntityInterface> = [];
    for (let item of result.rows) {
      let schema: SchemaEntityInterface = {
        tableName: item[0],
      };
      if (item[1]) {
        schema.columnName = item[1];
      }
      rows.push(schema);
    }
    return rows;
  }

  toSql(): string {
    return this.query;
  }

  async first(): Promise<SchemaEntityInterface | null> {
    let client = await postgres.getInstance();
    let result = await client.query(this.query);
    if (result.rows.length == 0) {
      return null;
    }
    let item = result.rows[0];
    let schema: SchemaEntityInterface = {
      tableName: item[0],
    };
    if (item[1]) {
      schema.columnName = item[1];
    }
    return schema;
  }
}

export default PostgresSchemaRepository;
