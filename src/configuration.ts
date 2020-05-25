import ConfigurationAbstract from "./configuration_abstract.ts";
class Configuration extends ConfigurationAbstract {
  fileLocation: string = "";

  constructor() {
    super();
  }

  async initiate(): Promise<void> {
    let realPath = await Deno.realPath(".");
    this.fileLocation = `${realPath}/migration.config.ts`;
  }

  static async newInstance(): Promise<Configuration> {
    let config = new Configuration();
    await config.initiate();
    return config;
  }

  async saveFile(): Promise<void> {
    console.log(this.fileLocation)
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
      if (!res.isFile) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  async get(key: string): Promise<string> {
    let config = await Configuration.newInstance()
    let realPath = await Deno.realPath(".");
    let start = config.fileLocation.indexOf(realPath);
    let location = config.fileLocation.slice(start + realPath.length);
    let conf = (await import(`..${location}`)).default;
    return conf[key]
  }

  async remove(): Promise<void> {
    await Deno.remove(this.fileLocation);
  }
}
export default Configuration;
