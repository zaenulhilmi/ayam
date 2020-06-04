import MysqlMigrationRepository from "../src/mysql/mysql_migration_repository.ts";
import MigrationRepositoryInterface from "../src/interfaces/migration_repository_interface.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function description(text: string): string {
  return `Mysql Migration Repository Test: ${text}`;
}

Deno.test(description("create migrations table"), async () => {
  let repo: MigrationRepositoryInterface = new MysqlMigrationRepository();
  repo.create();
  assertEquals(
    repo.toSql(),
    `create table migrations (id bigint primary key auto_increment, file_name varchar(255) not null, step int not null, created_at timestamp default current_timestamp, updated_at timestamp default current_timestamp);`,
  );
});

Deno.test(description("insert into migrations table"), async () => {
  let repo: MigrationRepositoryInterface = new MysqlMigrationRepository();
  repo.insert("2020_lalala.ts", 2);
  assertEquals(
    repo.toSql(),
    `insert into migrations (file_name, step) values ('2020_lalala.ts', '2')`,
  );
});

Deno.test(description("get last migration"), () => {
  let repo: MigrationRepositoryInterface = new MysqlMigrationRepository();
  repo.lastMigration();
  assertEquals(
    repo.toSql(),
    `select * from migrations order by id desc limit 1;`,
  );
});

Deno.test(description("get last steps migration"), () => {
  let repo: MigrationRepositoryInterface = new MysqlMigrationRepository();
  repo.lastStepMigrations();
  assertEquals(
    repo.toSql(),
    `select * from migrations where step = (select max(step) from migrations);`,
  );
});

Deno.test(description("delete last migration step"), () => {
  let repo: MigrationRepositoryInterface = new MysqlMigrationRepository();
  repo.removeAllLastStep();
  assertEquals(
    repo.toSql(),
    `delete t.* from migrations t inner join (select max(step) max_step FROM migrations) tmax ON t.step = tmax.max_step;`,
  );
});
