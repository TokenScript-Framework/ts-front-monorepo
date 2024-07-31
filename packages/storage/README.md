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

## Usage

import package:

```ts
// esm
import Storage from "storage";

// or cjs
const Storage = require("storage");
```

create a storage instance:

```ts
// create a storage instance with random id
const storage = new Storage();
console.log(storage.id);

// create a storage instance with specified id
const storage = new Storage("my-id");
console.log(storage.id);
```

Storage is isolated by id. If you want to share data between storages, you can use the same id.

create a store instance with different persistence destinations:

```ts
// create a memory store
const store = storage.createStore();

// create a local storage store
const store = storage.createStore({
  persister: "localStorage",
  autoSave: true,
});
```

supported persisters:

- memory (default)
- localStorage
- sessionStorage
- indexedDB

> [!NOTE]
>
> Please note that all data is in memory and will not be persisted unless called `store.save()`. You can set the `{autoSave: true}` option to automatically call the `store.save()` method to persist data when it changes.

### basic CRUD

```ts
// insert kv
store.setValues({ employees: 3, open: true });
// insert table
store.setTables({ pets: { fido: { species: "dog" } } });

// read kv
console.log(store.getValues());
// -> {employees: 3, open: true}
// read table
console.log(store.getTables());
// -> {pets: {fido: {species: 'dog'}}}

// update kv
store.setValue("employees", 4);
console.log(store.getValues());
// -> {employees: 4, open: true}

// update table
store.setTable("species", { dog: { price: 5 } });
console.log(store.getTables());
// -> {pets: {fido: {species: 'dog'}}, species: {dog: {price: 5}}}

store.setRow("species", "cat", { price: 4 });
console.log(store.getTables());
// -> {pets: {fido: {species: 'dog'}}, species: {dog: {price: 5}, cat: {price: 4}}}

store.setCell("pets", "fido", "color", "brown");
console.log(store.getTables());
// -> {pets: {fido: {species: 'dog', color: 'brown'}}, species: {dog: {price: 5}, cat: {price: 4}}}

// delete kv
store.delValue("employees");
console.log(store.getValues());
// -> {open: true}

// delete table
store.delTable("species");
console.log(store.getTables());
// -> {pets: {fido: {species: 'dog', color: 'brown'}}}
store.delCell("pets", "fido", "species");
console.log(store.getTables());
// -> {}
// The `fido` Row and `pets` Table have been recursively deleted.
```

### transactions

```ts
// Multiple changes in a transaction
store.transaction(() => {
  store.setCell("pets", "fido", "color", "walnut");
  store.setCell("pets", "fido", "sold", true);
});
```

### schemas

```ts
// kv schema
store.setValuesSchema({
  employees: { type: "number" },
  open: { type: "boolean", default: false },
});
store.setValues({ employees: 3, website: "pets.com" });
console.log(store.getValues());
// -> {employees: 3, open: false}

// table schema
store.setTablesSchema({
  pets: {
    species: { type: "string" },
    sold: { type: "boolean", default: false },
  },
});
store.setRow("pets", "fido", { species: "dog", color: "brown", sold: "maybe" });
console.log(store.getTables());
// -> {pets: {fido: {species: 'dog', sold: false}}}
```

### index

```ts
const store = createStore().setTable("pets", {
  fido: { species: "dog" },
  felix: { species: "cat" },
  cujo: { species: "dog" },
});

const indexes = createIndexes(store);
indexes.setIndexDefinition(
  "bySpecies", // indexId
  "pets", //      tableId to index
  "species", //    cellId to index on
);

console.log(indexes.getSliceIds("bySpecies"));
// -> ['dog', 'cat']
console.log(indexes.getSliceRowIds("bySpecies", "dog"));
// -> ['fido', 'cujo']
```

### metrics / aggregation

```ts
const store = createStore().setTable("species", {
  dog: { price: 5 },
  cat: { price: 4 },
  worm: { price: 1 },
});

const metrics = createMetrics(store);
metrics.setMetricDefinition(
  "highestPrice", // metricId
  "species", //      tableId to aggregate
  "max", //          aggregation
  "price", //        cellId to aggregate
);

console.log(metrics.getMetric("highestPrice"));
// -> 5
```

### hooks

```ts
const store = createStore().setTables({
  pets: { fido: { species: "dog" } },
  species: { dog: { price: 5 } },
});

const listenerId = store.addTablesListener(() =>
  console.log("Tables changed!"),
);

store.setCell("species", "dog", "price", 6);
// -> 'Tables changed!'

store.setCell("pets", "fido", "species", "dog");
// Since the data didn't actually change, the listener was not called.

// clean up listener
store.delListener(listenerId);
store.setCell("species", "dog", "price", 7);
// Listener has been unregistered and so is not called.
```

### migrations

Migrations are a way to update data from one version to another. You can define a migration function that will be called when data schema changes

```ts
// migration only triggers when the schema changes
// so only presist data need this function
// you have to define schemas first

store.setValuesSchema({
  employees: { type: "number" },
  open: { type: "boolean", default: false },
});

store.migrate("v2", (oldVersion, oldData) => {
  // your migrate logic here
});
```

the function is `migrate(ver: string, fn: (oldVersion: string, oldData: any) => any)`

- `ver` is the schema version.
- `oldVersion` is the previous schema version.

When `ver` changes we will execute your migrate function. Note that we do not compare new `ver` is greater than old, we just check if it has changed.

If you never set it before. We'll set a default `v1` for it.

## Token Store (TODO)

### token script file caching (TODO)

### token data grant at the token level (TODO)
