import MysqlSchemaRepository from "../../src/mysql/mysql_schema_repository.ts";
import SchemaRepositoryInterface from "../../src/interfaces/schema_repository_interface.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("mysql insert into table", async () => {
  let repo: SchemaRepositoryInterface = new MysqlSchemaRepository();
  repo.insert("users", { first_name: "John", last_name: "Doe" });
  assertEquals(
    repo.toSql(),
    `insert into users set first_name='John', last_name='Doe'`,
  );
});

Deno.test("mysql find table", async () => {
  let repo: SchemaRepositoryInterface = new MysqlSchemaRepository();
  repo.findTable("users");
  assertEquals(
    repo.toSql(),
    `select * from information_schema.tables where table_schema = database() and table_name = 'users';`,
  );
});

Deno.test("mysql find table column", async () => {
  let repo: SchemaRepositoryInterface = new MysqlSchemaRepository();
  repo.findTableColumn("users", "name");
  assertEquals(
    repo.toSql(),
    `select * from information_schema.columns where table_schema = database() and table_name = 'users' and column_name = 'name';`,
  );
});

Deno.test("mysql drop table", async () => {
  let repo: SchemaRepositoryInterface = new MysqlSchemaRepository();
  repo.dropTable("users");
  assertEquals(repo.toSql(), `drop table users;`);
});

Deno.test("mysql rename table", async () => {
  let repo: SchemaRepositoryInterface = new MysqlSchemaRepository();
  repo.renameTable("customers", "users");
  assertEquals(repo.toSql(), `rename table customers to users;`);
});
