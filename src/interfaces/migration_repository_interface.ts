interface MigrationRepositoryInterface {
    query: string
    create(): MigrationRepositoryInterface
    insert(fileName: string, step: number): MigrationRepositoryInterface
    lastMigration(): MigrationRepositoryInterface
    removeAllLastStep(): MigrationRepositoryInterface

    execute(): Promise<void>
    get(): Promise<any>
    toSql(): string
}

export default MigrationRepositoryInterface