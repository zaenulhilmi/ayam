import BuilderInterface from "./builder_interface.ts";
import BuilderOptionInterface from "./builder_option_interface.ts";

class PostgresBuilder implements BuilderInterface {

  tableName: string;
  query: string;
  columns: Array<string> = [];

  constructor(tableName: string) {
    this.tableName = tableName;
    this.query = `CREATE TABLE ${this.tableName} ( COLUMNS_PLACEHOLDER );`;
  }

  id(): void {
    // this.columns.push("id INT NOT NULL PRIMARY KEY AUTO_INCREMENT");
  }

  string(columnName: string, option?: BuilderOptionInterface): void {
  }

  integer(columnName: string, option?: BuilderOptionInterface): void {

  }

  text(columnName: string, option?: BuilderOptionInterface): void {
  }

  timestamp(columnName: string, option?: BuilderOptionInterface): void {
  }

  timestamps(): void {
  }

  async build(): Promise<void> {
  }
}

export default PostgresBuilder;
