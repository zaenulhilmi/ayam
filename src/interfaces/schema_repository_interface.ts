import SchemaEntityInterface from "./entities/schema_entity_interface.ts";

interface SchemaRepositoryInterface {
  insert(tableName: string, object: any): SchemaRepositoryInterface;
  findTable(tableName: string): SchemaRepositoryInterface;
  findTableColumn(
    tableName: string,
    columnName: string,
  ): SchemaRepositoryInterface;
  dropTable(tableName: string): SchemaRepositoryInterface;
  renameTable(
    oldTableName: string,
    newTableName: string,
  ): SchemaRepositoryInterface;

  execute(): Promise<void>;
  get(): Promise<Array<SchemaEntityInterface>>;
  first(): Promise<SchemaEntityInterface | null>;
  toSql(): string;
}

export default SchemaRepositoryInterface;
