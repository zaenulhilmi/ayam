import PostgresSchemaRepository from "../src/postgres/postgres_schema_repository.ts";
import SchemaRepositoryInterface from "../src/interfaces/schema_repository_interface.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("postgres insert into table", async () => {
  let repo: SchemaRepositoryInterface = new PostgresSchemaRepository();
  repo.insert("users", { first_name: "John", last_name: "Doe" });
  assertEquals(
    repo.toSql(),
    `insert into users set first_name='John', last_name='Doe'`,
  );
});

Deno.test("postgres find table", async () => {
  let repo: SchemaRepositoryInterface = new PostgresSchemaRepository();
  repo.findTable("users");
  assertEquals(
    repo.toSql(),
    `select table_name from information_schema.tables where table_schema='public' and table_name='users';`,
  );
});

Deno.test("postgres find table column", async () => {
  let repo: SchemaRepositoryInterface = new PostgresSchemaRepository();
  repo.findTableColumn("users", "name");
  assertEquals(
    repo.toSql(),
    `select table_name, column_name from information_schema.columns where table_schema='public' and table_name='users' and column_name='name';`,
  );
});

Deno.test("postgres drop table", async () => {
  let repo: SchemaRepositoryInterface = new PostgresSchemaRepository();
  repo.dropTable("users");
  assertEquals(repo.toSql(), `drop table users;`);
});

Deno.test("postgres rename table", async () => {
  let repo: SchemaRepositoryInterface = new PostgresSchemaRepository();
  repo.renameTable("customers", "users");
  assertEquals(repo.toSql(), `alter table customers rename to users;`);
});
