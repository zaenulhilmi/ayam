import { Client } from "https://deno.land/x/postgres/mod.ts";

import { config } from "./../../deps.ts";

let { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } =
  config();

let client: Client;
class Postgres {
  async getInstance(): Promise<Client> {
    if (client) {
      return client;
    } else {
       let config = {
        host: DATABASE_HOST,
        port: Number(DATABASE_PORT),
        user: DATABASE_USER,
        database: DATABASE_NAME,
        password: DATABASE_PASSWORD,
        applicationName: "my_custom_app"
      };
      client = await new Client(config);
      await client.connect()
      return client;
    }
  }
}

let postgres = new Postgres();
let instance = await postgres.getInstance();
export default instance;
