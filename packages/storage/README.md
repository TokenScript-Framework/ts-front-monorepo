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

We don't support any embbed objects in `value`. `value` can be only `number`, `string` or `boolean`. Cannot be `object` or `array`.

- `{"a":1, "b": 2}` --> Supported
- `{"a": {"b": 1}}` --> NOT Supported

## Usage

import package:

```ts
// esm
import { MemoryStore, PersistentStore } from "storage";

// or cjs
const { MemoryStore, PersistentStore } = require("storage");
```

create a store instance:

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
store.empty(); // -> {} empty the whole store

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

If no errors, the transaction will be committed. If error is thrown, the transaction will be rolled back.

```ts
try {
  store.transaction((tr) => {
    store.set({ employees: 3, open: true });
    store.key("score").set(10);
    // we create a exception here to simulate a rollback
    throw new Error("rollback");
  });
} catch (e) {
  // transaction will be rolled back
  console.error("transaction rollback");
}
```

You can also call `tr.rollback()` to rollback the transaction:

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

const store = new MemoryStore({
  schema: z
    .object({
      employees: z.number(),
      open: z.boolean().optional().default(false),
    })
    .strict(),
});
store.set({ employees: 3, open: "pets.com" }); // -> invalid, throws exception
store.set({ employees: 3, open: true }); // -> valid
```

Also, `PersistentStore` supports schema validation.

```ts
const store = new PersistentStore("my-id", {
  persister: "localStorage",
  autoSave: true,
  schema: z.object({
    employees: z.number(),
    open: z.boolean().optional().default(false),
  }),
});
```

Schema can only be defined when creating a store instance, and cannot be changed later.

If no schema is defined (default), any data can be stored.

### Hooks

You can listen to store or key events with `on` method:

```ts
store.set({{ employees: 3, open: true }});

const listenerId = store.on("changed", () =>
  console.log("Store changed!"),
);

store.key("employees").set(4);
// -> 'Value changed!'

store.key("open").set(true);
// Since the data didn't actually change, the hook was not called.

// clean up hook
store.off(listenerId);
// Hook has been unregistered and so is not called.

// listen to key events
const keyListenerId = store.key("employees").on("changed", (oldValue, newValue) =>
  console.log("Key changed!", oldValue, newValue),
);

store.key("employees").set(4);
// -> 'Key changed!'
store.off(keyListenerId);
```

Currently, we support the following events:

- `changed`: when a key's value changes. NOTE: `removed` event will also trigger this event
- `removed`: when a key is removed
- `added`: when a key is added. NOTE: this is only working on key hooks, store hooks does not have this event

### Migrations (TODO)

Migrations are a way to update data from one version to another. You can define a migration function that will be called when data schema changes

```ts
// migration only triggers when the schema changes (zod schema validation failed)
// so only presist data need this function
// you have to define schemas first
```

## Security

For `MemoryStore`, data is isolated by instance. So different instances do not share data.

```ts
const store1 = new MemoryStore();
const store2 = new MemoryStore();

store1.set({ employees: 3, open: true });
store2.get(); // -> {}
```

But for `PersistentStore`, the situation is slightly different. You can think it's working like `Redis`. The same id with same persister will use the same persistent store underground. But after data is loaded from the persister, it works like `MemoryStore`.

```ts
const store1 = new PersistentStore("id1", { persister: "localStorage" });
const store2 = new PersistentStore("id2", {
  persister: "localStorage",
  autoSave: true,
});

store1.set({ employees: 3, open: true });
store1.save();
store2.get(); // -> {}

// NOTE this. We create this instance after store1 is saved.
const store3 = new PersistentStore("id1", { autoSave: true });
store3.get(); // -> { employees: 3, open: true }
```

As you can see, `store3` is load the `store1`'s persistent data because they have the same id and persister. But after the instance is created, they do not share data anymore, and `store.save()` will override the persister data. So be careful with the id and persister for multiple `PersistentStore` instances.

And we will support CRDT for data sharing in the future. (TODO)
