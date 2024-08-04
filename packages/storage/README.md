# Token storage

Provides data storage functions for Smart Tokens.

## Features

- custom schema and index
- CRUD and transaction
- multiple persistence destinations:
  - memory
  - local storage
  - session
  - indexed db
- token data auto refreshing
- no cross-token data sharing by default.
- hooks
- migration that can be customised through programming
- token script file caching
- token data grant at the token level
- CRDT
- queuing

## Installation

```sh
npm i storage
```

## Store Format

We support 3 formats to store:

- kv: `{key: value}`
- table: `{table: {row: cellValue}}`
- tokenscript file (WIP)

you can think `kv` is a plat json object, without any nested objects in `value`. `value` can be only `number`, `string` or `boolean`.

And you can think of a `table` as a json object with three levels of nesting: `table - row - cell`. Cell value can be only `number`, `string` or `boolean`.

We will introduce how to access these two types of data in the following content.

## Usage

import package:

```ts
// esm
import { MemoryStore, PersistentStore } from "storage";

// or cjs
const { MemoryStore, PersistentStore } = require("storage");
```

create a storage instance:

```ts
// create a memory store
const store = new MemoryStore();

// create a persistent store
const store = new PersistentStore("my-id", {
  persister: "localStorage",
  autoSave: true,
});
```

Persistent store is isolated by id. PersistentStores with different ids cannot get each other's data.

We support the following persisters

- localStorage
- sessionStorage
- indexedDB

You can set `{persister: <persister>}` in `PersistentStore` options to change it.

> [!NOTE]
>
> Note that all data is stored in memory, even the `PersistentStore`, and `PersistentStore` will not be persisted unless called `store.save()`. You can set the `{autoSave: true}` option to automatically call the `store.save()` method to persist data when it changes.

### Basic CRUD

kv usages:

```ts
// insert or update single kv
store.key("employees").set(3);
store.key("employees").set(4); // overwrite
store.key("open").set(true); // append a new kv
store.getValues(); // -> {employees: 4, open: true}

// inseret or update the whole kv pairs
store.setValues({ employees: 3, open: true });
store.getValues(); // -> {employees: 3, open: true}
store.setValues({ top: 10 });
store.getValues(); // -> {top: 10} overwrite

// delete a single kv pair
store.setValues({ employees: 3, open: true });
store.key("employees").del(); // -> {open: true}

// delete the whole kv pairs
store.setValues({ employees: 3, open: true });
store.delValues(); // -> {} empty

// get single value
store.setValues({ employees: 3, open: true });
store.key("employees").get(); // -> 3

// get whole kv pairs
store.getValues(); // -> {employees: 3, open: true}

// query kv pairs
store.setValues({ score1: 10, score2: 20, score3: 30 });
store.valuesQuery((key, value) => {
  return key.startsWith("score") && value > 15;
}); // -> {score2: 20, score3: 30}
```

table usages:

```ts
// insert or update single table
store.table("species").set({ dog: { price: 5 } });
console.log(store.getTables());
// -> {pets: {fido: {species: 'dog'}}, species: {dog: {price: 5}}}
store.table("species").set({ cat: { price: 4 } }); // overwrite

// similarly, you can set multiple tables:
store.setTables({
  pets: {
    fido: { species: "dog", color: "brown" },
    felix: { species: "cat" },
  },
  species: {
    dog: { price: 5 },
    cat: { price: 4 },
  },
});
store.getTables();

// also you can set a single row by:
store.table("species").row("dog").set({ price: 6, paid: true });

// similarly, you can set a single cell by:
store.table("species").row("dog").cell("price").set(7);

// get table values
store.setTables({
  pets: {
    fido: { species: "dog", color: "brown" },
    felix: { species: "cat" },
  },
  species: {
    dog: { price: 5 },
    cat: { price: 4 },
  },
});
store.getTables(); // get all tables. -> {pets: {fido: {species: 'dog', color: 'brown'}, felix: {species: 'cat'}}, species: {dog: {price: 5}, cat: {price: 4}}}
store.table("species").get(); // get a table. -> {dog: {price: 5}, cat: {price: 4}}
store.table("species").row("dog").get(); // get a row. -> {species: 'dog', color: 'brown'}
store.table("species").row("dog").cell("price").get(); // get a cell. -> 5
```

> For more complex table queries, see the [Table Queries](#table-queries) section. (WIP)

### Table Relationships (TODO)

### Transactions

Basic usages:

```ts
// Multiple changes in a transaction
store.transaction(() => {
  store.table("pets").row("fido").cell("color").set("walnut");
  store.table("pets").row("fido").cell("sold").set(true);
});
```

If no errors, the transaction will be committed.

Or if you want to do a rollback, you can throw an error or just return `false`:

```ts
store.transaction(() => {
  store.table("pets").row("fido").cell("color").set("walnut");
  store.table("pets").row("fido").cell("sold").set(true);

  // transaction will be rolled back
  return false;
  // or
  // throw new Error("rollback");
  // but you have to handle this exception
});
```

### Schemas

We support define schema with `Zod`:

```ts
import { z } from "zod";
// kv pairs schema
store.setValuesSchema(
  z.object({
    employees: z.number(),
    open: z.boolean().optional().default(false),
  }),
);
store.setValues({ employees: 3, website: "pets.com" }); // -> invalid

// also, you can set a single kv schema:
store.key("employees").setSchema(z.number());

// tables schema
store.setTablesSchema(
  z.object({
    pets: z.object({
      species: z.string(),
      sold: z.boolean().optional().default(false),
    }),
  }),
);

// also, you can set schema to single table, row, or cell:
store.table("pets").setSchema(
  z.object({
    species: z.string(),
    sold: z.boolean().optional().default(false),
  }),
); // -> single table schema

store
  .table("pets")
  .row("fido")
  .setSchema(z.object({ species: z.string() })); // -> single row schema

store.table("pets").row("fido").cell("sold").setSchema(z.boolean()); // -> single cell schema
```

### index (TODO)

### aggregation (TODO)

### hooks

```ts
const store = createStore().setTables({
  pets: { fido: { species: "dog" } },
  species: { dog: { price: 5 } },
});

const listenerId = store.addTablesListener(() =>
  console.log("Tables changed!"),
);

store.table("species").row("dog").cell("price").set(6);
// -> 'Tables changed!'

store.table("pets").row("fido").cell("species").set("dog");
// Since the data didn't actually change, the listener was not called.

// clean up listener
store.delListener(listenerId);
// Listener has been unregistered and so is not called.
```

### migrations

Migrations are a way to update data from one version to another. You can define a migration function that will be called when data schema changes

```ts
// migration only triggers when the schema changes
// so only presist data need this function
// you have to define schemas first

store.setValuesSchema(
  z.object({
    employees: z.number(),
    open: z.boolean().optional().default(false),
  }),
);

store.migrate("v2", (oldVersion, oldData) => {
  // your migrate logic here
});
```

the function is `migrate(ver: string, fn: (oldVersion: string, oldData: any) => any)`

- `ver` is the schema version.
- `oldVersion` is the previous schema version.

When `ver` changes we will execute your migrate function. Note that we do not compare new `ver` is greater than old, we just check if it has changed.

If you never set it before. We'll set a default `v1` for it.
