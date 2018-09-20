// let PouchDB = require("pouchdb");
import * as PouchDB from "pouchdb";
import * as InMemoryPlugin from "pouchdb-adapter-memory";
import * as Find from "pouchdb-find";

let pouchDb: any = PouchDB;
pouchDb = pouchDb.default || pouchDb;
let inMemoryPlugin: any = InMemoryPlugin;
inMemoryPlugin = inMemoryPlugin.default || inMemoryPlugin;
let find: any = Find;
find = find.default || find;

PouchDB.plugin(inMemoryPlugin);
PouchDB.plugin(find);

export const createDb = (name: string, options: any) => {
  return new pouchDb(name, options);
};

export default createDb;
