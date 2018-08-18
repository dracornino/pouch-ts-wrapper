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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG91Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcG91Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDRCQUE0QjtBQUM1QixtQ0FBbUM7QUFDbkMscUNBQXFDO0FBR3JDO0lBS0ksTUFBTSxDQUFPLE9BQU8sQ0FFaEIsT0FBb0M7O1lBRXBDLElBQUksSUFBSSxHQUFpQixJQUFXLENBQUM7WUFDckMsSUFBSTtnQkFDQSxNQUFNLEVBQUUsR0FBNkMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDN0QsT0FBTyxDQUFDLFFBQVEscUJBQ1QsT0FBTyxDQUFDLFFBQVEsSUFDbkIsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQ2hDLENBQUM7Z0JBRUYsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO29CQUN0QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsQ0FBQzthQUVOO1lBQUMsT0FBTyxNQUFNLEVBQUU7Z0JBQ2IsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFPLFNBQVMsQ0FFbEIsUUFBaUQ7O1lBRWpELElBQUksSUFBSSxHQUFpQixJQUFXLENBQUM7WUFDckMsSUFBSTtnQkFDQSxNQUFNLEVBQUUsR0FBNkMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDN0QsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO29CQUNsQixLQUFLLEVBQUU7d0JBQ0gsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDO3FCQUN6QjtpQkFDSixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDVCxJQUFJLEdBQUcsR0FBUSxRQUFRLENBQUM7b0JBQ3hCLEdBQUcsQ0FBQyxVQUFVLEdB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QUMsS0FBSyxFQUFFLENBQUM7UUFDM0IsQ0FBQztLQUFBO0NBRUo7QUFwQ0QsOEJBb0NDO0FBRVksUUFBQSxRQUFRLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUU7SUFDekMsT0FBTyxDQUFDLE1BQW9CLEVBQUUsRUFBRTtRQUM1QixNQUFNLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztJQUNqQyxDQUFDLENBQUE7QUFDTCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0ICogYXMgUG91Y2hEQiBmcm9tIFwicG91Y2hkYlwiO1xyXG5pbXBvcnQgKiBhcyBGaW5kIGZyb20gXCJwb3VjaGRiLWZpbmRcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTW9kZWw8VCBleHRlbmRzIE1vZGVsPFQ+PiB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGRiOiBQb3VjaERCLkRhdGFiYXNlO1xyXG4gICAgcHVibGljIHN0YXRpYyBfX3R5cGVuYW1lOiBzdHJpbmc7XHJcblxyXG5cclxuICAgIHN0YXRpYyBhc3luYyBmaW5kQWxsPFQgZXh0ZW5kcyBNb2RlbDxUPj4oXHJcbiAgICAgICAgdGhpczogbmV3ICgpID0+IFQsXHJcbiAgICAgICAgcmVxdWVzdDogUG91Y2hEQi5GaW5kLkZpbmRSZXF1ZXN0PFQ+XHJcbiAgICApOiBQcm9taXNlPEFycmF5PFQ+PiB7XHJcbiAgICAgICAgbGV0IHNlbGY6IHR5cGVvZiBNb2RlbCA9IHRoaXMgYXMgYW55O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlPFQ+ID0gPFBvdWNoREIuRGF0YWJhc2U8VD4+c2VsZi5kYjtcclxuICAgICAgICAgICAgcmVxdWVzdC5zZWxlY3RvciA9IHtcclxuICAgICAgICAgICAgICAgIC4uLnJlcXVlc3Quc2VsZWN0b3IsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVuYW1lX19cIjogc2VsZi5fX3R5cGVuYW1lXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGIuZmluZChyZXF1ZXN0KS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMuZG9jcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChyZWFzb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhc3luYyBpbnNlcnRPbmU8VCBleHRlbmRzIE1vZGVsPFQ+PihcclxuICAgICAgICB0aGlzOiBuZXcgKCkgPT4gVCxcclxuICAgICAgICBkb2N1bWVudDogUG91Y2hEQi5Db3JlLlBvc3REb2N1bWVudDxUICYgTW9kZWw8VD4+XHJcbiAgICApOiBQcm9taXNlPFBvdWNoREIuQ29yZS5SZXNwb25zZT4ge1xyXG4gICAgICAgIGxldCBzZWxmOiB0eXBlb2YgTW9kZWwgPSB0aGlzIGFzIGFueTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICAgICAgICAgIHJldHVybiBkYi5jcmVhdGVJbmRleCh7XHJcbiAgICAgICAgICAgICAgICBpbmRleDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkczogW1widHlwZW5hbWVfX1wiXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBkb2M6IGFueSA9IGRvY3VtZW50O1xyXG4gICAgICAgICAgICAgICAgZG9jLnR5cGVuYW1lX18gPSBzZWxmLl9fdHlwZW5hbWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGIucG9zdChkb2MpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAocmVhc29uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFzeW5jIGluc2VydE1hbnk8VCBleHRlbmRzIE1vZGVsPFQ+PihcclxuICAgICAgICB0aGlzOiBuZXcgKCkgPT4gVCxcclxuICAgICAgICBkb2N1bWVudHM6IEFycmF5PFBvdWNoREIuQ29yZS5QdXREb2N1bWVudDxUICYgTW9kZWw8VD4+PlxyXG4gICAgKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBsZXQgc2VsZjogdHlwZW9mIE1vZGVsID0gdGhpcyBhcyBhbnk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgZGI6IFBvdWNoREIuRGF0YWJhc2U8VD4gPSA8UG91Y2hEQi5EYXRhYmFzZTxUPj5zZWxmLmRiO1xyXG4gICAgICAgICAgICByZXR1cm4gZGIuY3JlYXRlSW5kZXgoe1xyXG4gICAgICAgICAgICAgICAgaW5kZXg6IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IFtcInR5cGVuYW1lX19cIl1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBfLm1hcChkb2N1bWVudHMsIChkb2M6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvYy50eXBlbmFtZV9fID0gc2VsZi5fX3R5cGVuYW1lO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYi5idWxrRG9jcyhkb2N1bWVudHMpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAocmVhc29uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgc3RhdGljIGFzeW5jIHVwZGF0ZU9uZTxUIGV4dGVuZHMgTW9kZWw8VD4+KFxyXG4gICAgICAgIHRoaXM6IG5ldyAoKSA9PiBULFxyXG4gICAgICAgIGRvY3VtZW50OiBQb3VjaERCLkNvcmUuUG9zdERvY3VtZW50PFQgJiBNb2RlbDxUPj5cclxuICAgICk6IFByb21pc2U8UG91Y2hEQi5Db3JlLlJlc3BvbnNlPiB7XHJcbiAgICAgICAgbGV0IHNlbGY6IHR5cGVvZiBNb2RlbCA9IHRoaXMgYXMgYW55O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlPFQ+ID0gPFBvdWNoREIuRGF0YWJhc2U8VD4+c2VsZi5kYjtcclxuICAgICAgICAgICAgcmV0dXJuIGRiLmNyZWF0ZUluZGV4KHtcclxuICAgICAgICAgICAgICAgIGluZGV4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBbXCJ0eXBlbmFtZV9fXCJdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRvYzogYW55ID0gZG9jdW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBkb2MudHlwZW5hbWVfXyA9IHNlbGYuX190eXBlbmFtZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYi5wdXQoZG9jKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKHJlYXNvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhc3luYyBkZWxldGVPbmU8VCBleHRlbmRzIE1vZGVsPFQ+PihcclxuICAgICAgICB0aGlzOiBuZXcgKCkgPT4gVCxcclxuICAgICAgICBpZDogc3RyaW5nXHJcbiAgICApIHtcclxuICAgICAgICBsZXQgc2VsZjogdHlwZW9mIE1vZGVsID0gdGhpcyBhcyBhbnk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgZGI6IFBvdWNoREIuRGF0YWJhc2U8VD4gPSA8UG91Y2hEQi5EYXRhYmFzZTxUPj5zZWxmLmRiO1xyXG4gICAgICAgICAgICByZXR1cm4gZGIuZ2V0KGlkKS50aGVuKChkb2M6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZG9jLl9kZWxldGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYi5wdXQoZG9jKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKHJlYXNvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyBjaGFuZ2U8VCBleHRlbmRzIE1vZGVsPFQ+PihcclxuICAgICAgICB0aGlzOiBuZXcgKCkgPT4gVCxcclxuICAgICAgICBvcHRpb25zOiBQb3VjaERCLkNvcmUuQ2hhbmdlc09wdGlvbnMgfCBudWxsXHJcbiAgICApIHtcclxuICAgICAgICBsZXQgc2VsZjogdHlwZW9mIE1vZGVsID0gdGhpcyBhcyBhbnk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlPFQ+ID0gPFBvdWNoREIuRGF0YWJhc2U8VD4+c2VsZi5kYjtcclxuICAgICAgICBjb25zdCBvcHQgPSB7XHJcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIGZpbHRlcjogYCR7c2VsZi5fX3R5cGVuYW1lfS8ke3NlbGYuX190eXBlbmFtZX1gXHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBkYi5jaGFuZ2VzKG9wdCk7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRhaW5lciB7XHJcbiAgICBwcml2YXRlIGRiOiBQb3VjaERCLkRhdGFiYXNlO1xyXG4gICAgcHVibGljIGluZm86IFBvdWNoREIuQ29yZS5EYXRhYmFzZUluZm87XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG9wdGlvbnM/OiBQb3VjaERCLkNvbmZpZ3VyYXRpb24uRGF0YWJhc2VDb25maWd1cmF0aW9uKSB7XHJcbiAgICAgICAgUG91Y2hEQi5wbHVnaW4oRmluZCk7XHJcbiAgICAgICAgdGhpcy5kYiA9IG5ldyBQb3VjaERCKG5hbWUsIG9wdGlvbnMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgYWRkTW9kZWxzKG1vZGVsczogQXJyYXk8dHlwZW9mIE1vZGVsPik6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgdGhpcy5pbmZvID0gYXdhaXQgdGhpcy5kYi5pbmZvKCk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxyXG4gICAgICAgICAgICBfLm1hcChtb2RlbHMsIChtb2RlbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtb2RlbC5kYiA9IHRoaXMuZGI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXI6IGFueSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBfaWQ6IGBfZGVzaWduLyR7bW9kZWwuX190eXBlbmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmlsdGVyLmZpbHRlcnNbbW9kZWwuX190eXBlbmFtZV0gPSBgZnVuY3Rpb24gKGRvYykgeyByZXR1cm4gZG9jLnR5cGVuYW1lX18gPT09ICcke21vZGVsLl9fdHlwZW5hbWV9JyB8fCBkb2MuX2lkID09PSAnJHtgX2Rlc2lnbi8ke21vZGVsLl9fdHlwZW5hbWV9YH0nIH1gO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGIuZ2V0KGBfZGVzaWduLyR7bW9kZWwuX190eXBlbmFtZX1gKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGIucHV0KGZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGNsb3NlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRiLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgVHlwZU5hbWUgPSAodHlwZU5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgcmV0dXJuICh0YXJnZXQ6IHR5cGVvZiBNb2RlbCkgPT4ge1xyXG4gICAgICAgIHRhcmdldC5fX3R5cGVuYW1lID0gdHlwZU5hbWU7XHJcbiAgICB9XHJcbn0iXX0=