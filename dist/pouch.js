"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const PouchDB = require("pouchdb");
const InMemoryPlugin = require("pouchdb-adapter-memory");
const Find = require("pouchdb-find");
class Model {
    static findAll(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                const db = self.db;
                request.selector = Object.assign({}, request.selector, { typename__: self.__typename });
                return db.find(request).then((res) => {
                    return Promise.resolve(res.docs);
                });
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
    static insertOne(document) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                const db = self.db;
                return db
                    .createIndex({
                    index: {
                        fields: ["typename__"]
                    }
                })
                    .then(() => {
                    let doc = document;
                    doc.typename__ = self.__typename;
                    return db.post(doc);
                });
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
    static insertMany(documents) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                const db = self.db;
                return db
                    .createIndex({
                    index: {
                        fields: ["typename__"]
                    }
                })
                    .then(() => {
                    _.map(documents, (doc) => {
                        doc.typename__ = self.__typename;
                    });
                    return db.bulkDocs(documents);
                });
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
    static updateOne(document) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                const db = self.db;
                return db
                    .createIndex({
                    index: {
                        fields: ["typename__"]
                    }
                })
                    .then(() => {
                    let doc = document;
                    doc.typename__ = self.__typename;
                    return db.put(doc);
                });
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
    static deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                const db = self.db;
                return db.get(id).then((doc) => {
                    doc._deleted = true;
                    return db.put(doc);
                });
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        });
    }
    static change(options) {
        let self = this;
        const db = self.db;
        const opt = Object.assign({}, options, { filter: `${self.__typename}/${self.__typename}` });
        return db.changes(opt);
    }
}
exports.Model = Model;
class Container {
    /**
     *
     */
    constructor(name, options) {
        PouchDB.plugin(Find);
        PouchDB.plugin(InMemoryPlugin);
        this.db = new PouchDB(name, options);
    }
    addModels(models) {
        return __awaiter(this, void 0, void 0, function* () {
            this.info = yield this.db.info();
            return Promise.all(_.map(models, (model) => {
                model.db = this.db;
                const filter = {
                    _id: `_design/${model.__typename}`,
                    filters: {}
                };
                filter.filters[model.__typename] = `function (doc) { return doc.typename__ === '${model.__typename}' || doc._id === '${`_design/${model.__typename}`}' }`;
                return this.db.get(`_design/${model.__typename}`).catch(() => {
                    return this.db.put(filter);
                });
            }));
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.close();
        });
    }
}
exports.Container = Container;
exports.TypeName = (typeName) => {
    return (target) => {
        target.__typename = typeName;
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG91Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcG91Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDRCQUE0QjtBQUM1QixtQ0FBbUM7QUFDbkMseURBQXlEO0FBQ3pELHFDQUFxQztBQUVyQztJQUlFLE1BQU0sQ0FBTyxPQUFPLENBRWxCLE9BQW9DOztZQUVwQyxJQUFJLElBQUksR0FBaUIsSUFBVyxDQUFDO1lBQ3JDLElBQUk7Z0JBQ0YsTUFBTSxFQUFFLEdBQTZDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzdELE9BQU8sQ0FBQyxRQUFRLHFCQUNYLE9BQU8sQ0FBQyxRQUFRLElBQ25CLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxHQUM1QixDQUFDO2dCQUVGLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtvQkFDeEMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUFDLE9BQU8sTUFBTSxFQUFFO2dCQUNmLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMvQjtRQUNILENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBTyxTQUFTLENBRXBCLFFBQWlEOztZQUVqRCxJQUFJLElBQUksR0FBaUIsSUFBVyxDQUFDO1lBQ3JDLElBQUk7Z0JBQ0YsTUFBTSxFQUFFLEdBQTZDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzdELE9BQU8sRUFBRTtxQkFDTixXQUFXLENBQUM7b0JBQ1gsS0FBSyxFQUFFO3dCQUNMLE1BQU0sRUFBRSxDQUFDLFlBQVksQ0FBQztxQkFDdkI7aUJBQ0YsQ0FBQztxQkFDRCxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUNULElBQUksR0FBRyxHQUFRLFFBQVEsQ0FBQztvQkFDeEIsR0FB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LENBQUM7UUFDSixDQUFDO0tBQUE7SUFFWSxLQUFLOztZQUNoQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0NBQ0Y7QUF4Q0QsOEJBd0NDO0FBRVksUUFBQSxRQUFRLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUU7SUFDM0MsT0FBTyxDQUFDLE1BQW9CLEVBQUUsRUFBRTtRQUM5QixNQUFNLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0ICogYXMgUG91Y2hEQiBmcm9tIFwicG91Y2hkYlwiO1xyXG5pbXBvcnQgKiBhcyBJbk1lbW9yeVBsdWdpbiBmcm9tIFwicG91Y2hkYi1hZGFwdGVyLW1lbW9yeVwiO1xyXG5pbXBvcnQgKiBhcyBGaW5kIGZyb20gXCJwb3VjaGRiLWZpbmRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNb2RlbDxUIGV4dGVuZHMgTW9kZWw8VD4+IHtcclxuICBwdWJsaWMgc3RhdGljIGRiOiBQb3VjaERCLkRhdGFiYXNlO1xyXG4gIHB1YmxpYyBzdGF0aWMgX190eXBlbmFtZTogc3RyaW5nO1xyXG5cclxuICBzdGF0aWMgYXN5bmMgZmluZEFsbDxUIGV4dGVuZHMgTW9kZWw8VD4+KFxyXG4gICAgdGhpczogbmV3ICgpID0+IFQsXHJcbiAgICByZXF1ZXN0OiBQb3VjaERCLkZpbmQuRmluZFJlcXVlc3Q8VD5cclxuICApOiBQcm9taXNlPEFycmF5PFQ+PiB7XHJcbiAgICBsZXQgc2VsZjogdHlwZW9mIE1vZGVsID0gdGhpcyBhcyBhbnk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICAgIHJlcXVlc3Quc2VsZWN0b3IgPSB7XHJcbiAgICAgICAgLi4ucmVxdWVzdC5zZWxlY3RvcixcclxuICAgICAgICB0eXBlbmFtZV9fOiBzZWxmLl9fdHlwZW5hbWVcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJldHVybiBkYi5maW5kKHJlcXVlc3QpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMuZG9jcyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAocmVhc29uKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIGluc2VydE9uZTxUIGV4dGVuZHMgTW9kZWw8VD4+KFxyXG4gICAgdGhpczogbmV3ICgpID0+IFQsXHJcbiAgICBkb2N1bWVudDogUG91Y2hEQi5Db3JlLlBvc3REb2N1bWVudDxUICYgTW9kZWw8VD4+XHJcbiAgKTogUHJvbWlzZTxQb3VjaERCLkNvcmUuUmVzcG9uc2U+IHtcclxuICAgIGxldCBzZWxmOiB0eXBlb2YgTW9kZWwgPSB0aGlzIGFzIGFueTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlPFQ+ID0gPFBvdWNoREIuRGF0YWJhc2U8VD4+c2VsZi5kYjtcclxuICAgICAgcmV0dXJuIGRiXHJcbiAgICAgICAgLmNyZWF0ZUluZGV4KHtcclxuICAgICAgICAgIGluZGV4OiB7XHJcbiAgICAgICAgICAgIGZpZWxkczogW1widHlwZW5hbWVfX1wiXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgbGV0IGRvYzogYW55ID0gZG9jdW1lbnQ7XHJcbiAgICAgICAgICBkb2MudHlwZW5hbWVfXyA9IHNlbGYuX190eXBlbmFtZTtcclxuICAgICAgICAgIHJldHVybiBkYi5wb3N0KGRvYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChyZWFzb24pIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgaW5zZXJ0TWFueTxUIGV4dGVuZHMgTW9kZWw8VD4+KFxyXG4gICAgdGhpczogbmV3ICgpID0+IFQsXHJcbiAgICBkb2N1bWVudHM6IEFycmF5PFBvdWNoREIuQ29yZS5QdXREb2N1bWVudDxUICYgTW9kZWw8VD4+PlxyXG4gICk6IFByb21pc2U8YW55PiB7XHJcbiAgICBsZXQgc2VsZjogdHlwZW9mIE1vZGVsID0gdGhpcyBhcyBhbnk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICAgIHJldHVybiBkYlxyXG4gICAgICAgIC5jcmVhdGVJbmRleCh7XHJcbiAgICAgICAgICBpbmRleDoge1xyXG4gICAgICAgICAgICBmaWVsZHM6IFtcInR5cGVuYW1lX19cIl1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIF8ubWFwKGRvY3VtZW50cywgKGRvYzogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGRvYy50eXBlbmFtZV9fID0gc2VsZi5fX3R5cGVuYW1lO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm4gZGIuYnVsa0RvY3MoZG9jdW1lbnRzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKHJlYXNvbikge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyB1cGRhdGVPbmU8VCBleHRlbmRzIE1vZGVsPFQ+PihcclxuICAgIHRoaXM6IG5ldyAoKSA9PiBULFxyXG4gICAgZG9jdW1lbnQ6IFBvdWNoREIuQ29yZS5Qb3N0RG9jdW1lbnQ8VCAmIE1vZGVsPFQ+PlxyXG4gICk6IFByb21pc2U8UG91Y2hEQi5Db3JlLlJlc3BvbnNlPiB7XHJcbiAgICBsZXQgc2VsZjogdHlwZW9mIE1vZGVsID0gdGhpcyBhcyBhbnk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICAgIHJldHVybiBkYlxyXG4gICAgICAgIC5jcmVhdGVJbmRleCh7XHJcbiAgICAgICAgICBpbmRleDoge1xyXG4gICAgICAgICAgICBmaWVsZHM6IFtcInR5cGVuYW1lX19cIl1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIGxldCBkb2M6IGFueSA9IGRvY3VtZW50O1xyXG4gICAgICAgICAgZG9jLnR5cGVuYW1lX18gPSBzZWxmLl9fdHlwZW5hbWU7XHJcbiAgICAgICAgICByZXR1cm4gZGIucHV0KGRvYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChyZWFzb24pIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgZGVsZXRlT25lPFQgZXh0ZW5kcyBNb2RlbDxUPj4odGhpczogbmV3ICgpID0+IFQsIGlkOiBzdHJpbmcpIHtcclxuICAgIGxldCBzZWxmOiB0eXBlb2YgTW9kZWwgPSB0aGlzIGFzIGFueTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlPFQ+ID0gPFBvdWNoREIuRGF0YWJhc2U8VD4+c2VsZi5kYjtcclxuICAgICAgcmV0dXJuIGRiLmdldChpZCkudGhlbigoZG9jOiBhbnkpID0+IHtcclxuICAgICAgICBkb2MuX2RlbGV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBkYi5wdXQoZG9jKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChyZWFzb24pIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY2hhbmdlPFQgZXh0ZW5kcyBNb2RlbDxUPj4oXHJcbiAgICB0aGlzOiBuZXcgKCkgPT4gVCxcclxuICAgIG9wdGlvbnM6IFBvdWNoREIuQ29yZS5DaGFuZ2VzT3B0aW9ucyB8IG51bGxcclxuICApIHtcclxuICAgIGxldCBzZWxmOiB0eXBlb2YgTW9kZWwgPSB0aGlzIGFzIGFueTtcclxuXHJcbiAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICBjb25zdCBvcHQgPSB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIGZpbHRlcjogYCR7c2VsZi5fX3R5cGVuYW1lfS8ke3NlbGYuX190eXBlbmFtZX1gXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBkYi5jaGFuZ2VzKG9wdCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udGFpbmVyIHtcclxuICBwcml2YXRlIGRiOiBQb3VjaERCLkRhdGFiYXNlO1xyXG4gIHB1YmxpYyBpbmZvOiBQb3VjaERCLkNvcmUuRGF0YWJhc2VJbmZvO1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgb3B0aW9ucz86IFBvdWNoREIuQ29uZmlndXJhdGlvbi5EYXRhYmFzZUNvbmZpZ3VyYXRpb25cclxuICApIHtcclxuICAgIFBvdWNoREIucGx1Z2luKEZpbmQpO1xyXG4gICAgUG91Y2hEQi5wbHVnaW4oSW5NZW1vcnlQbHVnaW4pO1xyXG4gICAgdGhpcy5kYiA9IG5ldyBQb3VjaERCKG5hbWUsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGFkZE1vZGVscyhtb2RlbHM6IEFycmF5PHR5cGVvZiBNb2RlbD4pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgdGhpcy5pbmZvID0gYXdhaXQgdGhpcy5kYi5pbmZvKCk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoXHJcbiAgICAgIF8ubWFwKG1vZGVscywgKG1vZGVsOiBhbnkpID0+IHtcclxuICAgICAgICBtb2RlbC5kYiA9IHRoaXMuZGI7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyOiBhbnkgPSB7XHJcbiAgICAgICAgICBfaWQ6IGBfZGVzaWduLyR7bW9kZWwuX190eXBlbmFtZX1gLFxyXG4gICAgICAgICAgZmlsdGVyczoge31cclxuICAgICAgICB9O1xyXG4gICAgICAgIGZpbHRlci5maWx0ZXJzW1xyXG4gICAgICAgICAgbW9kZWwuX190eXBlbmFtZVxyXG4gICAgICAgIF0gPSBgZnVuY3Rpb24gKGRvYykgeyByZXR1cm4gZG9jLnR5cGVuYW1lX18gPT09ICcke1xyXG4gICAgICAgICAgbW9kZWwuX190eXBlbmFtZVxyXG4gICAgICAgIH0nIHx8IGRvYy5faWQgPT09ICcke2BfZGVzaWduLyR7bW9kZWwuX190eXBlbmFtZX1gfScgfWA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIuZ2V0KGBfZGVzaWduLyR7bW9kZWwuX190eXBlbmFtZX1gKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5kYi5wdXQoZmlsdGVyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgY2xvc2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYi5jbG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFR5cGVOYW1lID0gKHR5cGVOYW1lOiBzdHJpbmcpID0+IHtcclxuICByZXR1cm4gKHRhcmdldDogdHlwZW9mIE1vZGVsKSA9PiB7XHJcbiAgICB0YXJnZXQuX190eXBlbmFtZSA9IHR5cGVOYW1lO1xyXG4gIH07XHJcbn07XHJcbiJdfQ==