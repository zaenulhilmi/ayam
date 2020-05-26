interface BuilderInterface{
    string(columnName: string): Promise<void>
    string(columnName: string, length: number): Promise<void>
    integer(columnName: string): Promise<void>
    integer(columnName: string, length: number): Promise<void>
    text(columnName: string): Promise<void>
    timestamp(columnName: string): Promise<void>
    build(): Promise<void>
}

export default BuilderInterface