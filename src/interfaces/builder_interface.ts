interface BuilderInterface {
  /**
   * adding id as primary key and auto increment
   */
  id(): void;

  /**
   * adding string type column
   * @param columnName
   */
  string(columnName: string): BuilderInterface;

  /**
   * adding integer type column
   * @param columnName
   */
  integer(columnName: string): BuilderInterface;

  /**
   * adding text type column
   * @param columnName
   */
  text(columnName: string): BuilderInterface;

  /**
   * adding timestamp type column
   * @param columnName
   */
  timestamp(columnName: string): BuilderInterface;

  /**
   * adding created_at and updated_at
   */
  timestamps(): void;

  /**
   * updating column as nullable
   */
  nullable(): BuilderInterface;

  /**
   * updating column as unsigned
   */
  unsigned(): BuilderInterface;

  /**
   * adding default value to a column
   * @param value
   */
  default(value: string): BuilderInterface;

  /**
   * build and execute a query
   */
  build(): Promise<void>;

  /**
   * returning an SQL query
   */
  toSql(): string;
}

export default BuilderInterface;
