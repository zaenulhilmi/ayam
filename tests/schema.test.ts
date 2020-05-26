import SchemaInterface from "../src/schema_interface.ts"
import MySqlSchemaRepository from "../src/mysql_schema_repository.ts"
import BuilderInterface from "../src/builder_interface.ts"
import mysql from '../src/driver/mysql.ts'
import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";

Deno.test({name: "schema test", async fn(): Promise<void> {
    let schema: SchemaInterface = new MySqlSchemaRepository()
    await schema.drop('dora')
    assertEquals(true, true)
    }, sanitizeResources: false, sanitizeOps: false
 })