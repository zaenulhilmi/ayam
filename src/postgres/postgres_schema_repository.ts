import SchemaInterface from "./../interfaces/schema_interface.ts";
import BuilderInterface from "./../interfaces/builder_interface.ts";
import PostgresBuilder from "./postgres_builder.ts";
import postgres from "./../driver/postgres.ts";
class PostgresSchemaRepository implements SchemaInterface {
  async hasTable(tableName: string): Promise<boolean> {
    let res = await postgres.query(
      `SELECT 1 
        FROM   INFORMATION_SCHEMA.TABLES
        WHERE  table_schema = 'public'
        AND table_name = $1;
        `,
      tableName,
    );

    if (res.rows.length == 0) {
      return false;
    }
    return true;
  }

  async hasColumn(tableName: string, columnName: string): Promise<boolean> {
    let res = await postgres.query(
      `SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE 
        TABLE_SCHEMA= 'public' AND 
        TABLE_NAME = $1 AND
        COLUMN_NAME = $2;`,
      tableName,
      columnName,
    );
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
    await postgres.query(`DROP TABLE ${tableName};`);
  }

  async rename(oldTableName: string, newTableName: string): Promise<void> {
    await postgres.query(
      `ALTER TABLE ${oldTableName} RENAME TO ${newTableName};`,
    );
  }
}

export default PostgresSchemaRepository;
