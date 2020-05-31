interface BuilderInterface {
  //column types
  id(): void;
  string(columnName: string): BuilderInterface;
  integer(columnName: string): BuilderInterface;
  text(columnName: string): BuilderInterface;
  timestamp(columnName: string): BuilderInterface;
  timestamps(): void;

  //modifiers
  nullable(): BuilderInterface;
  unsigned(): BuilderInterface;
  default(value: string): BuilderInterface;

  build(): Promise<void>;
  toSql(): string;
}

export default BuilderInterface;
