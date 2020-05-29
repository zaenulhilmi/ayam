import { Denomander } from "./deps.ts";
import Configuration from "./src/configuration.ts";
import Generator from "./src/generator.ts";
import MysqlMigration from "./src/mysql_migration.ts";
import Migrate from "./src/migrate.ts";
import PostgresSchemaRepository from "./src/postgres_schema_repository.ts";
async function myCLI(): Promise<void> {
  const program = new Denomander(
    {
      app_name: "Deno Migration",
      app_description:
        "Database migration for Deno for migrating mysql, postgres, and sqlite",
      app_version: "0.0.1",
    },
  );

  program
    .command("initiate", "Initial Config")
    .command("generate [commandName]", "create migration file")
    .command("migrate", "migrating")
    .command("rollback", "rollback")
    .command("pg", "testing")
    .parse(Deno.args);

  if (program.initiate) {
    let config = await Configuration.newInstance();
    if (await config.exist()) {
      console.log("configuration is already exist");
    } else {
      await config.create();
      console.log("configuration created");
    }
  }

  if (program.generate) {
    let generator = new Generator(program.commandName);
    await generator.execute();
    console.log('generate a file')
  }

  if (program.migrate) {
    let migration = new MysqlMigration();
    let migrate = new Migrate(migration);
    await migrate.execute();
    console.log("migrated")
  }

  if (program.rollback) {
    let migration = new MysqlMigration();
    let migrate = new Migrate(migration);
    await migrate.undo();
    console.log("rollback")
  }

  if(program.pg){
    let pg  = new PostgresSchemaRepository()
    console.log(await pg.drop('test'))
  }
}

if (import.meta.main) {
  await myCLI();
}
