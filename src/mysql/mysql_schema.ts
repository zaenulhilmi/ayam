import SchemaInterface from "./../interfaces/schema_interface.ts";
import BuilderInterface from "./../interfaces/builder_interface.ts";
import MySqlBuilder from "./mysql_builder.ts";
import SchemaRepositoryInterface from './../interfaces/schema_repository_interface.ts'

class MySqlSchemaRepository implements SchemaInterface {

  repo: SchemaRepositoryInterface

  constructor(repo: SchemaRepositoryInterface){
    this.repo = repo
  }

  async hasTable(tableName: string): Promise<boolean> {
    try {
      let result = await this.repo.findTable(tableName).get()
      if (result.length > 0) {
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async hasColumn(tableName: string, columnName: string): Promise<boolean> {
    try {
      let result = await this.repo.findTableColumn(tableName, columnName).get()
      if (result.length > 0) {
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async getColumnType(tableName: string, columnName: string): Promise<string> {
    try {
      let result = await this.repo.findTableColumn(tableName, columnName).get()
      if (result.length == 0) {
        throw new Error("Column not found");
      }
      return result[0]["COLUMN_TYPE"];
    } catch (e) {
      console.error(e);
      throw (e);
    }
  }

  async create(
    tableName: string,
    callback: (builder: BuilderInterface) => void,
  ): Promise<void> {
    let mysqlBuilder: BuilderInterface = new MySqlBuilder(tableName);
    callback(mysqlBuilder);
    mysqlBuilder.build();
  }

  async drop(tableName: string): Promise<void> {
    try {
      await this.repo.dropTable(tableName).execute()
    } catch (e) {
      console.error(e);
    }
  }

  async rename(oldTableName: string, newTableName: string): Promise<void> {
    try {
      await this.repo.renameTable(oldTableName, newTableName).execute()
    } catch (e) {
      console.error(e);
    }
  }
}

export default MySqlSchemaRepository;
