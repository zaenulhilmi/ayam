import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";
import Configuration from "../src/configuration.ts";

let realPath = await Deno.realPath(".");
let fileLocation = `${realPath}/migration.config.ts`;

Deno.test("configuration doesn't exist", async () => {
  let tup = await Configuration.newInstance();
  let shouldRemove = true;
  try {
    await Deno.stat(tup.fileLocation);
  } catch (e) {
    shouldRemove = false;
  }
  if (shouldRemove) {
    await tup.remove();
  }
  let result = await tup.exist();
  assertEquals(result, false);
});

Deno.test("configuration exist", async () => {
  let configFile;
  try {
    let tup = await Configuration.newInstance();
    let result = await tup.exist();
    configFile = await Deno.create(fileLocation);
    assertEquals(result, true);
  } catch (e) {
  } finally {
    await Deno.remove(fileLocation);
    configFile?.close();
  }
});

Deno.test("create a config file if its not exist", async () => {
  let tup = await Configuration.newInstance();
  await tup.saveFile();
  let result = await tup.exist();
  assertEquals(result, true);
});

Deno.test("adding configuration to created file", async () => {
  let tup = await Configuration.newInstance();
  await tup.saveFile();
  await tup.addConfig();
  let textResult = await Deno.readTextFile(fileLocation);
  let fileStubPath =
    new URL("../src/templates/config_file.stub", import.meta.url).pathname;
  let expectedResult = await Deno.readTextFile(fileStubPath);
  assertEquals(textResult, expectedResult);
});

Deno.test("remove configuration file", async () => {
  let config = await Configuration.newInstance();
  await config.create();
  await config.remove();
  assertEquals(await config.exist(), false);
});

Deno.test("get configuration file", async () => {
  let config = await Configuration.newInstance();
  await config.create();
  let dialect = await config.get("dialect");
  assertEquals(dialect, "mysql");
  await config.remove();
});
