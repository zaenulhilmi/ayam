import RepositoryInterface from './../interfaces/repository_interface.ts'
import postgres from "./../driver/postgres.ts";

class PostgresRepository implements RepositoryInterface {

    query: string = ''

    findTable(tableName: string): RepositoryInterface {
       this.query = `select * from information_schema.tables where table_schema='public' and table_name='${tableName}';`
       return this
    }

    findTableColumn(tableName: string, columnName: string): RepositoryInterface {
        this.query = `select * from information_schema.columns where table_schema='public' and table_name='${tableName}' and column_name='${columnName}';`
        return this
    }

    dropTable(tableName: string): RepositoryInterface {
        this.query = `drop table ${tableName};`
        return this
    }

    renameTable(oldTableName: string, newTableName: string): RepositoryInterface {
        this.query = `alter table ${oldTableName} rename to ${newTableName};`
        return this
    }

    async execute(): Promise<void> {
        await postgres.query(this.query)
    }

    async get(): Promise<any>{
        let result = await postgres.query(this.query)
        return result
    }

    toSql(): string {
        return this.query
    }
}

export default PostgresRepository