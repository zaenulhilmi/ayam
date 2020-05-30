import BuilderInterface from "./../interfaces/builder_interface.ts";
import BuilderOptionInterface from "./../interfaces/builder_option_interface.ts";
import postgres from './../driver/postgres.ts'

class PostgresBuilder implements BuilderInterface {
  tableName: string;
  query: string;
  columns: Array<string> = [];

  constructor(tableName: string) {
    this.tableName = tableName;
    this.query = `CREATE TABLE ${this.tableName} ( COLUMNS_PLACEHOLDER );`;
  }

  id(): void {
    this.columns.push("id SERIAL PRIMARY KEY");
  }

  string(columnName: string, option?: BuilderOptionInterface): BuilderInterface {
    let length = 100    
    if(!option){
      this.columns.push(`${columnName} VARCHAR (${length}) NOT NULL`)
      return this
    }

    if(option.length){
      length = option.length
    }

    if(option.nullable){
      this.columns.push(`${columnName} VARCHAR(${length}) NULL`)
    } else {
      this.columns.push(`${columnName} VARCHAR(${length}) NOT NULL`)
    }
    return this
  }

  integer(columnName: string, option?: BuilderOptionInterface): BuilderInterface {
    if(!option){
      this.columns.push(`${columnName} integer`)
      return this
    }

    if(option.nullable){
      this.columns.push(`${columnName} integer NULL`)
    } else {
      this.columns.push(`${columnName} integer NOT NULL`)
    }
    return this
  }

  nullable(): BuilderInterface {
    this.columns[this.columns.length - 1] += 'lalala'
    return this
  }

  text(columnName: string, option?: BuilderOptionInterface): void {
    if(!option) {
      this.columns.push(`${columnName} TEXT NOT NULL`);
      return
    }

    if(option.nullable){
      this.columns.push(`${columnName} TEXT NULL`);
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
    console.log(this.query)
    await postgres.query(this.query);
  }

  toSql(): string {
    return ""
  }
}

export default PostgresBuilder;
