import BuilderOptionInterface from './builder_option_interface.ts'

interface BuilderInterface{
    string(columnName: string): Promise<void>
    string(columnName: string, option?: BuilderOptionInterface): Promise<void>

    integer(columnName: string): Promise<void>
    integer(columnName: string, option?: BuilderOptionInterface): Promise<void>

    text(columnName: string, option?: BuilderOptionInterface): Promise<void>

    timestamp(columnName: string, option?: BuilderOptionInterface): Promise<void>

    build(): Promise<void>
}

export default BuilderInterface