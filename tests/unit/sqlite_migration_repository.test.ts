import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import SqliteMigrationRepository from "../../src/sqlite/sqlite_migration_repository.ts";
import MigrationRepositoryInterface from "../../src/interfaces/migration_repository_interface.ts";

function description(text: string): string {
    return `Sqlite Migration Repository Test: ${text}`;
}

Deno.test(description("create migrations table"), async () => {
    let repo: MigrationRepositoryInterface = new SqliteMigrationRepository();
    repo.create();
    assertEquals(
        repo.toSql(),
        `create table migrations (id integer primary key autoincrement, file_name varchar(255), step integer, created_at text, updated_at text);`
    );
});

Deno.test(description("insert migrations rows"), async () => {
    let repo: MigrationRepositoryInterface = new SqliteMigrationRepository();
    repo.insert('2020_file_name.ts', 2);
    assertEquals(
      repo.toSql(),
      `insert into migrations (file_name, step) values ('2020_file_name.ts', '2');`
    );
});

Deno.test(description("get last migration row"), async () => {
    let repo: MigrationRepositoryInterface = new SqliteMigrationRepository();
    repo.lastMigration();
    assertEquals(
      repo.toSql(),
      `select * from migrations order by id desc limit 1;`
    );
});

Deno.test(description("get last step migrations rows"), async () => {
    let repo: MigrationRepositoryInterface = new SqliteMigrationRepository();
    repo.lastStepMigrations();
    assertEquals(
      repo.toSql(),
      `select * from migrations where step = (select max(step) from migrations);`
    );
});

Deno.test(description("remove all last step migrations"), async () => {
    let repo: MigrationRepositoryInterface = new SqliteMigrationRepository();
    repo.removeAllLastStep();
    assertEquals(
      repo.toSql(),
      `delete from migrations where step = (select max(step) from migrations);`
    );
});
