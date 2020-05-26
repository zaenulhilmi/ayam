import SchemaInterface from "../src/schema_interface.ts"
import MySqlSchemaRepository from "../src/mysql_schema_repository.ts"
import BuilderInterface from "../src/builder_interface.ts"
import { assertEquals} from "https://deno.land/std/testing/asserts.ts";

Deno.test({name: "schema test", async fn(): Promise<void> {
    let schema: SchemaInterface = new MySqlSchemaRepository()
    await schema.create('lalalark', async (table: BuilderInterface) => {
        table.string('lala')
        table.string('lalalength', {length: 45})
        table.string('lalanullable', {length: 45, nullable: true})
    })
    assertEquals(true, true)
    }, sanitizeResources: false, sanitizeOps: false
 })