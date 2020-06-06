import BuilderInterface from "./builder_interface.ts";
interface SchemaInterface {
  /**
   * determine if table exist
   * @param tableName
   */
  hasTable(tableName: string): Promise<boolean>;

  /**
   * determine if column name exist
   * @param tableName
   * @param columnName
   */
  hasColumn(tableName: string, columnName: string): Promise<boolean>;

  /**
   * getting column type
   * @param tableName
   * @param columnName
   */
  getColumnType(tableName: string, columnName: string): Promise<string>;

  /**
   * create a table using BuilderInterface
   * @param tableName
   * @param callback
   */
  create(
    tableName: string,
    callback: (builder: BuilderInterface) => void,
  ): Promise<void>;

  /**
   * dropping table
   * @param tableName
   */
  drop(tableName: string): Promise<void>;

  /**
   * renaming a table
   * @param oldTableName
   * @param newTableName
   */
  rename(oldTableName: string, newTableName: string): Promise<void>;
}

export default SchemaInterface;
