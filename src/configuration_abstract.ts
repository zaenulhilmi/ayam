abstract class ConfigurationAbstract {
  abstract saveFile(): Promise<void>;
  abstract addConfig(): Promise<void>;

  async exist(): Promise<boolean> {
    try {
      await Deno.stat("./migration.config.ts");
    } catch (e) {
      return false;
    }
    return true;
  }

  create(): void {
    this.saveFile();
    this.addConfig();
  }
}

export default ConfigurationAbstract;