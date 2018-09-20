let PouchDB = require("pouchdb");
let InMemoryPlugin = require("pouchdb-adapter-memory");
let Find = require("pouchdb-find");

PouchDB = PouchDB.default || PouchDB;
InMemoryPlugin = InMemoryPlugin.default || InMemoryPlugin;
Find = Find.default || Find;

PouchDB.plugin(InMemoryPlugin);
PouchDB.plugin(Find);

export const createDb = (name: string, options: any) => {
  return new PouchDB(name, options);
};

export default createDb;
