import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import Generator from "./../src/generator.ts";

Deno.test("testing generate a name for migration", async () => {
  let command: string = "create_users_table";
  let generator = new Generator(command);
  let fileName = await generator.getFileName();
  let prefix = generatePrefix()
  assertEquals(
    fileName,
    `${prefix}_create_users_table_migration.ts`,
  );
});

Deno.test("testing generate a name for migration using snakeCase", async() => {
  let command: string = "createUsersTable";
  let generator = new Generator(command);
  let fileName = await generator.getFileName();
  let prefix = generatePrefix()
  assertEquals(
    fileName,
    `${prefix}_create_users_table_migration.ts`,
  );
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
    return prefix
}
