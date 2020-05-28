interface MigrationInterface{
    migrate(): Promise<void>
    rollback(): Promise<void>
}

export default MigrationInterface