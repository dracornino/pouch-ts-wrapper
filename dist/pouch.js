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
const Find = require("pouchdb-find");
class Model {
    static findAll(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            try {
                const db = self.db;
                request.selector = Object.assign({}, request.selector, { "typename__": self.__typename });
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
                return db.createIndex({
                    index: {
                        fields: ["typename__"]
                    }
                }).then(() => {
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
                return db.createIndex({
                    index: {
                        fields: ["typename__"]
                    }
                }).then(() => {
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
                return db.createIndex({
                    index: {
                        fields: ["typename__"]
                    }
                }).then(() => {
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
                filter.filters[model.__typename] = `function (doc) { return doc.typename__ === '${model.__typename}' }`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG91Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcG91Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDRCQUE0QjtBQUM1QixtQ0FBbUM7QUFDbkMscUNBQXFDO0FBR3JDO0lBS0ksTUFBTSxDQUFPLE9BQU8sQ0FFaEIsT0FBb0M7O1lBRXBDLElBQUksSUFBSSxHQUFpQixJQUFXLENBQUM7WUFDckMsSUFBSTtnQkFDQSxNQUFNLEVBQUUsR0FBNkMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDN0QsT0FBTyxDQUFDLFFBQVEscUJBQ1QsT0FBTyxDQUFDLFFBQVEsSUFDbkIsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQ2hDLENBQUM7Z0JBRUYsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO29CQUN0QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsQ0FBQzthQUVOO1lBQUMsT0FBTyxNQUFNLEVBQUU7Z0JBQ2IsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFPLFNBQVMsQ0FFbEIsUUFBaUQ7O1lBRWpELElBQUksSUFBSSxHQUFpQixJQUFXLENBQUM7WUFDckMsSUFBSTtnQkFDQSxNQUFNLEVBQUUsR0FBNkMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDN0QsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO29CQUNsQixLQUFLLEVBQUU7d0JBQ0gsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDO3FCQUN6QjtpQkFDSixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDVCxJQUFJLEdBQUcsR0FBUSxRQUFRLENBQUM7b0JBQ3hCLEdBQUcsQ0FBQyxVQUFVLEdB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QTtDQUVKO0FBcENELDhCQW9DQztBQUVZLFFBQUEsUUFBUSxHQUFHLENBQUMsUUFBZ0IsRUFBRSxFQUFFO0lBQ3pDLE9BQU8sQ0FBQyxNQUFvQixFQUFFLEVBQUU7UUFDNUIsTUFBTSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7SUFDakMsQ0FBQyxDQUFBO0FBQ0wsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCAqIGFzIFBvdWNoREIgZnJvbSBcInBvdWNoZGJcIjtcclxuaW1wb3J0ICogYXMgRmluZCBmcm9tIFwicG91Y2hkYi1maW5kXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIE1vZGVsPFQgZXh0ZW5kcyBNb2RlbDxUPj4ge1xyXG4gICAgcHVibGljIHN0YXRpYyBkYjogUG91Y2hEQi5EYXRhYmFzZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgX190eXBlbmFtZTogc3RyaW5nO1xyXG5cclxuXHJcbiAgICBzdGF0aWMgYXN5bmMgZmluZEFsbDxUIGV4dGVuZHMgTW9kZWw8VD4+KFxyXG4gICAgICAgIHRoaXM6IG5ldyAoKSA9PiBULFxyXG4gICAgICAgIHJlcXVlc3Q6IFBvdWNoREIuRmluZC5GaW5kUmVxdWVzdDxUPlxyXG4gICAgKTogUHJvbWlzZTxBcnJheTxUPj4ge1xyXG4gICAgICAgIGxldCBzZWxmOiB0eXBlb2YgTW9kZWwgPSB0aGlzIGFzIGFueTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICAgICAgICAgIHJlcXVlc3Quc2VsZWN0b3IgPSB7XHJcbiAgICAgICAgICAgICAgICAuLi5yZXF1ZXN0LnNlbGVjdG9yLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlbmFtZV9fXCI6IHNlbGYuX190eXBlbmFtZVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRiLmZpbmQocmVxdWVzdCkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzLmRvY3MpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAocmVhc29uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYXN5bmMgaW5zZXJ0T25lPFQgZXh0ZW5kcyBNb2RlbDxUPj4oXHJcbiAgICAgICAgdGhpczogbmV3ICgpID0+IFQsXHJcbiAgICAgICAgZG9jdW1lbnQ6IFBvdWNoREIuQ29yZS5Qb3N0RG9jdW1lbnQ8VCAmIE1vZGVsPFQ+PlxyXG4gICAgKTogUHJvbWlzZTxQb3VjaERCLkNvcmUuUmVzcG9uc2U+IHtcclxuICAgICAgICBsZXQgc2VsZjogdHlwZW9mIE1vZGVsID0gdGhpcyBhcyBhbnk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgZGI6IFBvdWNoREIuRGF0YWJhc2U8VD4gPSA8UG91Y2hEQi5EYXRhYmFzZTxUPj5zZWxmLmRiO1xyXG4gICAgICAgICAgICByZXR1cm4gZGIuY3JlYXRlSW5kZXgoe1xyXG4gICAgICAgICAgICAgICAgaW5kZXg6IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IFtcInR5cGVuYW1lX19cIl1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZG9jOiBhbnkgPSBkb2N1bWVudDtcclxuICAgICAgICAgICAgICAgIGRvYy50eXBlbmFtZV9fID0gc2VsZi5fX3R5cGVuYW1lO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRiLnBvc3QoZG9jKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKHJlYXNvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhc3luYyBpbnNlcnRNYW55PFQgZXh0ZW5kcyBNb2RlbDxUPj4oXHJcbiAgICAgICAgdGhpczogbmV3ICgpID0+IFQsXHJcbiAgICAgICAgZG9jdW1lbnRzOiBBcnJheTxQb3VjaERCLkNvcmUuUHV0RG9jdW1lbnQ8VCAmIE1vZGVsPFQ+Pj5cclxuICAgICk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgbGV0IHNlbGY6IHR5cGVvZiBNb2RlbCA9IHRoaXMgYXMgYW55O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlPFQ+ID0gPFBvdWNoREIuRGF0YWJhc2U8VD4+c2VsZi5kYjtcclxuICAgICAgICAgICAgcmV0dXJuIGRiLmNyZWF0ZUluZGV4KHtcclxuICAgICAgICAgICAgICAgIGluZGV4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBbXCJ0eXBlbmFtZV9fXCJdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgXy5tYXAoZG9jdW1lbnRzLCAoZG9jOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkb2MudHlwZW5hbWVfXyA9IHNlbGYuX190eXBlbmFtZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGIuYnVsa0RvY3MoZG9jdW1lbnRzKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKHJlYXNvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyBhc3luYyB1cGRhdGVPbmU8VCBleHRlbmRzIE1vZGVsPFQ+PihcclxuICAgICAgICB0aGlzOiBuZXcgKCkgPT4gVCxcclxuICAgICAgICBkb2N1bWVudDogUG91Y2hEQi5Db3JlLlBvc3REb2N1bWVudDxUICYgTW9kZWw8VD4+XHJcbiAgICApOiBQcm9taXNlPFBvdWNoREIuQ29yZS5SZXNwb25zZT4ge1xyXG4gICAgICAgIGxldCBzZWxmOiB0eXBlb2YgTW9kZWwgPSB0aGlzIGFzIGFueTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICAgICAgICAgIHJldHVybiBkYi5jcmVhdGVJbmRleCh7XHJcbiAgICAgICAgICAgICAgICBpbmRleDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkczogW1widHlwZW5hbWVfX1wiXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBkb2M6IGFueSA9IGRvY3VtZW50O1xyXG4gICAgICAgICAgICAgICAgZG9jLnR5cGVuYW1lX18gPSBzZWxmLl9fdHlwZW5hbWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGIucHV0KGRvYyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChyZWFzb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYXN5bmMgZGVsZXRlT25lPFQgZXh0ZW5kcyBNb2RlbDxUPj4oXHJcbiAgICAgICAgdGhpczogbmV3ICgpID0+IFQsXHJcbiAgICAgICAgaWQ6IHN0cmluZ1xyXG4gICAgKSB7XHJcbiAgICAgICAgbGV0IHNlbGY6IHR5cGVvZiBNb2RlbCA9IHRoaXMgYXMgYW55O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlPFQ+ID0gPFBvdWNoREIuRGF0YWJhc2U8VD4+c2VsZi5kYjtcclxuICAgICAgICAgICAgcmV0dXJuIGRiLmdldChpZCkudGhlbigoZG9jOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGRvYy5fZGVsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGIucHV0KGRvYyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChyZWFzb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGF0aWMgY2hhbmdlPFQgZXh0ZW5kcyBNb2RlbDxUPj4oXHJcbiAgICAgICAgdGhpczogbmV3ICgpID0+IFQsXHJcbiAgICAgICAgb3B0aW9uczogUG91Y2hEQi5Db3JlLkNoYW5nZXNPcHRpb25zIHwgbnVsbFxyXG4gICAgKSB7XHJcbiAgICAgICAgbGV0IHNlbGY6IHR5cGVvZiBNb2RlbCA9IHRoaXMgYXMgYW55O1xyXG5cclxuICAgICAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICAgICAgY29uc3Qgb3B0ID0ge1xyXG4gICAgICAgICAgICAuLi5vcHRpb25zLFxyXG4gICAgICAgICAgICBmaWx0ZXI6IGAke3NlbGYuX190eXBlbmFtZX0vJHtzZWxmLl9fdHlwZW5hbWV9YFxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gZGIuY2hhbmdlcyhvcHQpO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDb250YWluZXIge1xyXG4gICAgcHJpdmF0ZSBkYjogUG91Y2hEQi5EYXRhYmFzZTtcclxuICAgIHB1YmxpYyBpbmZvOiBQb3VjaERCLkNvcmUuRGF0YWJhc2VJbmZvO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBvcHRpb25zPzogUG91Y2hEQi5Db25maWd1cmF0aW9uLkRhdGFiYXNlQ29uZmlndXJhdGlvbikge1xyXG4gICAgICAgIFBvdWNoREIucGx1Z2luKEZpbmQpO1xyXG4gICAgICAgIHRoaXMuZGIgPSBuZXcgUG91Y2hEQihuYW1lLCBvcHRpb25zKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGFkZE1vZGVscyhtb2RlbHM6IEFycmF5PHR5cGVvZiBNb2RlbD4pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHRoaXMuaW5mbyA9IGF3YWl0IHRoaXMuZGIuaW5mbygpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChcclxuICAgICAgICAgICAgXy5tYXAobW9kZWxzLCAobW9kZWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbW9kZWwuZGIgPSB0aGlzLmRiO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyOiBhbnkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2lkOiBgX2Rlc2lnbi8ke21vZGVsLl9fdHlwZW5hbWV9YCxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZpbHRlci5maWx0ZXJzW21vZGVsLl9fdHlwZW5hbWVdID0gYGZ1bmN0aW9uIChkb2MpIHsgcmV0dXJuIGRvYy50eXBlbmFtZV9fID09PSAnJHttb2RlbC5fX3R5cGVuYW1lfScgfWA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYi5nZXQoYF9kZXNpZ24vJHttb2RlbC5fX3R5cGVuYW1lfWApLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYi5wdXQoZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgY2xvc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBUeXBlTmFtZSA9ICh0eXBlTmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICByZXR1cm4gKHRhcmdldDogdHlwZW9mIE1vZGVsKSA9PiB7XHJcbiAgICAgICAgdGFyZ2V0Ll9fdHlwZW5hbWUgPSB0eXBlTmFtZTtcclxuICAgIH1cclxufSJdfQ==