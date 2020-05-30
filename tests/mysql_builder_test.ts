import MySqlBuilder from "../src/mysql/mysql_builder.ts"
import BuilderInterface from "../src/interfaces/builder_interface.ts"

Deno.test("create primary key", async () => {
    let builder: BuilderInterface = new MySqlBuilder('users', 'create')
    builder.id()
    console.log(builder.toSql())
})