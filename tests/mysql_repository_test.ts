import MysqlRepository from "../src/mysql/mysql_repository.ts";
import RepositoryInterface from "../src/interfaces/repository_interface.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("mysql find table", async () => {
  let repo: RepositoryInterface = new MysqlRepository();
  repo.findTable("users");
  assertEquals(
    repo.toSql(),
    `select * from information_schema.tables where table_schema = database() and table_name = 'users';`,
  );
});

Deno.test("mysql find table column", async () => {
  let repo: RepositoryInterface = new MysqlRepository();
  repo.findTableColumn("users", "name");
  assertEquals(
    repo.toSql(),
    `select * from information_schema.columns where table_schema = database() and table_name = 'users' and column_name = 'name';`,
  );
});

Deno.test("mysql drop table", async () => {
  let repo: RepositoryInterface = new MysqlRepository();
  repo.dropTable("users");
  assertEquals(repo.toSql(), `drop table users;`);
});

Deno.test("mysql rename table", async () => {
  let repo: RepositoryInterface = new MysqlRepository();
  repo.renameTable("customers", "users");
  assertEquals(repo.toSql(), `rename table customers to users;`);
});
