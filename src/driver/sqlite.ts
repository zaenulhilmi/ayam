import { DB } from "https://deno.land/x/sqlite/mod.ts";

let client: DB;

class Sqlite {
  async getInstance(): Promise<DB> {
    if (client) {
      return client;
    } else {
      let dir = await Deno.cwd();
      let fileConfig = await import(`${dir}/migration.config.ts`);
      let sqliteConfig = fileConfig.default;
      let databaseFile = sqliteConfig.file_path;
      client = new DB(databaseFile);
      return client;
    }
  }
}

let sqlite = new Sqlite();
export default sqlite;
