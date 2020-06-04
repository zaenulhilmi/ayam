import { Client } from "https://deno.land/x/mysql/mod.ts";

let client: Client;
class MySql {
  async getInstance(): Promise<Client> {
    if (client) {
      return client;
    } else {
      let dir = await Deno.cwd();
      let config = await import(`${dir}/migration.config.ts`);
      let mysqlConfig = config.default;
      let port = mysqlConfig.port ? Number(mysqlConfig.port) : 3306;
      client = await new Client().connect({
        hostname: mysqlConfig.hostname,
        username: mysqlConfig.username,
        db: mysqlConfig.db,
        password: mysqlConfig.password,
        port: port,
      });
      return client;
    }
  }
}

let mySql = new MySql();
export default mySql;
