import Configuration from './configuration.ts'
import SchemaInterface from './schema_interface.ts'
import MysqlSchemaRepository from './mysql_schema_repository.ts'
class Migration{
    async execute(){
        let dir = await Deno.cwd() + '/migrations'
        for await (const dirEntry of Deno.readDir(dir)) {
            if(dirEntry.name.endsWith('.ts') && dirEntry.name.startsWith("2020")){
                let test = (await import(`${dir}/${dirEntry.name}`)).default
                let haha = new test()
                // console.log(await haha.up())
                // console.log(dirEntry.name)
                let mysqlSchemaRepository: SchemaInterface = new MysqlSchemaRepository()
                await haha.up(mysqlSchemaRepository)
            }
          }
    }
}

export default Migration