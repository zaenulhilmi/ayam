import MigrationInterface from './migration_interface.ts'

interface MigrationData {
   id: Number,
   fileName:  string,
   step: Number,
   createdAt: Date,
   updatedAt: Date
}

class MemoryMigration implements MigrationInterface{

    data: Array<MigrationData> = []

    async migrate(): Promise<void>{
        // check latest migration
        console.log('migrate mysql')
    }
    async rollback(): Promise<void>{
        console.log('rollback mysql')
    }

    async _getLastMigrationData(): Promise<MigrationData> {
        return {id: 1, fileName: 'lala', step: 1, createdAt: new Date(), updatedAt: new Date()}
    }

    async _getSortedUnexecutedData() {

    }

    async _executeData() {

    }

    async _getLastStepData() {

    }

    async _executeLastStepData() {

    }
}

export default MysqlMigration