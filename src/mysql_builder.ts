import BuilderInterface from "./builder_interface.ts";
import mysql from "./driver/mysql.ts";
import BuilderOptionInterface from "./builder_option_interface.ts";

class MySqlBuilder implements BuilderInterface {
  tableName: string;
  query: string;
  columns: Array<string> = [];

  constructor(tableName: string) {
    this.tableName = tableName;
    this.query = `CREATE TABLE ${this.tableName} ( COLUMNS_PLACEHOLDER );`;
  }

  id(): void {
    this.columns.push("id INT NOT NULL PRIMARY KEY AUTO_INCREMENT");
  }

  string(columnName: string, option?: BuilderOptionInterface): void {
    let length = 100;
    if (!option) {
      this.columns.push(`${columnName} VARCHAR(${length}) NOT NULL`);
      return;
    }

    if (option.length) {
      length = option.length;
    }

    if (option.nullable) {
      this.columns.push(`${columnName} VARCHAR(${length}) DEFAULT NULL`);
    } else {
      this.columns.push(`${columnName} VARCHAR(${length}) NOT NULL`);
    }
  }

  integer(columnName: string, option?: BuilderOptionInterface): void {
    let length = 11;
    if (!option) {
      this.columns.push(`${columnName} INT(${length}) NOT NULL`);
      return;
    }

    if (option.length) {
      length = option.length;
    }

    if (option.nullable) {
      this.columns.push(`${columnName} INT(${length}) DEFAULT NULL`);
    } else {
      this.columns.push(`${columnName} INT(${length}) NOT NULL`);
    }
  }

  text(columnName: string, option?: BuilderOptionInterface): void {
    if (!option) {
      this.columns.push(`${columnName} TEXT NOT NULL`);
      return;
    }

    if (option.nullable) {
      this.columns.push(`${columnName} TEXT DEFAULT NULL`);
    } else {
      this.columns.push(`${columnName} TEXT NOT NULL`);
    }
  }

  timestamp(columnName: string, option?: BuilderOptionInterface): void {
    if (!option) {
      this.columns.push(`${columnName} TIMESTAMP NOT NULL`);
      return;
    }

    if (option.nullable) {
      this.columns.push(`${columnName} TIMESTAMP DEFAULT NULL`);
    } else {
      this.columns.push(`${columnName} TIMESTAMP NOT NULL`);
    }
  }

  timestamps(): void {
    this.columns.push(`created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
    this.columns.push(`updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
  }

  async build(): Promise<void> {
    let joinnedColumns = this.columns.join(", ");
    this.query = this.query.replace("COLUMNS_PLACEHOLDER", joinnedColumns);
    mysql.execute(this.query);
  }
}

export default MySqlBuilder;
