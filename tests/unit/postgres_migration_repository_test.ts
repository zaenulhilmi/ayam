import MigrationRepositoryInterface from "../../src/interfaces/migration_repository_interface.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import PostgresMigrationRepository from "../../src/postgres/postgres_migration_repository.ts";

function description(text: string): string {
  return `Postgres Migration Repository Test: ${text}`;
}

Deno.test(description("create migrations table"), async () => {
  let repo: MigrationRepositoryInterface = new PostgresMigrationRepository();
  repo.create();
  assertEquals(
    repo.toSql(),
    `create table migrations (id bigserial primary key, file_name varchar(255) not null, step int not null, created_at timestamp default current_timestamp, updated_at timestamp default current_timestamp);`,
  );
});

Deno.test(description("insert into migrations table"), async () => {
  let repo: MigrationRepositoryInterface = new PostgresMigrationRepository();
  repo.insert("lalala_3.ts", 2);
  assertEquals(
    repo.toSql(),
    `insert into migrations (file_name, step) values ('lalala_3.ts', '2');`,
  );
});

Deno.test(description("get last migration"), () => {
  let repo: MigrationRepositoryInterface = new PostgresMigrationRepository();
  repo.lastMigration();
  assertEquals(
    repo.toSql(),
    `select * from migrations order by id desc limit 1;`,
  );
});

Deno.test(description("get last migration"), () => {
  let repo: MigrationRepositoryInterface = new PostgresMigrationRepository();
  repo.lastStepMigrations();
  assertEquals(
    repo.toSql(),
    `select * from migrations where step = (select max(step) from migrations);`,
  );
});

Deno.test(description("delete last migration step"), () => {
  let repo: MigrationRepositoryInterface = new PostgresMigrationRepository();
  repo.removeAllLastStep();
  assertEquals(
    repo.toSql(),
    `delete from migrations where step in (select max(step) from migrations);`,
  );
});
