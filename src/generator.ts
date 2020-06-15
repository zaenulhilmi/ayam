import { Case } from "../deps.ts";
import Configuration from "./configuration.ts";

class Generator {
  command: string;

  constructor(command: string) {
    this.command = command;
  }

  async getFileName(): Promise<string> {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let timestamps: Array<Number> = [];
    timestamps.push(year, month, date, hours, minutes, seconds);
    let prefix = Generator.getPrefix(timestamps);
    let command = Case.snakeCase(this.command);
    return `${prefix}_${command}_migration.ts`;
  }

  async getTemplate(): Promise<string> {
    try {
      let filePath =
        new URL("templates/migration_file.stub", import.meta.url).pathname;
      return await Deno.readTextFile(filePath);
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  }

  async migrationText(): Promise<string> {
    let text = await this.getTemplate();
    text = text.replace("CLASS_NAME", Case.pascalCase(this.command));
    text = text.replace("CLASS_NAME", Case.pascalCase(this.command));
    return text;
  }

  async execute(): Promise<void> {
    let fileName = await this.getFileName();
    let config = await Configuration.newInstance();
    let dir = await config.get("migrationDirectory");
    let text = await this.migrationText();
    let isDirExist = await Generator.isPathExist(dir);
    if (!isDirExist) {
      await Deno.mkdir(dir, { recursive: true });
    }

    try {
      await Deno.stat(`${dir}/interfaces/schema_interface.ts`);
      await Deno.stat(`${dir}/interfaces/builder_interface.ts`);
      await Deno.stat(`${dir}/interfaces/builder_option_interface.ts`);
    } catch (e) {
      if (!await Generator.isPathExist(`${dir}/interfaces`)) {
        await Deno.mkdir(`${dir}/interfaces`, { recursive: true });
      }
      let schemaFilePath =
        new URL("interfaces/schema_interface.ts", import.meta.url).pathname;
      let builderFilePath =
        new URL("interfaces/builder_interface.ts", import.meta.url).pathname;
      let builderOptionFilePath =
        new URL("interfaces/builder_interface.ts", import.meta.url).pathname;
      await Deno.copyFile(
        schemaFilePath,
        `${dir}/interfaces/schema_interface.ts`,
      );
      await Deno.copyFile(
        builderFilePath,
        `${dir}/interfaces/builder_interface.ts`,
      );
      await Deno.copyFile(
        builderOptionFilePath,
        `${dir}/interfaces/builder_option_interface.ts`,
      );
    }

    let fullPath = `${dir}/${fileName}`;
    await Deno.writeTextFile(fullPath, text);
  }

  private static getPrefix(timestamps: Array<Number>): string {
    let formattedTimestamps: Array<string> = [];
    for (let i = 0; i < timestamps.length; i++) {
      let number = timestamps[i];
      let newNumber = Generator.addLeadingZero(number);
      formattedTimestamps.push(newNumber);
    }

    let prefix = formattedTimestamps.slice(0, 3).join("_") + "_" +
      formattedTimestamps.slice(3).join("");
    return prefix;
  }

  private static addLeadingZero(number: Number): string {
    if (number < 10) {
      return "0" + number.toString();
    }
    return number.toString();
  }

  private static async isPathExist(fileName: string): Promise<boolean> {
    try {
      await Deno.stat(fileName);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default Generator;
