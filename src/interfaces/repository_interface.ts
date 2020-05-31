interface RepositoryInterface {
  findTable(tableName: string): RepositoryInterface;
  findTableColumn(tableName: string, columnName: string): RepositoryInterface;
  dropTable(tableName: string): RepositoryInterface;
  renameTable(oldTableName: string, newTableName: string): RepositoryInterface;

  execute(): Promise<void>;
  get(): Promise<any>;
  toSql(): string;
}

export default RepositoryInterface;
