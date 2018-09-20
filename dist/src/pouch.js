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
const InMemoryPlugin = require("pouchdb-adapter-memory");
const Find = require("pouchdb-find");
const wrapper_1 = require("../wrapper");
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
        wrapper_1.default.plugin(Find);
        wrapper_1.default.plugin(InMemoryPlugin);
        this.db = new wrapper_1.default(name, options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG91Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcG91Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDRCQUE0QjtBQUM1Qix5REFBeUQ7QUFDekQscUNBQXFDO0FBQ3JDLHdDQUFpQztBQUVqQztJQUlFLE1BQU0sQ0FBTyxPQUFPLENBRWxCLE9BQW9DOztZQUVwQyxJQUFJLElBQUksR0FBaUIsSUFBVyxDQUFDO1lBQ3JDLElBQUk7Z0JBQ0YsTUFBTSxFQUFFLEdBQTZDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzdELE9BQU8sQ0FBQyxRQUFRLHFCQUNYLE9BQU8sQ0FBQyxRQUFRLElBQ25CLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxHQUM1QixDQUFDO2dCQUVGLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtvQkFDeEMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUFDLE9BQU8sTUFBTSxFQUFFO2dCQUNmLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMvQjtRQUNILENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBTyxTQUFTLENBRXBCLFFBQWlEOztZQUVqRCxJQUFJLElBQUksR0FBaUIsSUFBVyxDQUFDO1lBQ3JDLElBQUk7Z0JBQ0YsTUFBTSxFQUFFLEdBQTZDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzdELE9BQU8sRUFBRTtxQkFDTixXQUFXLENBQUM7b0JBQ1gsS0FBSyxFQUFFO3dCQUNMLE1BQU0sRUFBRSxDQUFDLFlBQVksQ0FBQztxQkFDdkI7aUJBQ0YsQ0FBQztxQkFDRCxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUNULElBQUksR0FBRyxHQUFRLFFBQVEsQ0FBQztvQkFDeEIs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QyxDQUNILENBQUM7UUFDSixDQUFDO0tBQUE7SUFFWSxLQUFLOztZQUNoQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0NBQ0Y7QUF4Q0QsOEJBd0NDO0FBRVksUUFBQSxRQUFRLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUU7SUFDM0MsT0FBTyxDQUFDLE1BQW9CLEVBQUUsRUFBRTtRQUM5QixNQUFNLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0ICogYXMgSW5NZW1vcnlQbHVnaW4gZnJvbSBcInBvdWNoZGItYWRhcHRlci1tZW1vcnlcIjtcclxuaW1wb3J0ICogYXMgRmluZCBmcm9tIFwicG91Y2hkYi1maW5kXCI7XHJcbmltcG9ydCBQb3VjaERCIGZyb20gXCIuLi93cmFwcGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTW9kZWw8VCBleHRlbmRzIE1vZGVsPFQ+PiB7XHJcbiAgcHVibGljIHN0YXRpYyBkYjogUG91Y2hEQi5EYXRhYmFzZTtcclxuICBwdWJsaWMgc3RhdGljIF9fdHlwZW5hbWU6IHN0cmluZztcclxuXHJcbiAgc3RhdGljIGFzeW5jIGZpbmRBbGw8VCBleHRlbmRzIE1vZGVsPFQ+PihcclxuICAgIHRoaXM6IG5ldyAoKSA9PiBULFxyXG4gICAgcmVxdWVzdDogUG91Y2hEQi5GaW5kLkZpbmRSZXF1ZXN0PFQ+XHJcbiAgKTogUHJvbWlzZTxBcnJheTxUPj4ge1xyXG4gICAgbGV0IHNlbGY6IHR5cGVvZiBNb2RlbCA9IHRoaXMgYXMgYW55O1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZGI6IFBvdWNoREIuRGF0YWJhc2U8VD4gPSA8UG91Y2hEQi5EYXRhYmFzZTxUPj5zZWxmLmRiO1xyXG4gICAgICByZXF1ZXN0LnNlbGVjdG9yID0ge1xyXG4gICAgICAgIC4uLnJlcXVlc3Quc2VsZWN0b3IsXHJcbiAgICAgICAgdHlwZW5hbWVfXzogc2VsZi5fX3R5cGVuYW1lXHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXR1cm4gZGIuZmluZChyZXF1ZXN0KS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzLmRvY3MpO1xyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKHJlYXNvbikge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyBpbnNlcnRPbmU8VCBleHRlbmRzIE1vZGVsPFQ+PihcclxuICAgIHRoaXM6IG5ldyAoKSA9PiBULFxyXG4gICAgZG9jdW1lbnQ6IFBvdWNoREIuQ29yZS5Qb3N0RG9jdW1lbnQ8VCAmIE1vZGVsPFQ+PlxyXG4gICk6IFByb21pc2U8UG91Y2hEQi5Db3JlLlJlc3BvbnNlPiB7XHJcbiAgICBsZXQgc2VsZjogdHlwZW9mIE1vZGVsID0gdGhpcyBhcyBhbnk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICAgIHJldHVybiBkYlxyXG4gICAgICAgIC5jcmVhdGVJbmRleCh7XHJcbiAgICAgICAgICBpbmRleDoge1xyXG4gICAgICAgICAgICBmaWVsZHM6IFtcInR5cGVuYW1lX19cIl1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIGxldCBkb2M6IGFueSA9IGRvY3VtZW50O1xyXG4gICAgICAgICAgZG9jLnR5cGVuYW1lX18gPSBzZWxmLl9fdHlwZW5hbWU7XHJcbiAgICAgICAgICByZXR1cm4gZGIucG9zdChkb2MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAocmVhc29uKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIGluc2VydE1hbnk8VCBleHRlbmRzIE1vZGVsPFQ+PihcclxuICAgIHRoaXM6IG5ldyAoKSA9PiBULFxyXG4gICAgZG9jdW1lbnRzOiBBcnJheTxQb3VjaERCLkNvcmUuUHV0RG9jdW1lbnQ8VCAmIE1vZGVsPFQ+Pj5cclxuICApOiBQcm9taXNlPGFueT4ge1xyXG4gICAgbGV0IHNlbGY6IHR5cGVvZiBNb2RlbCA9IHRoaXMgYXMgYW55O1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZGI6IFBvdWNoREIuRGF0YWJhc2U8VD4gPSA8UG91Y2hEQi5EYXRhYmFzZTxUPj5zZWxmLmRiO1xyXG4gICAgICByZXR1cm4gZGJcclxuICAgICAgICAuY3JlYXRlSW5kZXgoe1xyXG4gICAgICAgICAgaW5kZXg6IHtcclxuICAgICAgICAgICAgZmllbGRzOiBbXCJ0eXBlbmFtZV9fXCJdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBfLm1hcChkb2N1bWVudHMsIChkb2M6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBkb2MudHlwZW5hbWVfXyA9IHNlbGYuX190eXBlbmFtZTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIGRiLmJ1bGtEb2NzKGRvY3VtZW50cyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChyZWFzb24pIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgdXBkYXRlT25lPFQgZXh0ZW5kcyBNb2RlbDxUPj4oXHJcbiAgICB0aGlzOiBuZXcgKCkgPT4gVCxcclxuICAgIGRvY3VtZW50OiBQb3VjaERCLkNvcmUuUG9zdERvY3VtZW50PFQgJiBNb2RlbDxUPj5cclxuICApOiBQcm9taXNlPFBvdWNoREIuQ29yZS5SZXNwb25zZT4ge1xyXG4gICAgbGV0IHNlbGY6IHR5cGVvZiBNb2RlbCA9IHRoaXMgYXMgYW55O1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZGI6IFBvdWNoREIuRGF0YWJhc2U8VD4gPSA8UG91Y2hEQi5EYXRhYmFzZTxUPj5zZWxmLmRiO1xyXG4gICAgICByZXR1cm4gZGJcclxuICAgICAgICAuY3JlYXRlSW5kZXgoe1xyXG4gICAgICAgICAgaW5kZXg6IHtcclxuICAgICAgICAgICAgZmllbGRzOiBbXCJ0eXBlbmFtZV9fXCJdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBsZXQgZG9jOiBhbnkgPSBkb2N1bWVudDtcclxuICAgICAgICAgIGRvYy50eXBlbmFtZV9fID0gc2VsZi5fX3R5cGVuYW1lO1xyXG4gICAgICAgICAgcmV0dXJuIGRiLnB1dChkb2MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAocmVhc29uKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIGRlbGV0ZU9uZTxUIGV4dGVuZHMgTW9kZWw8VD4+KHRoaXM6IG5ldyAoKSA9PiBULCBpZDogc3RyaW5nKSB7XHJcbiAgICBsZXQgc2VsZjogdHlwZW9mIE1vZGVsID0gdGhpcyBhcyBhbnk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICAgIHJldHVybiBkYi5nZXQoaWQpLnRoZW4oKGRvYzogYW55KSA9PiB7XHJcbiAgICAgICAgZG9jLl9kZWxldGVkID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZGIucHV0KGRvYyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAocmVhc29uKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNoYW5nZTxUIGV4dGVuZHMgTW9kZWw8VD4+KFxyXG4gICAgdGhpczogbmV3ICgpID0+IFQsXHJcbiAgICBvcHRpb25zOiBQb3VjaERCLkNvcmUuQ2hhbmdlc09wdGlvbnMgfCBudWxsXHJcbiAgKSB7XHJcbiAgICBsZXQgc2VsZjogdHlwZW9mIE1vZGVsID0gdGhpcyBhcyBhbnk7XHJcblxyXG4gICAgY29uc3QgZGI6IFBvdWNoREIuRGF0YWJhc2U8VD4gPSA8UG91Y2hEQi5EYXRhYmFzZTxUPj5zZWxmLmRiO1xyXG4gICAgY29uc3Qgb3B0ID0ge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBmaWx0ZXI6IGAke3NlbGYuX190eXBlbmFtZX0vJHtzZWxmLl9fdHlwZW5hbWV9YFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZGIuY2hhbmdlcyhvcHQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRhaW5lciB7XHJcbiAgcHJpdmF0ZSBkYjogUG91Y2hEQi5EYXRhYmFzZTtcclxuICBwdWJsaWMgaW5mbzogUG91Y2hEQi5Db3JlLkRhdGFiYXNlSW5mbztcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG9wdGlvbnM/OiBQb3VjaERCLkNvbmZpZ3VyYXRpb24uRGF0YWJhc2VDb25maWd1cmF0aW9uXHJcbiAgKSB7XHJcbiAgICBQb3VjaERCLnBsdWdpbihGaW5kKTtcclxuICAgIFBvdWNoREIucGx1Z2luKEluTWVtb3J5UGx1Z2luKTtcclxuICAgIHRoaXMuZGIgPSBuZXcgUG91Y2hEQihuYW1lLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBhZGRNb2RlbHMobW9kZWxzOiBBcnJheTx0eXBlb2YgTW9kZWw+KTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHRoaXMuaW5mbyA9IGF3YWl0IHRoaXMuZGIuaW5mbygpO1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFxyXG4gICAgICBfLm1hcChtb2RlbHMsIChtb2RlbDogYW55KSA9PiB7XHJcbiAgICAgICAgbW9kZWwuZGIgPSB0aGlzLmRiO1xyXG4gICAgICAgIGNvbnN0IGZpbHRlcjogYW55ID0ge1xyXG4gICAgICAgICAgX2lkOiBgX2Rlc2lnbi8ke21vZGVsLl9fdHlwZW5hbWV9YCxcclxuICAgICAgICAgIGZpbHRlcnM6IHt9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmaWx0ZXIuZmlsdGVyc1tcclxuICAgICAgICAgIG1vZGVsLl9fdHlwZW5hbWVcclxuICAgICAgICBdID0gYGZ1bmN0aW9uIChkb2MpIHsgcmV0dXJuIGRvYy50eXBlbmFtZV9fID09PSAnJHtcclxuICAgICAgICAgIG1vZGVsLl9fdHlwZW5hbWVcclxuICAgICAgICB9JyB8fCBkb2MuX2lkID09PSAnJHtgX2Rlc2lnbi8ke21vZGVsLl9fdHlwZW5hbWV9YH0nIH1gO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRiLmdldChgX2Rlc2lnbi8ke21vZGVsLl9fdHlwZW5hbWV9YCkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGIucHV0KGZpbHRlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGNsb3NlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGIuY2xvc2UoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBUeXBlTmFtZSA9ICh0eXBlTmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgcmV0dXJuICh0YXJnZXQ6IHR5cGVvZiBNb2RlbCkgPT4ge1xyXG4gICAgdGFyZ2V0Ll9fdHlwZW5hbWUgPSB0eXBlTmFtZTtcclxuICB9O1xyXG59O1xyXG4iXX0=