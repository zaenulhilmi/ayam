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
    return `${prefix}_${this.command}_migration.ts`;
  }

  _getPrefix(timestamps: Array<Number>): string {
    let formattedTimestamps: Array<string> = [];
    for (let i = 0; i < timestamps.length; i++) {
      let number = timestamps[i];
      let newNumber = this._addLeadingZero(number)
      formattedTimestamps.push(newNumber);
    }

    let prefix = formattedTimestamps.slice(0, 3).join("_") + "_" +
      formattedTimestamps.slice(3).join("");
    return prefix;
  }
  _addLeadingZero(number: Number):string {
      if (number < 10) {
        return "0" + number.toString();
      } 
      return number.toString()
    }
}

export default Generator;
