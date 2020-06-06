## About Deno Ayam
Deno Ayam is a migration tools for MySql, Postgres, and Sqlite.

## Installation
<!--
Need to change after it got the url
-->
``` 
 deno install -n ayam --allow-read --allow-write --allow-net ./app.ts
```

## Generating Configuration
By default, Ayam will use migration.config.ts as it's default configuration file. We can generate the file using:
```
ayam generate
```
The content of the file will be the configuration of database:
```typescript
let MySQL = {
  dialect: 'mysql',
  migrationDirectory: './migrations',
  hostname: '127.0.0.1',
  username: 'root',
  db: 'my_database',
  password: 'secret',
};

let Postgres = {
  dialect: 'postgres',
  migrationDirectory: './migrations',
  hostname: '127.0.0.1',
  username: 'root',
  db: 'my_database',
  password: 'secret',
}

export default MySQL
```
## Generate Migrations
To generate migrations we can use 
``` 
ayam generate {{fileName}}
```
for example, we can use `ayam generate CreateUsersTable` to generate a file with a name like `2020_05_06_075903_create_users_table_migration.ts`.
The content of the file would be something like this.
```typescript
import Schema from './interfaces/schema_interface.ts'
import Builder from './interfaces/builder_interface.ts'

class CreateUsersTable{

  async up(schema: Schema): Promise<void> {
    schema.create('users', async (table: Builder) => {
      table.id()
      table.string('name')
      table.timestamps()
    })
  }

  async down(schema: Schema): Promise<void> {
    schema.drop('users')
  }
}

export default CreateUsersTable;
```

## Running Migration
To run all the file that need to be migrate. We can use:
``` 
ayam migrate
```
To undo or rollback the migration, we can use:
``` 
ayam rollback
```

## Tables
<!-- todo add something about creating table, renaming, drop, etc, -->

## Columns
<!-- todo add all available columns -->

