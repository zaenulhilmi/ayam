import BuilderOptionInterface from "./builder_option_interface.ts";

interface BuilderInterface {
  id(): void;

  string(columnName: string): void;
  string(columnName: string, option?: BuilderOptionInterface): void;

  integer(columnName: string): void;
  integer(columnName: string, option?: BuilderOptionInterface): void;

  text(columnName: string, option?: BuilderOptionInterface): void;

  timestamp(columnName: string, option?: BuilderOptionInterface): void;

  timestamps(): void;

  build(): Promise<void>;
}

export default BuilderInterface;
