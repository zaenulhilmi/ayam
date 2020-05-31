import SchemaRepositoryInterface from "./../interfaces/schema_repository_interface.ts";
import postgres from "./../driver/postgres.ts";

class PostgresSchemaRepository implements SchemaRepositoryInterface {
  query: string = "";

  insert(tableName: string, object: any): SchemaRepositoryInterface {
        let query = `insert into ${tableName} set `
        let res:Array<string> = []
        for(let key in object){
            res.push(`${key}='${object[key]}'`)
        }
        query += `${res.join(', ')}`
        this.query = query
        return this
  }
  findTable(tableName: string): SchemaRepositoryInterface {
    this.query =
      `select * from information_schema.tables where table_schema='public' and table_name='${tableName}';`;
    return this;
  }

  findTableColumn(tableName: string, columnName: string): SchemaRepositoryInterface {
    this.query =
      `select * from information_schema.columns where table_schema='public' and table_name='${tableName}' and column_name='${columnName}';`;
    return this;
  }

  dropTable(tableName: string): SchemaRepositoryInterface {
    this.query = `drop table ${tableName};`;
    return this;
  }

  renameTable(oldTableName: string, newTableName: string): SchemaRepositoryInterface {
    this.query = `alter table ${oldTableName} rename to ${newTableName};`;
    return this;
  }

  async execute(): Promise<void> {
    await postgres.query(this.query);
  }

  async get(): Promise<any> {
    let result = await postgres.query(this.query);
    return result;
  }

  toSql(): string {
    return this.query;
  }
}

export default PostgresSchemaRepository;
