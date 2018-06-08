/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
/// <reference types="pouchdb-adapter-idb" />
/// <reference types="pouchdb-adapter-websql" />
/// <reference types="pouchdb-node" />
export declare class Model<T extends Model<T>> {
    static db: PouchDB.Database;
    static __typename: string;
    static findAll<T extends Model<T>>(this: new () => T, request: PouchDB.Find.FindRequest<T>): Promise<Array<T>>;
    static insertOne<T extends Model<T>>(this: new () => T, document: PouchDB.Core.PostDocument<T & Model<T>>): Promise<PouchDB.Core.Response>;
    static insertMany<T extends Model<T>>(this: new () => T, documents: Array<PouchDB.Core.PutDocument<T & Model<T>>>): Promise<any>;
    static updateOne<T extends Model<T>>(this: new () => T, document: PouchDB.Core.PostDocument<T & Model<T>>): Promise<PouchDB.Core.Response>;
    static deleteOne<T extends Model<T>>(this: new () => T, id: string): Promise<PouchDB.Core.Response>;
    static change<T extends Model<T>>(this: new () => T, options: PouchDB.Core.ChangesOptions | null, callback: any): void;
}
export declare class Container {
    private db;
    info: PouchDB.Core.DatabaseInfo;
    /**
     *
     */
    constructor(name: string, options?: PouchDB.Configuration.DatabaseConfiguration);
    addModels(models: Array<typeof Model>): Promise<any>;
    close(): Promise<void>;
}
export declare const TypeName: (typeName: string) => (target: typeof Model) => void;
