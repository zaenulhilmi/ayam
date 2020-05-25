import ConfigurationAbstract from "./configuration_abstract.ts";
class Configuration extends ConfigurationAbstract {

  fileLocation: string 

  constructor() {
    super()
    this.fileLocation = './migration.config.ts'
  }

  async saveFile(): Promise<void> {
    let configFile = await Deno.create(this.fileLocation);
    configFile.close();
  }

  async addConfig(): Promise<void> {
    let config = `let MySQL = {
  dialect: 'mysql',
  migrationDirectory: './migrations',
  hostname: '127.0.0.1',
  username: 'root',
  db: 'dbname',
  password: 'password',
};

export default MySQL`;
    await Deno.writeTextFile(this.fileLocation, config);
  }

  async exist(): Promise<boolean> {
    try {
      let res = await Deno.stat(this.fileLocation);
      return true;
    } catch (e) {
      return false;
    }
  }

  async remove(): Promise<void> {
    await Deno.remove(this.fileLocation)  
  }
}
export default Configuration;
