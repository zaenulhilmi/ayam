import Denomander from "https://deno.land/x/denomander@0.6.1/mod.ts";
import { snakeCase, pascalCase } from "https://deno.land/x/case@v2.0.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const Case = { snakeCase, pascalCase };

export { Denomander, Case, config };
