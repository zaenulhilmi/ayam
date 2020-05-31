import { Denomander } from "./deps.ts";
import Configuration from "./src/configuration.ts";
import Generator from "./src/generator.ts";
import MysqlMigration from "./src/mysql/mysql_migration.ts";
import BuilderInterface from "./src/interfaces/builder_interface.ts";
import Migrate from "./src/migrate.ts";
import MigrationInterface from "./src/interfaces/migration_interface.ts";
import CommandInterface from "./src/interfaces/command_interface.ts";
import PostgresSchemaRepository from "./src/postgres/postgres_schema_repository.ts";
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
    console.log("generate a file");
  }

  if (program.migrate) {
    let migration: MigrationInterface = new MysqlMigration();
    let migrate: CommandInterface = new Migrate(migration);
    await migrate.execute();
    console.log("migrated");
  }

  if (program.rollback) {
    let migration: MigrationInterface = new MysqlMigration();
    let migrate: CommandInterface = new Migrate(migration);
    await migrate.undo();
    console.log("rollback");
  }

  if (program.pg) {
    let schema = new PostgresSchemaRepository();
    if (await schema.hasTable("users")) {
      await schema.drop("users");
    }
    await schema.create("users", async (table: BuilderInterface) => {
      table.id();
      table.string("name_nullable").nullable();
      table.string("name_not_nullable");
      table.integer("integer_nullable").nullable().unsigned();
      table.integer("integer_not_nullable").default(String(45));
      table.text("text_nullable").nullable();
      table.text("text_not_nullable").default("hello world");
      table.timestamp("timestamp_nullable").nullable();
      table.timestamp("timestamp_not_nullable");
    });
  }
}

if (import.meta.main) {
  await myCLI();
}
