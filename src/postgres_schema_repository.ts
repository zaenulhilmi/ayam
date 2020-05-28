import SchemaInterface from './schema_interface.ts'
import BuilderInterface from './builder_interface.ts'
import PostgresBuilder from './postgres_builder.ts'
class PostgresSchemaRepository implements SchemaInterface{

    async hasTable(tableName: string): Promise<boolean>{
        //TODO:: need to be implemented
        return false
    }

    async hasColumn(tableName:string, columnName: string) :Promise<boolean>{
        //TODO:: need to be implemented
        return false
    }

    async getColumnType(tableName: string, columnName:string): Promise<string> {
        //TODO:: need to be implemented
        return ""
    }

  async create(tableName: string, callback: (builder: BuilderInterface) => void): Promise<void> {
    let postgresBuilder: BuilderInterface = new PostgresBuilder(tableName);
    callback(postgresBuilder);
    postgresBuilder.build();
  }
    async drop(tableName: string): Promise<void> {
        //TODO:: need to be implemented
    }

    async rename(oldTableName: string, newTableName: string): Promise<void>{
        //TODO:: need to be implemented
    }


}

export default PostgresSchemaRepository