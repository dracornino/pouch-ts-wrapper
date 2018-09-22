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
    return Container;
}());
exports.Container = Container;
exports.TypeName = function (typeName) {
    return function (target) {
        target.__typename = typeName;
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG91Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcG91Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEJBQTRCO0FBQzVCLGlDQUFtQztBQUNuQyxxQ0FBcUM7QUFFckM7SUFBQTtJQTRJQSxDQUFDO0lBeEljLGFBQU8sR0FBcEIsVUFFRSxPQUFvQzs7OztnQkFFaEMsSUFBSSxHQUFpQixJQUFXLENBQUM7Z0JBQ3JDLElBQUk7b0JBQ0ksRUFBRSxHQUE2QyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUM3RCxPQUFPLENBQUMsUUFBUSxnQkFDWCxPQUFPLENBQUMsUUFBUSxJQUNuQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FDNUIsQ0FBQztvQkFFRixzQkFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7NEJBQ3BDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25DLENBQUMsQ0FBQyxFQUFDO2lCQUNKO2dCQUFDLE9BQU8sTUFBTSxFQUFFO29CQUNmLHNCQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUM7aUJBQy9COzs7O0tBQ0Y7SUFFWSxlQUFTLEdBQXRCLFVBRUUsUUFBaUQ7Ozs7Z0JBRTdDLElBQUksR0FBaUIsSUFBVyxDQUFDO2dCQUNyQyxJQUFJO29CQUNJLE9BQStDLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQzdELHNCQUFPLElBQUU7NkJBQ04sV0FBVyxDQUFDOzRCQUNYLEtBQUssRUFBRTtnQ0FDTCxNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7NkJBQ3ZCO3lCQUNGLENBQUM7NkJBQ0QsSUFBSSxDQUFDOzRCQUNKLElBQUksR0FBRyxHQUFRLFFBQVEsQ0FBQzs0QkFDeEIsR0FBRyxDQUFDLFVB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NUIsS0FBSyxDQUFDLEVBQUUsR0FBRyxLQUFJLENBQUMsRUFBRSxDQUFDO2dDQUNuQixJQUFNLE1BQU0sR0FBUTtvQ0FDbEIsR0FBRyxFQUFFLGFBQVcsS0FBSyxDQUFDLFVBQVk7b0NBQ2xDLE9BQU8sRUFBRSxFQUFFO2lDQUNaLENBQUM7Z0NBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FDWixLQUFLLENBQUMsVUFBVSxDQUNqQixHQUFHLGlEQUNGLEtBQUssQ0FBQyxVQUFVLDJCQUNHLGFBQVcsS0FBSyxDQUFDLFVBQVksU0FBSyxDQUFDO2dDQUN4RCxPQUFPLEtBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGFBQVcsS0FBSyxDQUFDLFVBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQztvQ0FDdEQsT0FBTyxLQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDN0IsQ0FBQyxDQUFDLENBQUM7NEJBQ0wsQ0FBQyxDQUFDLENBQ0gsRUFBQzs7OztLQUNIO0lBRVksNkJBQVMsR0FBdEIsVUFBdUIsTUFBMkI7OztnQkFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ3JCLHNCQUFPLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFDOzs7S0FDaEM7SUFFWSx5QkFBSyxHQUFsQjs7O2dCQUNFLHNCQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUM7OztLQUN4QjtJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQTdFRCxJQTZFQztBQTdFWSw4QkFBUztBQStFVCxRQUFBLFFBQVEsR0FBRyxVQUFDLFFBQWdCO0lBQ3ZDLE9BQU8sVUFBQyxNQUFvQjtRQUMxQixNQUFNLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0ICogYXMgUG91Y2hEQiBmcm9tIFwicG91Y2hkYlwiO1xyXG5pbXBvcnQgeyBjcmVhdGVEYiB9IGZyb20gXCIuL3dyYXBwZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNb2RlbDxUIGV4dGVuZHMgTW9kZWw8VD4+IHtcclxuICBwdWJsaWMgc3RhdGljIGRiOiBQb3VjaERCLkRhdGFiYXNlO1xyXG4gIHB1YmxpYyBzdGF0aWMgX190eXBlbmFtZTogc3RyaW5nO1xyXG5cclxuICBzdGF0aWMgYXN5bmMgZmluZEFsbDxUIGV4dGVuZHMgTW9kZWw8VD4+KFxyXG4gICAgdGhpczogbmV3ICgpID0+IFQsXHJcbiAgICByZXF1ZXN0OiBQb3VjaERCLkZpbmQuRmluZFJlcXVlc3Q8VD5cclxuICApOiBQcm9taXNlPEFycmF5PFQ+PiB7XHJcbiAgICBsZXQgc2VsZjogdHlwZW9mIE1vZGVsID0gdGhpcyBhcyBhbnk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICAgIHJlcXVlc3Quc2VsZWN0b3IgPSB7XHJcbiAgICAgICAgLi4ucmVxdWVzdC5zZWxlY3RvcixcclxuICAgICAgICB0eXBlbmFtZV9fOiBzZWxmLl9fdHlwZW5hbWVcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJldHVybiBkYi5maW5kKHJlcXVlc3QpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMuZG9jcyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAocmVhc29uKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIGluc2VydE9uZTxUIGV4dGVuZHMgTW9kZWw8VD4+KFxyXG4gICAgdGhpczogbmV3ICgpID0+IFQsXHJcbiAgICBkb2N1bWVudDogUG91Y2hEQi5Db3JlLlBvc3REb2N1bWVudDxUICYgTW9kZWw8VD4+XHJcbiAgKTogUHJvbWlzZTxQb3VjaERCLkNvcmUuUmVzcG9uc2U+IHtcclxuICAgIGxldCBzZWxmOiB0eXBlb2YgTW9kZWwgPSB0aGlzIGFzIGFueTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlPFQ+ID0gPFBvdWNoREIuRGF0YWJhc2U8VD4+c2VsZi5kYjtcclxuICAgICAgcmV0dXJuIGRiXHJcbiAgICAgICAgLmNyZWF0ZUluZGV4KHtcclxuICAgICAgICAgIGluZGV4OiB7XHJcbiAgICAgICAgICAgIGZpZWxkczogW1widHlwZW5hbWVfX1wiXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgbGV0IGRvYzogYW55ID0gZG9jdW1lbnQ7XHJcbiAgICAgICAgICBkb2MudHlwZW5hbWVfXyA9IHNlbGYuX190eXBlbmFtZTtcclxuICAgICAgICAgIHJldHVybiBkYi5wb3N0KGRvYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChyZWFzb24pIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgaW5zZXJ0TWFueTxUIGV4dGVuZHMgTW9kZWw8VD4+KFxyXG4gICAgdGhpczogbmV3ICgpID0+IFQsXHJcbiAgICBkb2N1bWVudHM6IEFycmF5PFBvdWNoREIuQ29yZS5QdXREb2N1bWVudDxUICYgTW9kZWw8VD4+PlxyXG4gICk6IFByb21pc2U8YW55PiB7XHJcbiAgICBsZXQgc2VsZjogdHlwZW9mIE1vZGVsID0gdGhpcyBhcyBhbnk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICAgIHJldHVybiBkYlxyXG4gICAgICAgIC5jcmVhdGVJbmRleCh7XHJcbiAgICAgICAgICBpbmRleDoge1xyXG4gICAgICAgICAgICBmaWVsZHM6IFtcInR5cGVuYW1lX19cIl1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIF8ubWFwKGRvY3VtZW50cywgKGRvYzogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGRvYy50eXBlbmFtZV9fID0gc2VsZi5fX3R5cGVuYW1lO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm4gZGIuYnVsa0RvY3MoZG9jdW1lbnRzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKHJlYXNvbikge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyB1cGRhdGVPbmU8VCBleHRlbmRzIE1vZGVsPFQ+PihcclxuICAgIHRoaXM6IG5ldyAoKSA9PiBULFxyXG4gICAgZG9jdW1lbnQ6IFBvdWNoREIuQ29yZS5Qb3N0RG9jdW1lbnQ8VCAmIE1vZGVsPFQ+PlxyXG4gICk6IFByb21pc2U8UG91Y2hEQi5Db3JlLlJlc3BvbnNlPiB7XHJcbiAgICBsZXQgc2VsZjogdHlwZW9mIE1vZGVsID0gdGhpcyBhcyBhbnk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICAgIHJldHVybiBkYlxyXG4gICAgICAgIC5jcmVhdGVJbmRleCh7XHJcbiAgICAgICAgICBpbmRleDoge1xyXG4gICAgICAgICAgICBmaWVsZHM6IFtcInR5cGVuYW1lX19cIl1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIGxldCBkb2M6IGFueSA9IGRvY3VtZW50O1xyXG4gICAgICAgICAgZG9jLnR5cGVuYW1lX18gPSBzZWxmLl9fdHlwZW5hbWU7XHJcbiAgICAgICAgICByZXR1cm4gZGIucHV0KGRvYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChyZWFzb24pIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgZGVsZXRlT25lPFQgZXh0ZW5kcyBNb2RlbDxUPj4odGhpczogbmV3ICgpID0+IFQsIGlkOiBzdHJpbmcpIHtcclxuICAgIGxldCBzZWxmOiB0eXBlb2YgTW9kZWwgPSB0aGlzIGFzIGFueTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlPFQ+ID0gPFBvdWNoREIuRGF0YWJhc2U8VD4+c2VsZi5kYjtcclxuICAgICAgcmV0dXJuIGRiLmdldChpZCkudGhlbigoZG9jOiBhbnkpID0+IHtcclxuICAgICAgICBkb2MuX2RlbGV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBkYi5wdXQoZG9jKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChyZWFzb24pIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgZGVsZXRlQWxsPFQgZXh0ZW5kcyBNb2RlbDxUPj4odGhpczogbmV3ICgpID0+IFQpIHtcclxuICAgIGxldCBzZWxmOiB0eXBlb2YgTW9kZWwgPSB0aGlzIGFzIGFueTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlPFQ+ID0gPFBvdWNoREIuRGF0YWJhc2U8VD4+c2VsZi5kYjtcclxuICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IGRiLmluZm8oKTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIuZmluZCh7XHJcbiAgICAgICAgc2VsZWN0b3I6IHsgX2lkOiB7ICRndDogbnVsbCB9IH0sXHJcbiAgICAgICAgbGltaXQ6IGluZm8uZG9jX2NvdW50XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCBkb2NzVG9EZWxldGUgPSBfLm1hcChyZXN1bHQuZG9jcywgKGRvYzogYW55KSA9PiB7XHJcbiAgICAgICAgZG9jLl9kZWxldGVkID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZG9jO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGRiLmJ1bGtEb2NzKGRvY3NUb0RlbGV0ZSk7XHJcbiAgICB9IGNhdGNoIChyZWFzb24pIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY2hhbmdlPFQgZXh0ZW5kcyBNb2RlbDxUPj4oXHJcbiAgICB0aGlzOiBuZXcgKCkgPT4gVCxcclxuICAgIG9wdGlvbnM6IFBvdWNoREIuQ29yZS5DaGFuZ2VzT3B0aW9ucyB8IG51bGxcclxuICApIHtcclxuICAgIGxldCBzZWxmOiB0eXBlb2YgTW9kZWwgPSB0aGlzIGFzIGFueTtcclxuXHJcbiAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICBjb25zdCBvcHQgPSB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIGZpbHRlcjogYCR7c2VsZi5fX3R5cGVuYW1lfS8ke3NlbGYuX190eXBlbmFtZX1gXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBkYi5jaGFuZ2VzKG9wdCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udGFpbmVyIHtcclxuICBwcml2YXRlIGRiOiBQb3VjaERCLkRhdGFiYXNlO1xyXG4gIHB1YmxpYyBpbmZvOiBQb3VjaERCLkNvcmUuRGF0YWJhc2VJbmZvO1xyXG4gIHB1YmxpYyBkYk5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgZGJPcHRpb25zOiBQb3VjaERCLkNvbmZpZ3VyYXRpb24uRGF0YWJhc2VDb25maWd1cmF0aW9uO1xyXG4gIHByaXZhdGUgbW9kZWxzOiBBcnJheTx0eXBlb2YgTW9kZWw+O1xyXG4gIC8qKlxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zPzogUG91Y2hEQi5Db25maWd1cmF0aW9uLkRhdGFiYXNlQ29uZmlndXJhdGlvblxyXG4gICkge1xyXG4gICAgY29uc29sZS5sb2coYFBvdWNoRGIgVmVyc2lvbiAke1BvdWNoREIudmVyc2lvbn1gKTtcclxuICAgIHRoaXMuZGJOYW1lID0gbmFtZTtcclxuICAgIHRoaXMuZGJPcHRpb25zID0gb3B0aW9ucztcclxuICAgIHRoaXMuZGIgPSBjcmVhdGVEYihuYW1lLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBzYWZlUHVyZ2UoKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuZGIuZmluZCh7XHJcbiAgICAgICAgc2VsZWN0b3I6IHsgX2lkOiB7ICRndDogbnVsbCB9IH0sXHJcbiAgICAgICAgbGltaXQ6IDFcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChyZXN1bHQuZG9jcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICBhd2FpdCB0aGlzLmRiLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLmRiID0gY3JlYXRlRGIodGhpcy5kYk5hbWUsIHRoaXMuZGJPcHRpb25zKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmFkZE1vZGVsc0hhbmRsZXIoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcclxuICAgICAgICAgIG9rOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xyXG4gICAgICBvazogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hhbmdlKG9wdGlvbnM6IFBvdWNoREIuQ29yZS5DaGFuZ2VzT3B0aW9ucyB8IG51bGwpIHtcclxuICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlID0gdGhpcy5kYjtcclxuICAgIHJldHVybiBkYi5jaGFuZ2VzKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBhZGRNb2RlbHNIYW5kbGVyKCk6IFByb21pc2U8YW55PiB7XHJcbiAgICB0aGlzLmluZm8gPSBhd2FpdCB0aGlzLmRiLmluZm8oKTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChcclxuICAgICAgXy5tYXAodGhpcy5tb2RlbHMsIChtb2RlbDogYW55KSA9PiB7XHJcbiAgICAgICAgbW9kZWwuZGIgPSB0aGlzLmRiO1xyXG4gICAgICAgIGNvbnN0IGZpbHRlcjogYW55ID0ge1xyXG4gICAgICAgICAgX2lkOiBgX2Rlc2lnbi8ke21vZGVsLl9fdHlwZW5hbWV9YCxcclxuICAgICAgICAgIGZpbHRlcnM6IHt9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmaWx0ZXIuZmlsdGVyc1tcclxuICAgICAgICAgIG1vZGVsLl9fdHlwZW5hbWVcclxuICAgICAgICBdID0gYGZ1bmN0aW9uIChkb2MpIHsgcmV0dXJuIGRvYy50eXBlbmFtZV9fID09PSAnJHtcclxuICAgICAgICAgIG1vZGVsLl9fdHlwZW5hbWVcclxuICAgICAgICB9JyB8fCBkb2MuX2lkID09PSAnJHtgX2Rlc2lnbi8ke21vZGVsLl9fdHlwZW5hbWV9YH0nIH1gO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRiLmdldChgX2Rlc2lnbi8ke21vZGVsLl9fdHlwZW5hbWV9YCkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGIucHV0KGZpbHRlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGFkZE1vZGVscyhtb2RlbHM6IEFycmF5PHR5cGVvZiBNb2RlbD4pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgdGhpcy5tb2RlbHMgPSBtb2RlbHM7XHJcbiAgICByZXR1cm4gdGhpcy5hZGRNb2RlbHNIYW5kbGVyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgY2xvc2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYi5jbG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFR5cGVOYW1lID0gKHR5cGVOYW1lOiBzdHJpbmcpID0+IHtcclxuICByZXR1cm4gKHRhcmdldDogdHlwZW9mIE1vZGVsKSA9PiB7XHJcbiAgICB0YXJnZXQuX190eXBlbmFtZSA9IHR5cGVOYW1lO1xyXG4gIH07XHJcbn07XHJcbiJdfQ==