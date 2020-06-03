import MigrationRepositoryInterface from "../interfaces/migration_repository_interface.ts";
import postgres from "./../driver/postgres.ts";

class PostgresMigrationRepository implements MigrationRepositoryInterface {
  tableName: string = "migrations";
  query: string = "";

  create(): MigrationRepositoryInterface {
    this.query =
      `create table ${this.tableName} (id bigserial primary key, file_name varchar(255) not null, step int not null, created_at timestamp default current_timestamp, updated_at timestamp default current_timestamp);`;
    return this;
  }

  insert(fileName: string, step: number): MigrationRepositoryInterface {
    this.query =
      `insert into ${this.tableName} (file_name, step) values ('${fileName}', '${step}');`;
    return this;
  }

  lastMigration(): MigrationRepositoryInterface {
    this.query = `select * from migrations order by id desc limit 1;`;
    return this;
  }

  lastStepMigrations(): MigrationRepositoryInterface {
    this.query =
      `select * from migrations where step = (select max(step) from migrations);`;
    return this;
  }

  removeAllLastStep(): MigrationRepositoryInterface {
    this.query =
      `delete from migrations where step in (select max(step) from migrations);`;
    return this;
  }

  async execute(): Promise<void> {
    await postgres.query(this.query);
  }

  async get(): Promise<any> {
    let result = await postgres.query(this.query);
    return result;
  }

  toSql(): string {
    return this.query;
  }
}

export default PostgresMigrationRepository;
