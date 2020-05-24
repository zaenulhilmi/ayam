//import { Denomander } from './deps.ts'

import { Denomander } from "./deps.ts";
import Configuration from "./src/configuration.ts";

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
  .command("generate", "create migration file")
  .parse(Deno.args);

if (program.initiate) {
  let config = new Configuration();
  if (await config.exist()) {
    console.log("configuration is already exist");
  } else {
    await config.create();
    console.log("configuration created");
  }
}

if (program.generate) {
  //Adding file
}
