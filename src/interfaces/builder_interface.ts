import BuilderOptionInterface from "./builder_option_interface.ts";

interface BuilderInterface {
  //column types
  id(): void;
  string(columnName: string): BuilderInterface;
  integer(columnName: string): BuilderInterface;
  text(columnName: string): void;
  timestamp(columnName: string): void;
  timestamps(): void;


  //modifiers
  nullable(): BuilderInterface;


  build(): Promise<void>;
  toSql(): string;
}

export default BuilderInterface;
