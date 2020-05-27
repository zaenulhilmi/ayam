//import { Denomander } from './deps.ts'

import { Denomander } from "./deps.ts";
import Configuration from "./src/configuration.ts";
import Generator from "./src/generator.ts"
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
  let generator = new Generator(program.commandName)
  await generator.execute()
}
}

if(import.meta.main){
  await myCLI()
}