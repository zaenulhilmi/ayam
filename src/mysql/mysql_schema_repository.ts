import SchemaRepositoryInterface from "../interfaces/schema_repository_interface.ts";
import mysql from "./../driver/mysql.ts";
import SchemaEntityInterface from "../interfaces/entities/schema_entity_interface.ts";

class MysqlSchemaRepository implements SchemaRepositoryInterface {
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
      `select * from information_schema.tables where table_schema = database() and table_name = '${tableName}';`;
    return this;
  }

  findTableColumn(
    tableName: string,
    columnName: string,
  ): SchemaRepositoryInterface {
    this.query =
      `select * from information_schema.columns where table_schema = database() and table_name = '${tableName}' and column_name = '${columnName}';`;
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
    this.query = `rename table ${oldTableName} to ${newTableName};`;
    return this;
  }

  async execute(): Promise<void> {
    let client = await mysql.getInstance();
    await client.execute(this.query);
  }

  async get(): Promise<Array<SchemaEntityInterface>> {
    let client = await mysql.getInstance();
    let rows = await client.query(this.query);
    let result: Array<SchemaEntityInterface> = [];
    for (let item of rows) {
      let schema: SchemaEntityInterface = {
        tableName: item.TABLE_NAME,
      };
      if (item.COLUMN_NAME) {
        schema.columnName = item.COLUMN_NAME;
        schema.columnType = item.DATA_TYPE;
      }
      result.push(schema);
    }

    return result;
  }

  toSql(): string {
    return this.query;
  }

  async first(): Promise<SchemaEntityInterface | null> {
    let client = await mysql.getInstance();
    let rows = await client.query(this.query);
    if (rows.length == 0) {
      return null;
    }
    let item = rows[0];
    let schema: SchemaEntityInterface = {
      tableName: item.TABLE_NAME,
    };
    if (item.COLUMN_NAME) {
      schema.columnName = item.COLUMN_NAME;
    }
    return schema;
  }
}

export default MysqlSchemaRepository;
