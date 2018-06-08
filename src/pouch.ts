import * as _ from "lodash";
import * as PouchDB from "pouchdb";
import * as Find from "pouchdb-find";


export class Model<T extends Model<T>> {
    public static db: PouchDB.Database;
    public static __typename: string;


    static async findAll<T extends Model<T>>(
        this: new () => T,
        request: PouchDB.Find.FindRequest<T>
    ): Promise<Array<T>> {
        let self: typeof Model = this as any;
        try {
            const db: PouchDB.Database<T> = <PouchDB.Database<T>>self.db;
            request.selector = {
                ...request.selector,
                "typename__": self.__typename
            };

            return db.find(request).then((res: any) => {
                return Promise.resolve(res.docs);
            });

        } catch (reason) {
            return Promise.reject(reason);
        }
    }

    static async insertOne<T extends Model<T>>(
        this: new () => T,
        document: PouchDB.Core.PostDocument<T & Model<T>>
    ): Promise<PouchDB.Core.Response> {
        let self: typeof Model = this as any;
        try {
            const db: PouchDB.Database<T> = <PouchDB.Database<T>>self.db;
            return db.createIndex({
                index: {
                    fields: ["typename__"]
                }
            }).then(() => {
                let doc: any = document;
                doc.typename__ = self.__typename;
                return db.post(doc);
            });

        } catch (reason) {
            return Promise.reject(reason);
        }

    }

    static async insertMany<T extends Model<T>>(
        this: new () => T,
        documents: Array<PouchDB.Core.PutDocument<T & Model<T>>>
    ): Promise<any> {
        let self: typeof Model = this as any;
        try {
            const db: PouchDB.Database<T> = <PouchDB.Database<T>>self.db;
            return db.createIndex({
                index: {
                    fields: ["typename__"]
                }
            }).then(() => {
                _.map(documents, (doc: any) => {
                    doc.typename = self.__typename;
                })
                return db.bulkDocs(documents);
            });

        } catch (reason) {
            return Promise.reject(reason);
        }
    }


    static async updateOne<T extends Model<T>>(
        this: new () => T,
        document: PouchDB.Core.PostDocument<T & Model<T>>
    ): Promise<PouchDB.Core.Response> {
        let self: typeof Model = this as any;
        try {
            const db: PouchDB.Database<T> = <PouchDB.Database<T>>self.db;
            return db.createIndex({
                index: {
                    fields: ["typename__"]
                }
            }).then(() => {
                let doc: any = document;
                doc.typename = self.__typename;
                return db.put(doc);
            });

        } catch (reason) {
            return Promise.reject(reason);
        }

    }

    static async deleteOne<T extends Model<T>>(
        this: new () => T,
        id: string
    ) {
        let self: typeof Model = this as any;
        try {
            const db: PouchDB.Database<T> = <PouchDB.Database<T>>self.db;
            return db.get(id).then((doc: any) => {
                doc._deleted = true;
                return db.put(doc);
            });

        } catch (reason) {
            return Promise.reject(reason);
        }
    }


    static change<T extends Model<T>>(
        this: new () => T,
        options: PouchDB.Core.ChangesOptions | null,
        callback: any
    ) {
        let self: typeof Model = this as any;

        const db: PouchDB.Database<T> = <PouchDB.Database<T>>self.db;
        return db.changes(options, (res) => {
            callback(res);
        });

    }
}


export class Container {
    private db: PouchDB.Database;
    public info: PouchDB.Core.DatabaseInfo;

    /**
     *
     */
    constructor(name: string, options?: PouchDB.Configuration.DatabaseConfiguration) {
        PouchDB.plugin(Find);
        this.db = new PouchDB(name, options);

    }

    public async addModels(models: Array<typeof Model>): Promise<any> {
        this.info = await this.db.info();
        return Promise.all(
            _.map(models, (model: any) => {
                model.db = this.db;
                return Promise.resolve();
            })
        );
    }

    public async close() {
        return this.db.close();
    }

}

export const TypeName = (typeName: string) => {
    return (target: typeof Model) => {
        target.__typename = typeName;
    }
}