import SqliteBuilder from "../../src/sqlite/sqlite_builder.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("create a table using id()", async () => {
  let table = new SqliteBuilder("users");
  table.id();
  assertEquals(
    table.toSql(),
    "create table users (id integer not null primary key autoincrement);",
  );
});
Deno.test("create a table and a field of string", async () => {
  let table = new SqliteBuilder("users");
  table.string("name");
  assertEquals(
    table.toSql(),
    "create table users (name varchar(255) not null);",
  );
});

Deno.test("create a table and a field of text", async () => {
  let table = new SqliteBuilder("users");
  table.text("about");
  assertEquals(table.toSql(), `create table users (about text not null);`);
});

Deno.test("create a table and a field of timestamp", async () => {
  let table = new SqliteBuilder("users");
  table.timestamp("subscribed_at");
  assertEquals(
    table.toSql(),
    "create table users (subscribed_at text not null);",
  );
});

Deno.test("create a table with a nullable field", async () => {
  let table = new SqliteBuilder("users");
  table.string("email").nullable();
  assertEquals(table.toSql(), "create table users (email varchar(255) null);");
});

Deno.test("create a table with a field and default value", async () => {
  let table = new SqliteBuilder("users");
  table.string("name").default("no name");
  assertEquals(
    table.toSql(),
    `create table users (name varchar(255) not null default 'no name');`,
  );
});
