import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";
import Generator from "./../src/generator.ts";
import Configuration from "./../src/configuration.ts"

Deno.test("generate a name for migration", async () => {
  let command: string = "create_users_table";
  let generator = new Generator(command);
  let fileName = await generator.getFileName();
  let prefix = generatePrefix();
  assertEquals(
    fileName,
    `${prefix}_create_users_table_migration.ts`,
  );
});

Deno.test("generate a name for migration using snakeCase", async () => {
  let command: string = "createUsersTable";
  let generator = new Generator(command);
  let fileName = await generator.getFileName();
  let prefix = generatePrefix();
  assertEquals(
    fileName,
    `${prefix}_create_users_table_migration.ts`,
  );
});

Deno.test("read template content", async () => {
  let command: string = "createUsersTable";
  let generator = new Generator(command);
  let templateText = await generator.getTemplate();
  let text = `class Migration {}
class CLASS_NAME extends Migration {
  constructor() {
    super();
  }

  async up(): Promise<void> {
  }

  async down(): Promise<void> {
  }
}

export default CLASS_NAME;
`;
  assertEquals(templateText, text);
});

Deno.test("read template and chage class name", async () => {
  let command: string = "createUsersTable";
  let generator = new Generator(command);
  let templateText = await generator.migrationText();
  let text = `class Migration {}
class CreateUsersTable extends Migration {
  constructor() {
    super();
  }

  async up(): Promise<void> {
  }

  async down(): Promise<void> {
  }
}

export default CreateUsersTable;
`;
  assertEquals(templateText, text);
});
Deno.test("add file to migration directory", async () => {
  let config = await Configuration.newInstance()
  await config.create()
  let directory = await config.get('migrationDirectory')

 let currentFileTotal = 0;
  try {
 let files = await Deno.readDir(directory) 
 for await (let file of files){
    currentFileTotal += 1
 }
  } catch (e){
    
  }

  let command: string = "createUsersTable";
  let generator = new Generator(command);
  await generator.execute();

 let afterFiles = await Deno.readDir(directory) 
 let afterTotal = 0;
 for await (let file of afterFiles){
    afterTotal += 1
 }

  assertEquals(afterTotal, currentFileTotal+1)

  await Deno.remove(directory, {recursive: true});

})


function generatePrefix() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let timestamps: Array<Number> = [];
  let formattedTimestamps: Array<string> = [];
  timestamps.push(year, month, date, hours, minutes, seconds);
  for (let i = 0; i < timestamps.length; i++) {
    let number = timestamps[i];
    let newNumber = "";
    if (number < 10) {
      newNumber = "0" + number.toString();
    } else {
      newNumber = number.toString();
    }
    formattedTimestamps.push(newNumber);
  }
  let prefix = formattedTimestamps.slice(0, 3).join("_") + "_" +
    formattedTimestamps.slice(3).join("");
  return prefix;
}
