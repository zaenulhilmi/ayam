import { Denomander } from "./deps.ts";
import Configuration from "./src/configuration.ts";
import Generator from "./src/generator.ts";
import Migrate from "./src/migrate.ts";
import MigrationInterface from "./src/interfaces/migration_interface.ts";
import CommandInterface from "./src/interfaces/command_interface.ts";
import MigrationFactory from "./src/migration_factory.ts";
async function runCLI(): Promise<void> {
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
    console.log("generate a file");
    return;
  }

  let config = await Configuration.newInstance();
  let dialect = await config.get("dialect");
  let migration: MigrationInterface = (new MigrationFactory(dialect)).get();
  let migrate: CommandInterface = new Migrate(migration);

  if (program.migrate) {
    await migrate.execute();
  }

  if (program.rollback) {
    await migrate.undo();
  }
}

if (import.meta.main) {
  await runCLI();
}
