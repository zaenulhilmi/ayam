import SchemaInterface from "../src/schema_interface.ts"
import MySqlSchemaRepository from "../src/mysql_schema_repository.ts"
import BuilderInterface from "../src/builder_interface.ts"
import mysql from '../src/driver/mysql.ts'
import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";

// Deno.test({name: "schema test", async fn(): Promise<void> {
//     let schema: SchemaInterface = new MySqlSchemaRepository()
//     await schema.create('dora', async (table: BuilderInterface) => {
//         table.string("title")
//         table.string("title2", 10)
//         table.integer("number", 10)
//         table.integer("number2")
//         table.text("content")
//         table.timestamp("created_at")
//         console.log('this is inside schema create')
//     })
//     assertEquals(true, true)
//     }, sanitizeResources: false, sanitizeOps: false
//  })
console.log('this is env', Deno.env.get("HELLO"))