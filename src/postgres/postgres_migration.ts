import MigrationInterface from './../interfaces/migration_interface.ts'
class PostgresMigration implements MigrationInterface {

    async migrate(): Promise<void> {
        console.log('postgres migrate')
    }

    async rollback(): Promise<void> {
        console.log('postgres rollback')
    }
}

export default PostgresMigration