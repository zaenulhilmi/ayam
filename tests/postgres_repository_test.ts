import PostgresRepository from "../src/postgres/postgres_repository.ts";
import RepositoryInterface from "../src/interfaces/repository_interface.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("postgres insert into table", async () => {
  let repo: RepositoryInterface = new PostgresRepository();
  repo.insert("users", {first_name: 'John', last_name: 'Doe'});
  assertEquals(
    repo.toSql(),
    `insert into users set first_name='John', last_name='Doe'`
  );
});

Deno.test("postgres find table", async () => {
  let repo: RepositoryInterface = new PostgresRepository();
  repo.findTable("users");
  assertEquals(
    repo.toSql(),
    `select * from information_schema.tables where table_schema='public' and table_name='users';`,
  );
});

Deno.test("postgres find table column", async () => {
  let repo: RepositoryInterface = new PostgresRepository();
  repo.findTableColumn("users", "name");
  assertEquals(
    repo.toSql(),
    `select * from information_schema.columns where table_schema='public' and table_name='users' and column_name='name';`,
  );
});

Deno.test("postgres drop table", async () => {
  let repo: RepositoryInterface = new PostgresRepository();
  repo.dropTable("users");
  assertEquals(repo.toSql(), `drop table users;`);
});

Deno.test("postgres rename table", async () => {
  let repo: RepositoryInterface = new PostgresRepository();
  repo.renameTable("customers", "users");
  assertEquals(repo.toSql(), `alter table customers rename to users;`);
});
