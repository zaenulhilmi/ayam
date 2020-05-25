import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import Configuration from "../src/configuration.ts";

let realPath = await Deno.realPath('.')
let fileLocation = `${realPath}/migration.config.ts`

Deno.test("testing configuration doesn't exist", async () => {
  let tup = await Configuration.instance();
  await tup.remove()
  let result = await tup.exist();
  assertEquals(result, false);
});

Deno.test("testing configuration exist", async () => {
  let configFile;
  try {
    let tup = await Configuration.instance();
    let result = await tup.exist();
    configFile = await Deno.create(fileLocation);
    assertEquals(result, true);
  } catch (e) {
  } finally {
    await Deno.remove(fileLocation);
    configFile?.close();
  }
});

Deno.test("testing create a config file if its not exist", async () => {
  let tup = await Configuration.instance();
  await tup.saveFile();
  let result = await tup.exist();
  assertEquals(result, true);
});

Deno.test("testing adding configuration to created file", async () => {
  let tup = await Configuration.instance();
  await tup.saveFile();
  await tup.addConfig();
  let textResult = await Deno.readTextFile(fileLocation);

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

Deno.test("testing remove configuration file", async () => {
  let config = await Configuration.instance();
  await config.create()
  await config.remove()
  assertEquals(await config.exist(), false)
})
