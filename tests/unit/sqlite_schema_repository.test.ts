import SchemaRepositoryInterface from "../../src/interfaces/schema_repository_interface.ts";
import SqliteSchemaRepository from "../../src/sqlite/sqlite_schema_repository.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function description(text: string): string {
  return `Sqlite Schema Repository Test: ${text}`;
}

Deno.test(description("drop table"), async () => {
  let repo: SchemaRepositoryInterface = new SqliteSchemaRepository();
  repo.dropTable("users");
  assertEquals(
    repo.toSql(),
    `drop table 'users';`,
  );
});

Deno.test(description("find table"), async () => {
  let repo: SchemaRepositoryInterface = new SqliteSchemaRepository();
  repo.findTable("users");
  assertEquals(
    repo.toSql(),
    `select * from sqlite_master where type = 'table' and name = 'users';`,
  );
});

Deno.test(description("find column"), async () => {
  let repo: SchemaRepositoryInterface = new SqliteSchemaRepository();
  assertEquals(
    repo.toSql(),
    ``,
  );
});
