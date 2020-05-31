import PostgresBuilder from "../src/postgres/postgres_builder.ts"
import { assertEquals} from "https://deno.land/std/testing/asserts.ts";

Deno.test('create a table using id()', async () => {
    let table = new PostgresBuilder('users')
    table.id()
    assertEquals(table.toSql(), 'create table users (id bigserial not null primary key);')
})

Deno.test('create a table and a field of string', async () => {
    let table = new PostgresBuilder('users')
    table.string('name')
    assertEquals(table.toSql(), 'create table users (name varchar(255) not null);')
})

Deno.test('create a table and a field of text', async () => {
    let table = new PostgresBuilder('users')
    table.text('about')
    assertEquals(table.toSql(), 'create table users (about text not null);')
})

Deno.test('create a table and a field of timestamp', async () => {
    let table = new PostgresBuilder('users')
    table.timestamp('subscribed_at')
    assertEquals(table.toSql(), 'create table users (subscribed_at timestamp not null);')
})


Deno.test('create a table and a field of timestamp', async () => {
    let table = new PostgresBuilder('users')
    table.timestamps()
    assertEquals(table.toSql(), 'create table users (created_at timestamp not null, updated_at timestamp not null);')
})

Deno.test('create a table with a nullable field', async () => {
    let table = new PostgresBuilder('users')
    table.string('email').nullable()
    assertEquals(table.toSql(), 'create table users (email varchar(255) null);')
})


Deno.test('create a table with a field and default value', async () => {
    let table = new PostgresBuilder('users')
    table.string('name').default("no name")
    assertEquals(table.toSql(), `create table users (name varchar(255) not null default 'no name');`)
})


