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

We support 2 formats to store:

- flat json object: `{key1: value1, key2: value2,...}`
- tokenscript file (WIP)

We don't support any nested objects in `value`. `value` can be only `number`, `string` or `boolean`.

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
store.get(); // -> {employees: 4, open: true}

// inseret or update the whole kv pairs
// again, you cannot store a nested value.
store.set({ employees: 3, open: true });
store.get(); // -> {employees: 3, open: true}
store.set({ top: 10 });
store.get(); // -> {top: 10} overwrite

// delete a single kv pair
store.set({ employees: 3, open: true });
store.key("employees").del(); // -> {open: true}

// delete the whole kv pairs
store.set({ employees: 3, open: true });
store.del(); // -> {} empty

// get single value
store.set({ employees: 3, open: true });
store.key("employees").get(); // -> 3

// get whole kv pairs
store.get(); // -> {employees: 3, open: true}

// get all keys
store.getKeys(); // -> ["employees", "open"]

// get all values
store.getValues(); // -> [3, true]

// query kv pairs
store.set({ score1: 10, score2: 20, score3: 30 });
store.query((key, value) => {
  return key.startsWith("score") && value > 15;
}); // -> {score2: 20, score3: 30}
```

### Transactions

Basic usages:

```ts
// Multiple changes in a transaction
store.transaction((_) => {
  store.set({ employees: 3, open: true });
  store.key("score").set(10);
});
```

If no errors, the transaction will be committed.

Or if you want to do a rollback, you can throw an error or just call `tr.rollback()`:

```ts
store.transaction((tr) => {
  store.set({ employees: 3, open: true });
  store.key("score").set(10);

  // transaction will be rolled back
  tr.rollback();
  // or
  // throw new Error("rollback");
  // but you have to handle this exception with try - catch block outside the transaction
});
```

### Schemas

We support define schema with `Zod`:

```sh
# add zod to your project
npm i zod
```

```ts
import { z } from "zod";
// kv object schema
store.setSchema(
  z.object({
    employees: z.number(),
    open: z.boolean().optional().default(false),
  }),
);
store.set({ employees: 3, open: "pets.com" }); // -> invalid

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
```

### hooks

```ts
store.set({{ employees: 3, open: true }});

const listenerId = store.addListener(() =>
  console.log("Store changed!"),
);

store.key("employees").set(4);
// -> 'Tables changed!'

store.key("open").set(true);
// Since the data didn't actually change, the listener was not called.

// clean up listener
store.delListener(listenerId);
// Listener has been unregistered and so is not called.
```

### migrations

Migrations are a way to update data from one version to another. You can define a migration function that will be called when data schema changes

```ts
// migration only triggers when the schema changes (zod schema validation failed)
// so only presist data need this function
// you have to define schemas first

store.setSchema(
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
