import { Client } from "https://deno.land/x/postgres/mod.ts";

import { config } from "./../../deps.ts";

let client: Client;
class Postgres {
  async getInstance(): Promise<Client> {
    if (client) {
      return client;
    } else {
      let dir = await Deno.cwd();
      let fileConfig = await import(`${dir}/migration.config.ts`);
      let postgresConfig = fileConfig.default;
      let port = postgresConfig.port ? Number(postgresConfig.port) : 5432;

      let config = {
        host: postgresConfig.hostname,
        port: port,
        user: postgresConfig.username,
        database: postgresConfig.db,
        password: postgresConfig.password,
      };
      client = await new Client(config);
      await client.connect();
      return client;
    }
  }
}

let postgres = new Postgres();
// let instance = await postgres.getInstance();
export default postgres;
