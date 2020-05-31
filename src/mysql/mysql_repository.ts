import RepositoryInterface from "../interfaces/repository_interface.ts";
import mysql from "./../driver/mysql.ts";

class MysqlRepository implements RepositoryInterface {
    query: string = "";

    insert(tableName: string, object: any): RepositoryInterface {
        let query = `insert into ${tableName} set `
        let res:Array<string> = []
        for(let key in object){
            res.push(`${key}='${object[key]}'`)
        }
        query += `${res.join(', ')}`
        this.query = query
        return this
    }

    findTable(tableName: string): RepositoryInterface {
        this.query = `select * from information_schema.tables where table_schema = database() and table_name = '${tableName}';`
        return this;
    }
  
    findTableColumn(tableName: string, columnName: string): RepositoryInterface {
        this.query = `select * from information_schema.columns where table_schema = database() and table_name = '${tableName}' and column_name = '${columnName}';`
        return this;
    }
  
    dropTable(tableName: string): RepositoryInterface {
        this.query = `drop table ${tableName};`
        return this;
    }
  
    renameTable(oldTableName: string, newTableName: string): RepositoryInterface {
        this.query = `rename table ${oldTableName} to ${newTableName};`
        return this;
    }
  
    async execute(): Promise<void> {
        await mysql.execute(this.query)
    }
  
    async get(): Promise<any> {
        let res = await mysql.query(this.query)
        return res;
    }
  
    toSql(): string {
      return this.query;
    }
  
}

export default MysqlRepository