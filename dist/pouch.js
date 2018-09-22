"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var PouchDB = require("pouchdb");
var wrapper_1 = require("./wrapper");
var Model = /** @class */ (function () {
    function Model() {
    }
    Model.findAll = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var self, db;
            return __generator(this, function (_a) {
                self = this;
                try {
                    db = self.db;
                    request.selector = __assign({}, request.selector, { typename__: self.__typename });
                    return [2 /*return*/, db.find(request).then(function (res) {
                            return Promise.resolve(res.docs);
                        })];
                }
                catch (reason) {
                    return [2 /*return*/, Promise.reject(reason)];
                }
                return [2 /*return*/];
            });
        });
    };
    Model.insertOne = function (document) {
        return __awaiter(this, void 0, void 0, function () {
            var self, db_1;
            return __generator(this, function (_a) {
                self = this;
                try {
                    db_1 = self.db;
                    return [2 /*return*/, db_1
                            .createIndex({
                            index: {
                                fields: ["typename__"]
                            }
                        })
                            .then(function () {
                            var doc = document;
                            doc.typename__ = self.__typename;
                            return db_1.post(doc);
                        })];
                }
                catch (reason) {
                    return [2 /*return*/, Promise.reject(reason)];
                }
                return [2 /*return*/];
            });
        });
    };
    Model.insertMany = function (documents) {
        return __awaiter(this, void 0, void 0, function () {
            var self, db_2;
            return __generator(this, function (_a) {
                self = this;
                try {
                    db_2 = self.db;
                    return [2 /*return*/, db_2
                            .createIndex({
                            index: {
                                fields: ["typename__"]
                            }
                        })
                            .then(function () {
                            _.map(documents, function (doc) {
                                doc.typename__ = self.__typename;
                            });
                            return db_2.bulkDocs(documents);
                        })];
                }
                catch (reason) {
                    return [2 /*return*/, Promise.reject(reason)];
                }
                return [2 /*return*/];
            });
        });
    };
    Model.updateOne = function (document) {
        return __awaiter(this, void 0, void 0, function () {
            var self, db_3;
            return __generator(this, function (_a) {
                self = this;
                try {
                    db_3 = self.db;
                    return [2 /*return*/, db_3
                            .createIndex({
                            index: {
                                fields: ["typename__"]
                            }
                        })
                            .then(function () {
                            var doc = document;
                            doc.typename__ = self.__typename;
                            return db_3.put(doc);
                        })];
                }
                catch (reason) {
                    return [2 /*return*/, Promise.reject(reason)];
                }
                return [2 /*return*/];
            });
        });
    };
    Model.deleteOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var self, db_4;
            return __generator(this, function (_a) {
                self = this;
                try {
                    db_4 = self.db;
                    return [2 /*return*/, db_4.get(id).then(function (doc) {
                            doc._deleted = true;
                            return db_4.put(doc);
                        })];
                }
                catch (reason) {
                    return [2 /*return*/, Promise.reject(reason)];
                }
                return [2 /*return*/];
            });
        });
    };
    Model.deleteAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, db, info, result, docsToDelete, reason_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        db = self.db;
                        return [4 /*yield*/, db.info()];
                    case 2:
                        info = _a.sent();
                        return [4 /*yield*/, db.find({
                                selector: { _id: { $gt: null } },
                                limit: info.doc_count
                            })];
                    case 3:
                        result = _a.sent();
                        docsToDelete = _.map(result.docs, function (doc) {
                            doc._deleted = true;
                            return doc;
                        });
                        return [2 /*return*/, db.bulkDocs(docsToDelete)];
                    case 4:
                        reason_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(reason_1)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Model.change = function (options) {
        var self = this;
        var db = self.db;
        var opt = __assign({}, options, { filter: self.__typename + "/" + self.__typename });
        return db.changes(opt);
    };
    return Model;
}());
exports.Model = Model;
var Container = /** @class */ (function () {
    /**
     *
     */
    function Container(name, options) {
        console.log("PouchDb Version " + PouchDB.version);
        this.dbName = name;
        this.dbOptions = options;
        this.db = wrapper_1.createDb(name, options);
    }
    Container.prototype.safePurge = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.db.find({
                                selector: { _id: { $gt: null } },
                                limit: 1
                            })];
                    case 1:
                        result = _a.sent();
                        if (!(result.docs.length === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.db.destroy()];
                    case 2:
                        _a.sent();
                        this.db = wrapper_1.createDb(this.dbName, this.dbOptions);
                        return [4 /*yield*/, this.addModelsHandler()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, Promise.resolve({
                            ok: false
                        })];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 7: return [2 /*return*/, Promise.resolve({
                            ok: true
                        })];
                }
            });
        });
    };
    Container.prototype.change = function (options) {
        var db = this.db;
        return db.changes(options);
    };
    Container.prototype.addModelsHandler = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.db.info()];
                    case 1:
                        _a.info = _b.sent();
                        return [2 /*return*/, Promise.all(_.map(this.models, function (model) {
                                model.db = _this.db;
                                var filter = {
                                    _id: "_design/" + model.__typename,
                                    filters: {}
                                };
                                filter.filters[model.__typename] = "function (doc) { return doc.typename__ === '" + model.__typename + "' || doc._id === '" + ("_design/" + model.__typename) + "' }";
                                return _this.db.get("_design/" + model.__typename).catch(function () {
                                    return _this.db.put(filter);
                                });
                            }))];
                }
            });
        });
    };
    Container.prototype.addModels = function (models) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.models = models;
                return [2 /*return*/, this.addModelsHandler()];
            });
        });
    };
    Container.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.db.close()];
            });
        });
    };
    Container.prototype.compact = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.db.compact()];
            });
        });
    };
    return Container;
}());
exports.Container = Container;
exports.TypeName = function (typeName) {
    return function (target) {
        target.__typename = typeName;
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG91Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcG91Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEJBQTRCO0FBQzVCLGlDQUFtQztBQUNuQyxxQ0FBcUM7QUFFckM7SUFBQTtJQTRJQSxDQUFDO0lBeEljLGFBQU8sR0FBcEIsVUFFRSxPQUFvQzs7OztnQkFFaEMsSUFBSSxHQUFpQixJQUFXLENBQUM7Z0JBQ3JDLElBQUk7b0JBQ0ksRUFBRSxHQUE2QyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUM3RCxPQUFPLENBQUMsUUFBUSxnQkFDWCxPQUFPLENBQUMsUUFBUSxJQUNuQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FDNUIsQ0FBQztvQkFFRixzQkFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7NEJBQ3BDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25DLENBQUMsQ0FBQyxFQUFDO2lCQUNKO2dCQUFDLE9BQU8sTUFBTSxFQUFFO29CQUNmLHNCQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUM7aUJBQy9COzs7O0tBQ0Y7SUFFWSxlQUFTLEdBQXRCLFVBRUUsUUFBaUQ7Ozs7Z0JBRTdDLElBQUksR0FBaUIsSUFBVyxDQUFDO2dCQUNyQyxJQUFJO29CQUNJLE9BQStDLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQzdELHNCQUFPLElBQUU7NkJBQ04sV0FBVyxDQUFDOzRCQUNYLEtBQUssRUFBRTtnQ0FDTCxNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7NkJBQ3ZCO3lCQUNGLENBQUM7NkJBQ0QsSUFBSSxDQUFDOzRCQUNKLElBQUksR0FBRyxHQUFRLFFBQVEsQ0FBQzs0QkFDeEIsR0FBRyxDQUFDLFVB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IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgKiBhcyBQb3VjaERCIGZyb20gXCJwb3VjaGRiXCI7XHJcbmltcG9ydCB7IGNyZWF0ZURiIH0gZnJvbSBcIi4vd3JhcHBlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vZGVsPFQgZXh0ZW5kcyBNb2RlbDxUPj4ge1xyXG4gIHB1YmxpYyBzdGF0aWMgZGI6IFBvdWNoREIuRGF0YWJhc2U7XHJcbiAgcHVibGljIHN0YXRpYyBfX3R5cGVuYW1lOiBzdHJpbmc7XHJcblxyXG4gIHN0YXRpYyBhc3luYyBmaW5kQWxsPFQgZXh0ZW5kcyBNb2RlbDxUPj4oXHJcbiAgICB0aGlzOiBuZXcgKCkgPT4gVCxcclxuICAgIHJlcXVlc3Q6IFBvdWNoREIuRmluZC5GaW5kUmVxdWVzdDxUPlxyXG4gICk6IFByb21pc2U8QXJyYXk8VD4+IHtcclxuICAgIGxldCBzZWxmOiB0eXBlb2YgTW9kZWwgPSB0aGlzIGFzIGFueTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlPFQ+ID0gPFBvdWNoREIuRGF0YWJhc2U8VD4+c2VsZi5kYjtcclxuICAgICAgcmVxdWVzdC5zZWxlY3RvciA9IHtcclxuICAgICAgICAuLi5yZXF1ZXN0LnNlbGVjdG9yLFxyXG4gICAgICAgIHR5cGVuYW1lX186IHNlbGYuX190eXBlbmFtZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmV0dXJuIGRiLmZpbmQocmVxdWVzdCkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcy5kb2NzKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChyZWFzb24pIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgaW5zZXJ0T25lPFQgZXh0ZW5kcyBNb2RlbDxUPj4oXHJcbiAgICB0aGlzOiBuZXcgKCkgPT4gVCxcclxuICAgIGRvY3VtZW50OiBQb3VjaERCLkNvcmUuUG9zdERvY3VtZW50PFQgJiBNb2RlbDxUPj5cclxuICApOiBQcm9taXNlPFBvdWNoREIuQ29yZS5SZXNwb25zZT4ge1xyXG4gICAgbGV0IHNlbGY6IHR5cGVvZiBNb2RlbCA9IHRoaXMgYXMgYW55O1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZGI6IFBvdWNoREIuRGF0YWJhc2U8VD4gPSA8UG91Y2hEQi5EYXRhYmFzZTxUPj5zZWxmLmRiO1xyXG4gICAgICByZXR1cm4gZGJcclxuICAgICAgICAuY3JlYXRlSW5kZXgoe1xyXG4gICAgICAgICAgaW5kZXg6IHtcclxuICAgICAgICAgICAgZmllbGRzOiBbXCJ0eXBlbmFtZV9fXCJdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBsZXQgZG9jOiBhbnkgPSBkb2N1bWVudDtcclxuICAgICAgICAgIGRvYy50eXBlbmFtZV9fID0gc2VsZi5fX3R5cGVuYW1lO1xyXG4gICAgICAgICAgcmV0dXJuIGRiLnBvc3QoZG9jKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKHJlYXNvbikge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyBpbnNlcnRNYW55PFQgZXh0ZW5kcyBNb2RlbDxUPj4oXHJcbiAgICB0aGlzOiBuZXcgKCkgPT4gVCxcclxuICAgIGRvY3VtZW50czogQXJyYXk8UG91Y2hEQi5Db3JlLlB1dERvY3VtZW50PFQgJiBNb2RlbDxUPj4+XHJcbiAgKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGxldCBzZWxmOiB0eXBlb2YgTW9kZWwgPSB0aGlzIGFzIGFueTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlPFQ+ID0gPFBvdWNoREIuRGF0YWJhc2U8VD4+c2VsZi5kYjtcclxuICAgICAgcmV0dXJuIGRiXHJcbiAgICAgICAgLmNyZWF0ZUluZGV4KHtcclxuICAgICAgICAgIGluZGV4OiB7XHJcbiAgICAgICAgICAgIGZpZWxkczogW1widHlwZW5hbWVfX1wiXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgXy5tYXAoZG9jdW1lbnRzLCAoZG9jOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgZG9jLnR5cGVuYW1lX18gPSBzZWxmLl9fdHlwZW5hbWU7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybiBkYi5idWxrRG9jcyhkb2N1bWVudHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAocmVhc29uKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIHVwZGF0ZU9uZTxUIGV4dGVuZHMgTW9kZWw8VD4+KFxyXG4gICAgdGhpczogbmV3ICgpID0+IFQsXHJcbiAgICBkb2N1bWVudDogUG91Y2hEQi5Db3JlLlBvc3REb2N1bWVudDxUICYgTW9kZWw8VD4+XHJcbiAgKTogUHJvbWlzZTxQb3VjaERCLkNvcmUuUmVzcG9uc2U+IHtcclxuICAgIGxldCBzZWxmOiB0eXBlb2YgTW9kZWwgPSB0aGlzIGFzIGFueTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlPFQ+ID0gPFBvdWNoREIuRGF0YWJhc2U8VD4+c2VsZi5kYjtcclxuICAgICAgcmV0dXJuIGRiXHJcbiAgICAgICAgLmNyZWF0ZUluZGV4KHtcclxuICAgICAgICAgIGluZGV4OiB7XHJcbiAgICAgICAgICAgIGZpZWxkczogW1widHlwZW5hbWVfX1wiXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgbGV0IGRvYzogYW55ID0gZG9jdW1lbnQ7XHJcbiAgICAgICAgICBkb2MudHlwZW5hbWVfXyA9IHNlbGYuX190eXBlbmFtZTtcclxuICAgICAgICAgIHJldHVybiBkYi5wdXQoZG9jKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKHJlYXNvbikge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyBkZWxldGVPbmU8VCBleHRlbmRzIE1vZGVsPFQ+Pih0aGlzOiBuZXcgKCkgPT4gVCwgaWQ6IHN0cmluZykge1xyXG4gICAgbGV0IHNlbGY6IHR5cGVvZiBNb2RlbCA9IHRoaXMgYXMgYW55O1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZGI6IFBvdWNoREIuRGF0YWJhc2U8VD4gPSA8UG91Y2hEQi5EYXRhYmFzZTxUPj5zZWxmLmRiO1xyXG4gICAgICByZXR1cm4gZGIuZ2V0KGlkKS50aGVuKChkb2M6IGFueSkgPT4ge1xyXG4gICAgICAgIGRvYy5fZGVsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGRiLnB1dChkb2MpO1xyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKHJlYXNvbikge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyBkZWxldGVBbGw8VCBleHRlbmRzIE1vZGVsPFQ+Pih0aGlzOiBuZXcgKCkgPT4gVCkge1xyXG4gICAgbGV0IHNlbGY6IHR5cGVvZiBNb2RlbCA9IHRoaXMgYXMgYW55O1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZGI6IFBvdWNoREIuRGF0YWJhc2U8VD4gPSA8UG91Y2hEQi5EYXRhYmFzZTxUPj5zZWxmLmRiO1xyXG4gICAgICBjb25zdCBpbmZvID0gYXdhaXQgZGIuaW5mbygpO1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYi5maW5kKHtcclxuICAgICAgICBzZWxlY3RvcjogeyBfaWQ6IHsgJGd0OiBudWxsIH0gfSxcclxuICAgICAgICBsaW1pdDogaW5mby5kb2NfY291bnRcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnN0IGRvY3NUb0RlbGV0ZSA9IF8ubWFwKHJlc3VsdC5kb2NzLCAoZG9jOiBhbnkpID0+IHtcclxuICAgICAgICBkb2MuX2RlbGV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBkb2M7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZGIuYnVsa0RvY3MoZG9jc1RvRGVsZXRlKTtcclxuICAgIH0gY2F0Y2ggKHJlYXNvbikge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBjaGFuZ2U8VCBleHRlbmRzIE1vZGVsPFQ+PihcclxuICAgIHRoaXM6IG5ldyAoKSA9PiBULFxyXG4gICAgb3B0aW9uczogUG91Y2hEQi5Db3JlLkNoYW5nZXNPcHRpb25zIHwgbnVsbFxyXG4gICkge1xyXG4gICAgbGV0IHNlbGY6IHR5cGVvZiBNb2RlbCA9IHRoaXMgYXMgYW55O1xyXG5cclxuICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlPFQ+ID0gPFBvdWNoREIuRGF0YWJhc2U8VD4+c2VsZi5kYjtcclxuICAgIGNvbnN0IG9wdCA9IHtcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgZmlsdGVyOiBgJHtzZWxmLl9fdHlwZW5hbWV9LyR7c2VsZi5fX3R5cGVuYW1lfWBcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGRiLmNoYW5nZXMob3B0KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDb250YWluZXIge1xyXG4gIHByaXZhdGUgZGI6IFBvdWNoREIuRGF0YWJhc2U7XHJcbiAgcHVibGljIGluZm86IFBvdWNoREIuQ29yZS5EYXRhYmFzZUluZm87XHJcbiAgcHVibGljIGRiTmFtZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBkYk9wdGlvbnM6IFBvdWNoREIuQ29uZmlndXJhdGlvbi5EYXRhYmFzZUNvbmZpZ3VyYXRpb247XHJcbiAgcHJpdmF0ZSBtb2RlbHM6IEFycmF5PHR5cGVvZiBNb2RlbD47XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG9wdGlvbnM/OiBQb3VjaERCLkNvbmZpZ3VyYXRpb24uRGF0YWJhc2VDb25maWd1cmF0aW9uXHJcbiAgKSB7XHJcbiAgICBjb25zb2xlLmxvZyhgUG91Y2hEYiBWZXJzaW9uICR7UG91Y2hEQi52ZXJzaW9ufWApO1xyXG4gICAgdGhpcy5kYk5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5kYk9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgdGhpcy5kYiA9IGNyZWF0ZURiKG5hbWUsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIHNhZmVQdXJnZSgpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5kYi5maW5kKHtcclxuICAgICAgICBzZWxlY3RvcjogeyBfaWQ6IHsgJGd0OiBudWxsIH0gfSxcclxuICAgICAgICBsaW1pdDogMVxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHJlc3VsdC5kb2NzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZGIuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuZGIgPSBjcmVhdGVEYih0aGlzLmRiTmFtZSwgdGhpcy5kYk9wdGlvbnMpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuYWRkTW9kZWxzSGFuZGxlcigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xyXG4gICAgICAgICAgb2s6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XHJcbiAgICAgIG9rOiB0cnVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjaGFuZ2Uob3B0aW9uczogUG91Y2hEQi5Db3JlLkNoYW5nZXNPcHRpb25zIHwgbnVsbCkge1xyXG4gICAgY29uc3QgZGI6IFBvdWNoREIuRGF0YWJhc2UgPSB0aGlzLmRiO1xyXG4gICAgcmV0dXJuIGRiLmNoYW5nZXMob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGFkZE1vZGVsc0hhbmRsZXIoKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHRoaXMuaW5mbyA9IGF3YWl0IHRoaXMuZGIuaW5mbygpO1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFxyXG4gICAgICBfLm1hcCh0aGlzLm1vZGVscywgKG1vZGVsOiBhbnkpID0+IHtcclxuICAgICAgICBtb2RlbC5kYiA9IHRoaXMuZGI7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyOiBhbnkgPSB7XHJcbiAgICAgICAgICBfaWQ6IGBfZGVzaWduLyR7bW9kZWwuX190eXBlbmFtZX1gLFxyXG4gICAgICAgICAgZmlsdGVyczoge31cclxuICAgICAgICB9O1xyXG4gICAgICAgIGZpbHRlci5maWx0ZXJzW1xyXG4gICAgICAgICAgbW9kZWwuX190eXBlbmFtZVxyXG4gICAgICAgIF0gPSBgZnVuY3Rpb24gKGRvYykgeyByZXR1cm4gZG9jLnR5cGVuYW1lX18gPT09ICcke1xyXG4gICAgICAgICAgbW9kZWwuX190eXBlbmFtZVxyXG4gICAgICAgIH0nIHx8IGRvYy5faWQgPT09ICcke2BfZGVzaWduLyR7bW9kZWwuX190eXBlbmFtZX1gfScgfWA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIuZ2V0KGBfZGVzaWduLyR7bW9kZWwuX190eXBlbmFtZX1gKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5kYi5wdXQoZmlsdGVyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgYWRkTW9kZWxzKG1vZGVsczogQXJyYXk8dHlwZW9mIE1vZGVsPik6IFByb21pc2U8YW55PiB7XHJcbiAgICB0aGlzLm1vZGVscyA9IG1vZGVscztcclxuICAgIHJldHVybiB0aGlzLmFkZE1vZGVsc0hhbmRsZXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBjbG9zZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRiLmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgY29tcGFjdCgpIHtcclxuICAgIHJldHVybiB0aGlzLmRiLmNvbXBhY3QoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBUeXBlTmFtZSA9ICh0eXBlTmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgcmV0dXJuICh0YXJnZXQ6IHR5cGVvZiBNb2RlbCkgPT4ge1xyXG4gICAgdGFyZ2V0Ll9fdHlwZW5hbWUgPSB0eXBlTmFtZTtcclxuICB9O1xyXG59O1xyXG4iXX0=