import SchemaInterface from "./interfaces/schema_interface.ts";
import BuilderInterface from "./interfaces/builder_interface.ts";
import SchemaRepositoryInterface from "./interfaces/schema_repository_interface.ts";

class Schema implements SchemaInterface {
  repo: SchemaRepositoryInterface;
  builder: BuilderInterface

  constructor(repo: SchemaRepositoryInterface, builder: BuilderInterface) {
    this.repo = repo;
    this.builder = builder;
  }

  async hasTable(tableName: string): Promise<boolean> {
    let res = await this.repo.findTable(tableName).first();
    return !!res;

  }

  async hasColumn(tableName: string, columnName: string): Promise<boolean> {
    let res = await this.repo.findTableColumn(tableName, columnName).first();
    return !!res
  }

  async getColumnType(tableName: string, columnName: string): Promise<string> {
    let res = await this.repo.findTableColumn(tableName, columnName).first();
    if (!res) {
      return "";
    }
    if(!res.columnType){
      return ""
    }

    return res.columnType;
  }

  async create(
    tableName: string,
    callback: (builder: BuilderInterface) => void,
  ): Promise<void> {
    console.log('table name 1: ', this.builder.getTableName())
    this.builder.setTableName(tableName)
    console.log('table name 2: ', this.builder.getTableName())
    callback(this.builder);

    console.log('table name 3: ', this.builder.getTableName())
    await this.builder.build();
    console.log('table name 4: ', this.builder.getTableName())
  }

  async drop(tableName: string): Promise<void> {
    this.repo.dropTable(tableName);
    await this.repo.execute();
  }

  async rename(oldTableName: string, newTableName: string): Promise<void> {
    this.repo.renameTable(oldTableName, newTableName);
    await this.repo.execute();
  }
}

export default Schema;
