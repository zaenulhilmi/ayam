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
    let prefix = this._getPrefix(timestamps);
    let command = Case.snakeCase(this.command);
    return `${prefix}_${command}_migration.ts`;
  }

  async getTemplate(): Promise<string> {
    try {
      let filePath =
        new URL("templates/migration_file.stub", import.meta.url).pathname;
      let text = await Deno.readTextFile(filePath);
      return text;
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
    let isDirExist: boolean = true;
    try {
      await Deno.stat(dir);
    } catch (e) {
      isDirExist = false;
    }
    if (!isDirExist) {
      await Deno.mkdir(dir, { recursive: true });
    }

    try {
      await Deno.stat(`${dir}/schema_interface.ts`);
      await Deno.stat(`${dir}/builder_interface.ts`);
    } catch (e) {
      let schemaFilePath =
        new URL("schema_interface.ts", import.meta.url).pathname;
      let builderFilePath =
        new URL("builder_interface.ts", import.meta.url).pathname;
      await Deno.copyFile(schemaFilePath, `${dir}/schema_interface.ts`);
      await Deno.copyFile(builderFilePath, `${dir}/builder_interface.ts`);
    }

    let fullPath = `${dir}/${fileName}`;
    await Deno.writeTextFile(fullPath, text);
  }

  _getPrefix(timestamps: Array<Number>): string {
    let formattedTimestamps: Array<string> = [];
    for (let i = 0; i < timestamps.length; i++) {
      let number = timestamps[i];
      let newNumber = this._addLeadingZero(number);
      formattedTimestamps.push(newNumber);
    }

    let prefix = formattedTimestamps.slice(0, 3).join("_") + "_" +
      formattedTimestamps.slice(3).join("");
    return prefix;
  }
  _addLeadingZero(number: Number): string {
    if (number < 10) {
      return "0" + number.toString();
    }
    return number.toString();
  }
}

export default Generator;
