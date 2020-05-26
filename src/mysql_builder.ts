import BuilderInterface from "./builder_interface.ts";
import mysql from "./driver/mysql.ts"
class MySqlBuilder implements BuilderInterface{

    tableName: string
    query: string
    columns: Array<string> = []

    constructor(tableName: string){
        this.tableName = tableName
        this.query = `CREATE TABLE ${this.tableName} ( COLUMNS_PLACEHOLDER );`
    }

    async string(columnName: string, length?: number): Promise<void> {
        if(!length) length = 100
        this.columns.push(`${columnName} VARCHAR(${length})`)
    }

    async integer(columnName: string, length?: number): Promise<void> {
        if(!length) length = 11
        this.columns.push(`${columnName} INT(${length})`)
    }

    async text(columnName: string): Promise<void> {
        this.columns.push(`${columnName} TEXT`)
    }

    async timestamp(columnName: string): Promise<void> {
        this.columns.push(`${columnName} TIMESTAMP`)
    }
    
    async build(){
        let joinnedColumns = this.columns.join(", ")
        this.query = this.query.replace("COLUMNS_PLACEHOLDER", joinnedColumns)
        console.log(this.query)
        mysql.execute(this.query) 
    }
}

export default MySqlBuilder