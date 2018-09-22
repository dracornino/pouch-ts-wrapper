import * as _ from "lodash";
import * as PouchDB from "pouchdb";
import { createDb } from "./wrapper";

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
        typename__: self.__typename
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
      return db
        .createIndex({
          index: {
            fields: ["typename__"]
          }
        })
        .then(() => {
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
      return db
        .createIndex({
          index: {
            fields: ["typename__"]
          }
        })
        .then(() => {
          _.map(documents, (doc: any) => {
            doc.typename__ = self.__typename;
          });
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
      return db
        .createIndex({
          index: {
            fields: ["typename__"]
          }
        })
        .then(() => {
          let doc: any = document;
          doc.typename__ = self.__typename;
          return db.put(doc);
        });
    } catch (reason) {
      return Promise.reject(reason);
    }
  }

  static async deleteOne<T extends Model<T>>(this: new () => T, id: string) {
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

  static async deleteAll<T extends Model<T>>(this: new () => T) {
    let self: typeof Model = this as any;
    try {
      const db: PouchDB.Database<T> = <PouchDB.Database<T>>self.db;
      const info = await db.info();
      const result = await db.find({
        selector: { _id: { $gt: null } },
        limit: info.doc_count
      });
      const docsToDelete = _.map(result.docs, (doc: any) => {
        doc._deleted = true;
        return doc;
      });
      return db.bulkDocs(docsToDelete);
    } catch (reason) {
      return Promise.reject(reason);
    }
  }

  static change<T extends Model<T>>(
    this: new () => T,
    options: PouchDB.Core.ChangesOptions | null
  ) {
    let self: typeof Model = this as any;

    const db: PouchDB.Database<T> = <PouchDB.Database<T>>self.db;
    const opt = {
      ...options,
      filter: `${self.__typename}/${self.__typename}`
    };

    return db.changes(opt);
  }
}

export class Container {
  private db: PouchDB.Database;
  public info: PouchDB.Core.DatabaseInfo;
  public dbName: string;
  public dbOptions: PouchDB.Configuration.DatabaseConfiguration;
  private models: Array<typeof Model>;
  /**
   *
   */
  constructor(
    name: string,
    options?: PouchDB.Configuration.DatabaseConfiguration
  ) {
    console.log(`PouchDb Version ${PouchDB.version}`);
    this.dbName = name;
    this.dbOptions = options;
    this.db = createDb(name, options);
  }

  public async safePurge(): Promise<any> {
    try {
      const result = await this.db.find({
        selector: { _id: { $gt: null } },
        limit: 1
      });
      if (result.docs.length === 0) {
        await this.db.destroy();
        this.db = createDb(this.dbName, this.dbOptions);
        await this.addModelsHandler();
      } else {
        return Promise.resolve({
          ok: false
        });
      }
    } catch (error) {
      return Promise.reject(error);
    }

    return Promise.resolve({
      ok: true
    });
  }

  public change(options: PouchDB.Core.ChangesOptions | null) {
    const db: PouchDB.Database = this.db;
    return db.changes(options);
  }

  private async addModelsHandler(): Promise<any> {
    this.info = await this.db.info();
    return Promise.all(
      _.map(this.models, (model: any) => {
        model.db = this.db;
        const filter: any = {
          _id: `_design/${model.__typename}`,
          filters: {}
        };
        filter.filters[
          model.__typename
        ] = `function (doc) { return doc.typename__ === '${
          model.__typename
        }' || doc._id === '${`_design/${model.__typename}`}' }`;
        return this.db.get(`_design/${model.__typename}`).catch(() => {
          return this.db.put(filter);
        });
      })
    );
  }

  public async addModels(models: Array<typeof Model>): Promise<any> {
    this.models = models;
    return this.addModelsHandler();
  }

  public async close() {
    return this.db.close();
  }
}

export const TypeName = (typeName: string) => {
  return (target: typeof Model) => {
    target.__typename = typeName;
  };
};
