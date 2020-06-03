import { Client } from "https://deno.land/x/mysql/mod.ts";
import { config } from "./../../deps.ts";

let { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } =
  config();

let client: Client;
class MySql {
  async getInstance(): Promise<Client> {
    // let dir = await Deno.cwd()
    // let x = await import(`${dir}/migration.config.ts`);
    // console.log(x)
    if (client) {
      return client;
    } else {
      client = await new Client().connect({
        hostname: DATABASE_HOST,
        username: DATABASE_USER,
        db: DATABASE_NAME,
        password: DATABASE_PASSWORD,
      });
      return client;
    }
  }
}

let mySql = new MySql();
let instance = await mySql.getInstance();
export default instance;
