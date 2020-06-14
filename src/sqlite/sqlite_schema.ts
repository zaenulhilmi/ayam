import SchemaInterface from "./../interfaces/schema_interface.ts";
import BuilderInterface from "./../interfaces/builder_interface.ts";
import SqliteBuilder from "./sqlite_builder.ts";
import SchemaRepositoryInterface from "./../interfaces/schema_repository_interface.ts";

class SqliteSchema implements SchemaInterface {
  repo: SchemaRepositoryInterface;

  constructor(repo: SchemaRepositoryInterface) {
    this.repo = repo;
  }

  async hasTable(tableName: string): Promise<boolean> {
    let res = await this.repo.findTable(tableName).first();
    return !!res
  }

  async hasColumn(tableName: string, columnName: string): Promise<boolean> {
    let res = await this.repo.findTableColumn(tableName, columnName).first();
    return !!res
  }

  async getColumnType(tableName: string, columnName: string): Promise<string> {
    let res = await this.repo.findTableColumn(tableName, columnName).first();
    if(!res){
      return ""
    }
    if(!res.columnType){
      return ""
    }

    return res.columnType
  }

  async create(
    tableName: string,
    callback: (builder: BuilderInterface) => void,
  ): Promise<void> {
    let mysqlBuilder: BuilderInterface = new SqliteBuilder(tableName);
    callback(mysqlBuilder);
    await mysqlBuilder.build();
  }

  async drop(tableName: string): Promise<void> {
    try {
      await this.repo.dropTable(tableName).execute();
    } catch (e) {
      console.error(e);
    }
  }

  async rename(oldTableName: string, newTableName: string): Promise<void> {
    try {
      await this.repo.renameTable(oldTableName, newTableName).execute();
    } catch (e) {
      console.error(e);
    }
  }
}

export default SqliteSchema;
