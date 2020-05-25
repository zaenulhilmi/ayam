import { Case } from "../deps.ts";
import Configuration from "./configuration.ts"

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
    let text = await Deno.readTextFile("./src/templates/migration_file.ts");
    return text;
  }

  async execute(): Promise<void> {
    let fileName = await this.getFileName()
    let config = await Configuration.newInstance()
    let dir = await config.get('migrationDirectory')
    let text = await this.getTemplate()
    let fullPath = `${dir}/${fileName}`
    console.log('this is full path', fullPath)
    Deno.writeTextFile(fullPath, text)

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
