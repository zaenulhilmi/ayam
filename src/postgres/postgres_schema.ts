import SchemaInterface from "./../interfaces/schema_interface.ts";
import BuilderInterface from "./../interfaces/builder_interface.ts";
import PostgresBuilder from "./postgres_builder.ts";
import RepositoryInterface from "./../interfaces/repository_interface.ts";
import postgres from "./../driver/postgres.ts";
class PostgresSchemaRepository implements SchemaInterface {
  repo: RepositoryInterface;

  constructor(repo: RepositoryInterface) {
    this.repo = repo;
  }

  async hasTable(tableName: string): Promise<boolean> {
    let res = await this.repo.findTable(tableName).get();
    if (res.rows.length == 0) {
      return false;
    }
    return true;
  }

  async hasColumn(tableName: string, columnName: string): Promise<boolean> {
    let res = await this.repo.findTableColumn(tableName, columnName).get();
    if (res.rows.length == 0) {
      return false;
    }

    return true;
  }

  async getColumnType(tableName: string, columnName: string): Promise<string> {
    let res = await postgres.query(
      `SELECT udt_name FROM INFORMATION_SCHEMA.COLUMNS WHERE 
        TABLE_SCHEMA= 'public' AND 
        TABLE_NAME = $1 AND
        COLUMN_NAME = $2;`,
      tableName,
      columnName,
    );
    if (res.rows.length == 0) {
      return "";
    }

    return res.rows[0][0];
  }

  async create(
    tableName: string,
    callback: (builder: BuilderInterface) => void,
  ): Promise<void> {
    let postgresBuilder: BuilderInterface = new PostgresBuilder(tableName);
    callback(postgresBuilder);
    postgresBuilder.build();
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

export default PostgresSchemaRepository;
