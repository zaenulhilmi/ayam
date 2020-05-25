abstract class ConfigurationAbstract {
  abstract saveFile(): Promise<void>;
  abstract addConfig(): Promise<void>;
  abstract remove(): Promise<void>;

  async exist(): Promise<boolean> {
    try {
      await Deno.stat("./migration.config.ts");
    } catch (e) {
      return false;
    }
    return true;
  }

  async create(): Promise<void> {
    await this.saveFile();
    await this.addConfig();
  }
}

export default ConfigurationAbstract;
