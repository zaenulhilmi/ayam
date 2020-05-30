import SchemaInterface from "./../interfaces/schema_interface.ts";
import mysql from "./../driver/mysql.ts";
import BuilderInterface from "./../interfaces/builder_interface.ts";
import MySqlBuilder from "./mysql_builder.ts";

class MySqlSchemaRepository implements SchemaInterface {
  async hasTable(tableName: string): Promise<boolean> {
    try {
      let result = await mysql.query(`SHOW TABLES LIKE ?`, [tableName]);
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
    let dbName = mysql.config.db;
    try {
      let result = await mysql.query(
        `SELECT * FROM information_schema.COLUMNS WHERE
            TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
        [dbName, tableName, columnName],
      );
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
    let dbName = mysql.config.db;
    try {
      let result = await mysql.query(
        `SELECT * FROM information_schema.COLUMNS WHERE
            TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
        [dbName, tableName, columnName],
      );
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
    let mysqlBuilder: BuilderInterface = new MySqlBuilder(tableName, 'create');
    callback(mysqlBuilder);
    mysqlBuilder.build();
  }

  async drop(tableName: string): Promise<void> {
    try {
      await mysql.execute(`DROP TABLE ${tableName}`);
    } catch (e) {
      console.error(e);
    }
  }

  async rename(oldTableName: string, newTableName: string): Promise<void> {
    try {
      await mysql.execute(`RENAME TABLE ${oldTableName} TO ${newTableName}`);
    } catch (e) {
      console.error(e);
    }
  }
}

export default MySqlSchemaRepository;
