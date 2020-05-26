import BuilderInterface from './builder_interface.ts';
interface SchemaInterface {
    hasTable(tableName: string): Promise<boolean>
    hasColumn(tableName: string, columnName: string): Promise<boolean>
    getColumnType(tableName: string, columnName: string): Promise<string>
    create(tableName: string, callback: (builder: BuilderInterface) => void): Promise<void>
    drop(tableName: string): Promise<void>
    rename(oldTableName: string, newTableName: string): Promise<void>
}

export default SchemaInterface