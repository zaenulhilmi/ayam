import MySqlBuilder from "../src/mysql/mysql_builder.ts"
import { assertEquals} from "https://deno.land/std/testing/asserts.ts";

Deno.test("create table using id()", async () => {
    let table = new MySqlBuilder('users')
    table.id()
    assertEquals(table.toSql(), `create table users (id bigint not null auto_increment primary key);`)
})


Deno.test("create table with a field of string", async () => {
    let table = new MySqlBuilder('users')
    table.string('name')
    assertEquals(table.toSql(), `create table users (name varchar(255) not null);`)
})


Deno.test("create table with a field of integer", async () => {
    let table = new MySqlBuilder('users')
    table.integer('age')
    assertEquals(table.toSql(), `create table users (age int not null);`)
})


Deno.test("create table with a field of text", async () => {
    let table = new MySqlBuilder('users')
    table.text('about')
    assertEquals(table.toSql(), `create table users (about text not null);`)
})

Deno.test("create table with a field of timestamp", async () => {
    let table = new MySqlBuilder('users')
    table.timestamp('published_at')
    assertEquals(table.toSql(), `create table users (published_at timestamp not null);`)
})

Deno.test("create table with a field of default timestamps", async () => {
    let table = new MySqlBuilder('users')
    table.timestamps()
    assertEquals(table.toSql(), `create table users (created_at timestamp not null, updated_at timestamp not null);`)
})

Deno.test("create table with a field of string nullable", async () => {
    let table = new MySqlBuilder('users')
    table.string('email').nullable()
    assertEquals(table.toSql(), `create table users (email varchar(255) null);`)
})

Deno.test("create table with a field of integer unsigned", async () => {
    let table = new MySqlBuilder('users')
    table.integer('age').unsigned()
    assertEquals(table.toSql(), `create table users (age int unsigned not null);`)
})

Deno.test("create table with a field of integer unsigned default value", async () => {
    let table = new MySqlBuilder('users')
    table.integer('age').default(String(4))
    assertEquals(table.toSql(), `create table users (age int not null default '4');`)
})