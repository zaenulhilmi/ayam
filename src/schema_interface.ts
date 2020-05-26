import BuilderInterface from './builder_interface.ts';
interface SchemaInterface {
    hasTable(tableName: string): Promise<boolean>
    hasColumn(tableName: string, columnName: string): Promise<boolean>
    // hasColumns(tableName: string, columnName: Array<string>): Promise<boolean>
    getColumnType(tableName: string, columnName: string): Promise<string>
    create(tableName: string, callback: (builder: BuilderInterface) => void): Promise<void>
    // drop(tableName: string): Promise<boolean>
}

export default SchemaInterface