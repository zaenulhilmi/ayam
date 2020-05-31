import ColumnInterface from "../interfaces/column_interface.ts";

class PostgresColumn implements ColumnInterface {
  name: string;
  type: string;
  nullable: boolean;
  key: string;
  default: string;
  unsigned: boolean;
  primary: string;
  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
    this.nullable = false;
    this.key = "";
    this.primary = "";
    this.default = "";
    this.unsigned = false;
  }

  setDefault(value: any): void {
    this.default = `default '${value}'`;
  }

  setKey(key: string): void {
    this.key = key;
  }

  setPrimary(primary: string): void {
    this.primary = primary;
  }

  setNullable(value: boolean) {
    this.nullable = value;
  }

  setUnsigned(value: boolean) {
    this.unsigned = value;
  }

  toString(): string {
    let nullableString: string = this.nullable ? "null" : "not null";
    let unsignedString: string = this.unsigned
      ? `CHECK (${this.name} > 0)`
      : "";
    let query = [
      this.name,
      this.type,
      unsignedString,
      nullableString,
      this.primary,
      this.default,
    ];

    let result = this._constructQuery(query);
    return result;
  }

  _constructQuery(query: Array<string>): string {
    let queryFilled: Array<string> = [];
    let result: string = "";
    for (let i = 0; i < query.length; i++) {
      let x = query[i];
      if (x != "") {
        queryFilled.push(x);
      }
    }

    for (let i = 0; i < queryFilled.length; i++) {
      result += queryFilled[i];
      if (i != queryFilled.length - 1) {
        result += " ";
      }
    }

    return result;
  }
}

export default PostgresColumn;
