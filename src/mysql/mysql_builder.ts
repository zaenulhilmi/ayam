import BuilderInterface from "./../interfaces/builder_interface.ts";
import mysql from "./../driver/mysql.ts";

// class MySqlBuilder implements BuilderInterface {
class MySqlBuilder {
  tableName: string;
  query: string;
  columns: Array<string> = [];

  constructor(tableName: string, action: string) {
    this.tableName = tableName;
    if(action == 'create'){
      this.query = `CREATE TABLE ${this.tableName} ( COLUMNS_PLACEHOLDER );`;
    } else {
      this.query = `ALTER TABLE ${this.tableName} ( COLUMNS_PLACEHOLDER );`;
    }
  }

  id(): void {
    this.columns.push("id INT NOT NULL PRIMARY KEY AUTO_INCREMENT");
  }

  string(columnName: string): BuilderInterface {
    // let length = 100;
    // if (!option) {
    //   this.columns.push(`${columnName} VARCHAR(${length}) NOT NULL`);
    //   return this;
    // }

    // if (option.length) {
    //   length = option.length;
    // }

    // if (option.nullable) {
    //   this.columns.push(`${columnName} VARCHAR(${length}) DEFAULT NULL`);
    // } else {
    //   this.columns.push(`${columnName} VARCHAR(${length}) NOT NULL`);
    // }
    return this
  }

  integer(columnName: string): BuilderInterface {
    // let length = 11;
    // if (!option) {
    //   this.columns.push(`${columnName} INT(${length}) NOT NULL`);
    //   return this;
    // }

    // if (option.length) {
    //   length = option.length;
    // }

    // if (option.nullable) {
    //   this.columns.push(`${columnName} INT(${length}) DEFAULT NULL`);
    // } else {
    //   this.columns.push(`${columnName} INT(${length}) NOT NULL`);
    // }
    return this;
  }

  text(columnName: string): BuilderInterface {
    // if (!option) {
    //   this.columns.push(`${columnName} TEXT NOT NULL`);
    //   return;
    // }

    // if (option.nullable) {
    //   this.columns.push(`${columnName} TEXT DEFAULT NULL`);
    // } else {
    //   this.columns.push(`${columnName} TEXT NOT NULL`);
    // }
    return this
  }

  timestamp(columnName: string): BuilderInterface {
    // if (!option) {
    //   this.columns.push(`${columnName} TIMESTAMP NOT NULL`);
    //   return;
    // }

    // if (option.nullable) {
    //   this.columns.push(`${columnName} TIMESTAMP DEFAULT NULL`);
    // } else {
    //   this.columns.push(`${columnName} TIMESTAMP NOT NULL`);
    // }
    return this
  }

  timestamps(): void {
    this.columns.push(`created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
    this.columns.push(`updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
  }

  nullable(): BuilderInterface {
    return this
  }
  unsigned(): BuilderInterface {
    return this
  }

  default(): BuilderInterface {
    return this
  }
  async build(): Promise<void> {
    let joinnedColumns = this.columns.join(", ");
    this.query = this.query.replace("COLUMNS_PLACEHOLDER", joinnedColumns);
    mysql.execute(this.query);
  }

  toSql(): string {
    let joinnedColumns = this.columns.join(", ");
    this.query = this.query.replace("COLUMNS_PLACEHOLDER", joinnedColumns);
    return this.query
  }
}

export default MySqlBuilder;
