// import MigrationRepositoryInterface from "../src/interfaces/migration_repository_interface.ts";
// import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
//
// function description(text: string): string {
//     return `Sqlite Migration Repository Test: ${text}`;
// }
//
// Deno.test(description("determine if a table exist"), async () => {
//     let repo: MigrationRepositoryInterface = new PostgresMigrationRepository();
//     repo.create();
//     assertEquals(
//         repo.toSql(),
//         `select * from sqlite_master where type ='table' and name = 'migrations';`,
//     );
// });
//
