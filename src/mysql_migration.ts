import MigrationInterface from './migration_interface.ts'
class MysqlMigration implements MigrationInterface{
    async migrate(): Promise<void>{
        console.log('migrate mysql')
    }
    async rollback(): Promise<void>{
        console.log('rollback mysql')
    }
}

export default MysqlMigration