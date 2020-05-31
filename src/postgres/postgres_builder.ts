import BuilderInterface from "./../interfaces/builder_interface.ts";
import PostgresColumn from "./postgres_column.ts";
import ColumnInterface from "./../interfaces/column_interface.ts";
import postgres from "./../driver/postgres.ts";

class PostgresBuilder implements BuilderInterface {
  tableName: string;
  query: string;
  columns: Array<ColumnInterface> = [];

  constructor(tableName: string) {
    this.tableName = tableName;
    this.query = `create table ${this.tableName} (COLUMNS_PLACEHOLDER);`;
  }

  id(): void {
    let column: ColumnInterface = new PostgresColumn("id", "bigserial");
    column.setPrimary("primary key");
    this.columns.push(column);
  }

  string(columnName: string): BuilderInterface {
    let column: ColumnInterface = new PostgresColumn(
      columnName,
      "varchar(255)",
    );
    this.columns.push(column);
    return this;
  }

  integer(columnName: string): BuilderInterface {
    let column: ColumnInterface = new PostgresColumn(columnName, "integer");
    this.columns.push(column);
    return this;
  }

  text(columnName: string): BuilderInterface {
    let column: ColumnInterface = new PostgresColumn(columnName, "text");
    this.columns.push(column);
    return this;
  }

  timestamp(columnName: string): BuilderInterface {
    let column: ColumnInterface = new PostgresColumn(columnName, "timestamp");
    this.columns.push(column);
    return this;
  }

  timestamps(): void {
    let createdAt: ColumnInterface = new PostgresColumn(
      "created_at",
      "timestamp",
    );
    let updatedAt: ColumnInterface = new PostgresColumn(
      "updated_at",
      "timestamp",
    );
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
    let joinnedColumns = this._joinColumns();
    this.query = this.query.replace("COLUMNS_PLACEHOLDER", joinnedColumns);
    await postgres.query(this.query);
  }

  toSql(): string {
    let joinnedColumns = this._joinColumns();
    this.query = this.query.replace("COLUMNS_PLACEHOLDER", joinnedColumns);
    return this.query;
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
}

export default PostgresBuilder;
