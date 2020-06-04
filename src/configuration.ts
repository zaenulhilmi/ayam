import ConfigurationAbstract from "./configuration_abstract.ts";

class Configuration extends ConfigurationAbstract {
  fileLocation: string = "";

  private constructor() {
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
    let configFile = await Deno.create(this.fileLocation);
    configFile.close();
  }

  async addConfig(): Promise<void> {
    try {
      let filePath =
        new URL("templates/config_file.stub", import.meta.url).pathname;
      let config = await Deno.readTextFile(filePath);
      await Deno.writeTextFile(this.fileLocation, config);
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  }

  async exist(): Promise<boolean> {
    try {
      let res = await Deno.stat(this.fileLocation);
      return res.isFile;
    } catch (e) {
      return false;
    }
  }

  async get(key: string): Promise<string> {
    let conf = (await import(this.fileLocation)).default;
    return conf[key];
  }

  async remove(): Promise<void> {
    await Deno.remove(this.fileLocation);
  }
}
export default Configuration;
