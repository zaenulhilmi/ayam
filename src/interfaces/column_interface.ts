interface ColumnInterface{
    name: string
    type: string
    setPrimary(primary: string): void;
    setUnsigned(unsigned: boolean): void;
    setNullable(nullable: boolean): void
    setKey(key: string): void
    setDefault(value: any): void
    toString(): string
}

export default ColumnInterface