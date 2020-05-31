interface ColumnInterface {
  name: string;
  type: string;
  nullable: boolean;
  key: string;
  default: string;
  unsigned: boolean;
  primary: string;
  setPrimary(primary: string): void;
  setUnsigned(unsigned: boolean): void;
  setNullable(nullable: boolean): void;
  setKey(key: string): void;
  setDefault(value: string): void;
  toString(): string;
}

export default ColumnInterface;
