import BuilderOptionInterface from "./builder_option_interface.ts";

interface BuilderInterface {
  string(columnName: string): void;
  string(columnName: string, option?: BuilderOptionInterface): void;

  integer(columnName: string): void;
  integer(columnName: string, option?: BuilderOptionInterface): void;

  text(columnName: string, option?: BuilderOptionInterface): void;

  timestamp(columnName: string, option?: BuilderOptionInterface): void;

  build(): Promise<void>;
}

export default BuilderInterface;
