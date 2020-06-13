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

