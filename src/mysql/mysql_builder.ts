import BuilderInterface from "./../interfaces/builder_interface.ts";
import mysql from "./../driver/mysql.ts";
import MysqlColumn from "./mysql_column.ts";
import ColumnInterface from "./../interfaces/column_interface.ts";

class MySqlBuilder implements BuilderInterface {
  tableName: string;
  query: string;
  columns: Array<ColumnInterface> = [];

  constructor(tableName: string) {
    this.tableName = tableName;
    this.query = `create table ${this.tableName} (COLUMNS_PLACEHOLDER);`;
  }

  id(): void {
    let column: ColumnInterface = new MysqlColumn("id", "bigint");
    column.setPrimary("primary key");
    this.columns.push(column);
  }

  string(columnName: string): BuilderInterface {
    let column: ColumnInterface = new MysqlColumn(columnName, "varchar(255)");
    this.columns.push(column);
    return this;
  }

  integer(columnName: string): BuilderInterface {
    let column: ColumnInterface = new MysqlColumn(columnName, "int");
    this.columns.push(column);
    return this;
  }

  text(columnName: string): BuilderInterface {
    let column: ColumnInterface = new MysqlColumn(columnName, "text");
    this.columns.push(column);
    return this;
  }

  timestamp(columnName: string): BuilderInterface {
    let column: ColumnInterface = new MysqlColumn(columnName, "timestamp");
    this.columns.push(column);
    return this;
  }

  timestamps(): void {
    let createdAt: ColumnInterface = new MysqlColumn("created_at", "timestamp");
    let updatedAt: ColumnInterface = new MysqlColumn("updated_at", "timestamp");
    this.columns.push(createdAt);
    this.columns.push(updatedAt);
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
    let joinnedColumns = this.columns.join(", ");
    this.query = this.query.replace("COLUMNS_PLACEHOLDER", joinnedColumns);
    mysql.execute(this.query);
  }

  toSql(): string {
    let joinnedColumns = this.columns.join(", ");
    this.query = this.query.replace("COLUMNS_PLACEHOLDER", joinnedColumns);
    return this.query;
  }
}

export default MySqlBuilder;
