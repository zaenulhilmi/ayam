import ConfigurationAbstract from "./configuration_abstract.ts";
class Configuration extends ConfigurationAbstract {
  async saveFile(): Promise<void> {
    let configFile = await Deno.create("./migration.config.ts");
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
    await Deno.writeTextFile("./migration.config.ts", config);
  }

  async exist(): Promise<boolean> {
    try {
      let res = await Deno.stat("./migration.config.ts");
      return true;
    } catch (e) {
      return false;
    }
  }
}
export default Configuration;
