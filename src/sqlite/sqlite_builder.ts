import BuilderInterface from "./../interfaces/builder_interface.ts";
import SqliteColumn from "./sqlite_column.ts";
import ColumnInterface from "./../interfaces/column_interface.ts";
import sqlite from "./../driver/sqlite.ts";

class SqliteBuilder implements BuilderInterface {
  tableName: string;
  query: string;
  columns: Array<ColumnInterface> = [];

  constructor(tableName?: string) {
    this.tableName = tableName || '';
    this.query = `create table ${this.tableName} (COLUMNS_PLACEHOLDER);`;
  }

  id(): void {
    let column: ColumnInterface = new SqliteColumn("id", "integer");
    column.setPrimary("primary key autoincrement");
    this.columns.push(column);
  }

  string(columnName: string): BuilderInterface {
    let column: ColumnInterface = new SqliteColumn(columnName, "varchar(255)");
    this.columns.push(column);
    return this;
  }

  integer(columnName: string): BuilderInterface {
    let column: ColumnInterface = new SqliteColumn(columnName, 'integer')
    this.columns.push(column)
    return this;
  }

  text(columnName: string): BuilderInterface {
    let column: ColumnInterface = new SqliteColumn(columnName, "text");
    this.columns.push(column);
    return this;
  }

  timestamp(columnName: string): BuilderInterface {
    let column: ColumnInterface = new SqliteColumn(columnName, "text");
    this.columns.push(column);
    return this;
  }

  timestamps(): void {
    let createdAt: ColumnInterface = new SqliteColumn('created_at', 'text')
    let updatedAt: ColumnInterface = new SqliteColumn('updated_at', 'text')
    this.columns.push(createdAt)
    this.columns.push(updatedAt)
  }

  nullable(): BuilderInterface {
    this.columns[this.columns.length - 1].setNullable(true);
    return this;
  }

  unsigned(): BuilderInterface {
    this.columns[this.columns.length - 1].setUnsigned(true);
    return this;
  }

  default(value: string): BuilderInterface {
    this.columns[this.columns.length - 1].setDefault(value);
    return this;
  }

  async build(): Promise<void> {
    let joinedColumns = this._joinColumns();
    this.query = this.query.replace("COLUMNS_PLACEHOLDER", joinedColumns);
    console.log(this.query);
    let client = await sqlite.getInstance();
    await client.query(this.query);
  }

  toSql(): string {
    let joinedColumns = this._joinColumns();
    this.query = this.query.replace("COLUMNS_PLACEHOLDER", joinedColumns);
    return this.query;
  }

  setTableName(tableName: string) {
    this.tableName = tableName
    this._updateQuery()
  }

  _joinColumns(): string {
    let result: string = "";
    for (let i = 0; i < this.columns.length; i++) {
      let column = this.columns[i];
      result += column.toString();
      if (i != this.columns.length - 1) {
        result += ", ";
      }
    }
    return result;
  }

  _updateQuery(): void {
    this.query = `create table ${this.tableName} (COLUMNS_PLACEHOLDER);`;
  }
}

export default SqliteBuilder;
