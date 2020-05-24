import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import Configuration from "../src/configuration.ts";

Deno.test("testing configuration doesn't exist", async () => {
  await Deno.remove("./migration.config.ts");
  let tup = new Configuration();
  let result = await tup.exist();
  assertEquals(result, false);
});

Deno.test("testing configuration exist", async () => {
  let configFile;
  try {
    let tup = new Configuration();
    let result = await tup.exist();
    configFile = await Deno.create("./migration.config.ts");
    assertEquals(result, true);
  } catch (e) {
  } finally {
    await Deno.remove("./migration.config.ts");
    configFile?.close();
  }
});

Deno.test("testing create a config file if its not exist", async () => {
  let tup = new Configuration();
  await tup.saveFile();
  let result = await tup.exist();
  assertEquals(result, true);
});

Deno.test("testing adding configuration to created file", async () => {
  let tup = new Configuration();
  await tup.saveFile();
  await tup.addConfig();
  let textResult = await Deno.readTextFile("./migration.config.ts");

  let expectResult = `let MySQL = {
  dialect: 'mysql',
  migrationDirectory: './migrations',
  hostname: '127.0.0.1',
  username: 'root',
  db: 'dbname',
  password: 'password',
};

export default MySQL`;
  assertEquals(textResult, expectResult);
});
