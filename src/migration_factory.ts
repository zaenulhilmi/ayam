import MysqlMigration from "./mysql/mysql_migration.ts"
import MigrationInterface from './interfaces/migration_interface.ts'

class MigrationFactory {
    dialect: string
    constructor(dialect: string){
        this.dialect = dialect
    }

    get(): MigrationInterface{
        switch(this.dialect){
            case 'mysql':
                return new MysqlMigration()
        }
        throw new Error('dialect is not defined')
    }
}

export default MigrationFactory