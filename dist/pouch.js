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
        this.db = wrapper_1.createDb(name, options);
    }
    Container.prototype.change = function (options) {
        var db = this.db;
        return db.changes(options);
    };
    Container.prototype.addModels = function (models) {
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
                        return [2 /*return*/, Promise.all(_.map(models, function (model) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG91Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcG91Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEJBQTRCO0FBQzVCLGlDQUFtQztBQUNuQyxxQ0FBcUM7QUFFckM7SUFBQTtJQXlIQSxDQUFDO0lBckhjLGFBQU8sR0FBcEIsVUFFRSxPQUFvQzs7OztnQkFFaEMsSUFBSSxHQUFpQixJQUFXLENBQUM7Z0JBQ3JDLElBQUk7b0JBQ0ksRUFBRSxHQUE2QyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUM3RCxPQUFPLENBQUMsUUFBUSxnQkFDWCxPQUFPLENBQUMsUUFBUSxJQUNuQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FDNUIsQ0FBQztvQkFFRixzQkFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7NEJBQ3BDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25DLENBQUMsQ0FBQyxFQUFDO2lCQUNKO2dCQUFDLE9BQU8sTUFBTSxFQUFFO29CQUNmLHNCQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUM7aUJBQy9COzs7O0tBQ0Y7SUFFWSxlQUFTLEdBQXRCLFVBRUUsUUFBaUQ7Ozs7Z0JBRTdDLElBQUksR0FBaUIsSUFBVyxDQUFDO2dCQUNyQyxJQUFJO29CQUNJLE9BQStDLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQzdELHNCQUFPLElBQUU7NkJBQ04sV0FBVyxDQUFDOzRCQUNYLEtBQUssRUFBRTtnQ0FDTCxNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7NkJBQ3ZCO3lCQUNGLENBQUM7NkJBQ0QsSUFBSSxDQUFDOzRCQUNKLElBQUksR0FBRyxHQUFRLFFBQVEsQ0FBQzs0QkFDeEIsR0FBRyxDQUFDLFVB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Q0FBQzs0QkFDTCxDQUFDLENBQUMsQ0FDSCxFQUFDOzs7O0tBQ0g7SUFFWSx5QkFBSyxHQUFsQjs7O2dCQUNFLHNCQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUM7OztLQUN4QjtJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQTVDRCxJQTRDQztBQTVDWSw4QkFBUztBQThDVCxRQUFBLFFBQVEsR0FBRyxVQUFDLFFBQWdCO0lBQ3ZDLE9BQU8sVUFBQyxNQUFvQjtRQUMxQixNQUFNLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0ICogYXMgUG91Y2hEQiBmcm9tIFwicG91Y2hkYlwiO1xyXG5pbXBvcnQgeyBjcmVhdGVEYiB9IGZyb20gXCIuL3dyYXBwZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNb2RlbDxUIGV4dGVuZHMgTW9kZWw8VD4+IHtcclxuICBwdWJsaWMgc3RhdGljIGRiOiBQb3VjaERCLkRhdGFiYXNlO1xyXG4gIHB1YmxpYyBzdGF0aWMgX190eXBlbmFtZTogc3RyaW5nO1xyXG5cclxuICBzdGF0aWMgYXN5bmMgZmluZEFsbDxUIGV4dGVuZHMgTW9kZWw8VD4+KFxyXG4gICAgdGhpczogbmV3ICgpID0+IFQsXHJcbiAgICByZXF1ZXN0OiBQb3VjaERCLkZpbmQuRmluZFJlcXVlc3Q8VD5cclxuICApOiBQcm9taXNlPEFycmF5PFQ+PiB7XHJcbiAgICBsZXQgc2VsZjogdHlwZW9mIE1vZGVsID0gdGhpcyBhcyBhbnk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICAgIHJlcXVlc3Quc2VsZWN0b3IgPSB7XHJcbiAgICAgICAgLi4ucmVxdWVzdC5zZWxlY3RvcixcclxuICAgICAgICB0eXBlbmFtZV9fOiBzZWxmLl9fdHlwZW5hbWVcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJldHVybiBkYi5maW5kKHJlcXVlc3QpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMuZG9jcyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAocmVhc29uKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIGluc2VydE9uZTxUIGV4dGVuZHMgTW9kZWw8VD4+KFxyXG4gICAgdGhpczogbmV3ICgpID0+IFQsXHJcbiAgICBkb2N1bWVudDogUG91Y2hEQi5Db3JlLlBvc3REb2N1bWVudDxUICYgTW9kZWw8VD4+XHJcbiAgKTogUHJvbWlzZTxQb3VjaERCLkNvcmUuUmVzcG9uc2U+IHtcclxuICAgIGxldCBzZWxmOiB0eXBlb2YgTW9kZWwgPSB0aGlzIGFzIGFueTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlPFQ+ID0gPFBvdWNoREIuRGF0YWJhc2U8VD4+c2VsZi5kYjtcclxuICAgICAgcmV0dXJuIGRiXHJcbiAgICAgICAgLmNyZWF0ZUluZGV4KHtcclxuICAgICAgICAgIGluZGV4OiB7XHJcbiAgICAgICAgICAgIGZpZWxkczogW1widHlwZW5hbWVfX1wiXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgbGV0IGRvYzogYW55ID0gZG9jdW1lbnQ7XHJcbiAgICAgICAgICBkb2MudHlwZW5hbWVfXyA9IHNlbGYuX190eXBlbmFtZTtcclxuICAgICAgICAgIHJldHVybiBkYi5wb3N0KGRvYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChyZWFzb24pIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgaW5zZXJ0TWFueTxUIGV4dGVuZHMgTW9kZWw8VD4+KFxyXG4gICAgdGhpczogbmV3ICgpID0+IFQsXHJcbiAgICBkb2N1bWVudHM6IEFycmF5PFBvdWNoREIuQ29yZS5QdXREb2N1bWVudDxUICYgTW9kZWw8VD4+PlxyXG4gICk6IFByb21pc2U8YW55PiB7XHJcbiAgICBsZXQgc2VsZjogdHlwZW9mIE1vZGVsID0gdGhpcyBhcyBhbnk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICAgIHJldHVybiBkYlxyXG4gICAgICAgIC5jcmVhdGVJbmRleCh7XHJcbiAgICAgICAgICBpbmRleDoge1xyXG4gICAgICAgICAgICBmaWVsZHM6IFtcInR5cGVuYW1lX19cIl1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIF8ubWFwKGRvY3VtZW50cywgKGRvYzogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGRvYy50eXBlbmFtZV9fID0gc2VsZi5fX3R5cGVuYW1lO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm4gZGIuYnVsa0RvY3MoZG9jdW1lbnRzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKHJlYXNvbikge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyB1cGRhdGVPbmU8VCBleHRlbmRzIE1vZGVsPFQ+PihcclxuICAgIHRoaXM6IG5ldyAoKSA9PiBULFxyXG4gICAgZG9jdW1lbnQ6IFBvdWNoREIuQ29yZS5Qb3N0RG9jdW1lbnQ8VCAmIE1vZGVsPFQ+PlxyXG4gICk6IFByb21pc2U8UG91Y2hEQi5Db3JlLlJlc3BvbnNlPiB7XHJcbiAgICBsZXQgc2VsZjogdHlwZW9mIE1vZGVsID0gdGhpcyBhcyBhbnk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICAgIHJldHVybiBkYlxyXG4gICAgICAgIC5jcmVhdGVJbmRleCh7XHJcbiAgICAgICAgICBpbmRleDoge1xyXG4gICAgICAgICAgICBmaWVsZHM6IFtcInR5cGVuYW1lX19cIl1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIGxldCBkb2M6IGFueSA9IGRvY3VtZW50O1xyXG4gICAgICAgICAgZG9jLnR5cGVuYW1lX18gPSBzZWxmLl9fdHlwZW5hbWU7XHJcbiAgICAgICAgICByZXR1cm4gZGIucHV0KGRvYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChyZWFzb24pIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgZGVsZXRlT25lPFQgZXh0ZW5kcyBNb2RlbDxUPj4odGhpczogbmV3ICgpID0+IFQsIGlkOiBzdHJpbmcpIHtcclxuICAgIGxldCBzZWxmOiB0eXBlb2YgTW9kZWwgPSB0aGlzIGFzIGFueTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlPFQ+ID0gPFBvdWNoREIuRGF0YWJhc2U8VD4+c2VsZi5kYjtcclxuICAgICAgcmV0dXJuIGRiLmdldChpZCkudGhlbigoZG9jOiBhbnkpID0+IHtcclxuICAgICAgICBkb2MuX2RlbGV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBkYi5wdXQoZG9jKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChyZWFzb24pIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY2hhbmdlPFQgZXh0ZW5kcyBNb2RlbDxUPj4oXHJcbiAgICB0aGlzOiBuZXcgKCkgPT4gVCxcclxuICAgIG9wdGlvbnM6IFBvdWNoREIuQ29yZS5DaGFuZ2VzT3B0aW9ucyB8IG51bGxcclxuICApIHtcclxuICAgIGxldCBzZWxmOiB0eXBlb2YgTW9kZWwgPSB0aGlzIGFzIGFueTtcclxuXHJcbiAgICBjb25zdCBkYjogUG91Y2hEQi5EYXRhYmFzZTxUPiA9IDxQb3VjaERCLkRhdGFiYXNlPFQ+PnNlbGYuZGI7XHJcbiAgICBjb25zdCBvcHQgPSB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIGZpbHRlcjogYCR7c2VsZi5fX3R5cGVuYW1lfS8ke3NlbGYuX190eXBlbmFtZX1gXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBkYi5jaGFuZ2VzKG9wdCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udGFpbmVyIHtcclxuICBwcml2YXRlIGRiOiBQb3VjaERCLkRhdGFiYXNlO1xyXG4gIHB1YmxpYyBpbmZvOiBQb3VjaERCLkNvcmUuRGF0YWJhc2VJbmZvO1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgb3B0aW9ucz86IFBvdWNoREIuQ29uZmlndXJhdGlvbi5EYXRhYmFzZUNvbmZpZ3VyYXRpb25cclxuICApIHtcclxuICAgIGNvbnNvbGUubG9nKGBQb3VjaERiIFZlcnNpb24gJHtQb3VjaERCLnZlcnNpb259YCk7XHJcbiAgICB0aGlzLmRiID0gY3JlYXRlRGIobmFtZSwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hhbmdlKG9wdGlvbnM6IFBvdWNoREIuQ29yZS5DaGFuZ2VzT3B0aW9ucyB8IG51bGwpIHtcclxuICAgIGNvbnN0IGRiOiBQb3VjaERCLkRhdGFiYXNlID0gdGhpcy5kYjtcclxuICAgIHJldHVybiBkYi5jaGFuZ2VzKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGFkZE1vZGVscyhtb2RlbHM6IEFycmF5PHR5cGVvZiBNb2RlbD4pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgdGhpcy5pbmZvID0gYXdhaXQgdGhpcy5kYi5pbmZvKCk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoXHJcbiAgICAgIF8ubWFwKG1vZGVscywgKG1vZGVsOiBhbnkpID0+IHtcclxuICAgICAgICBtb2RlbC5kYiA9IHRoaXMuZGI7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyOiBhbnkgPSB7XHJcbiAgICAgICAgICBfaWQ6IGBfZGVzaWduLyR7bW9kZWwuX190eXBlbmFtZX1gLFxyXG4gICAgICAgICAgZmlsdGVyczoge31cclxuICAgICAgICB9O1xyXG4gICAgICAgIGZpbHRlci5maWx0ZXJzW1xyXG4gICAgICAgICAgbW9kZWwuX190eXBlbmFtZVxyXG4gICAgICAgIF0gPSBgZnVuY3Rpb24gKGRvYykgeyByZXR1cm4gZG9jLnR5cGVuYW1lX18gPT09ICcke1xyXG4gICAgICAgICAgbW9kZWwuX190eXBlbmFtZVxyXG4gICAgICAgIH0nIHx8IGRvYy5faWQgPT09ICcke2BfZGVzaWduLyR7bW9kZWwuX190eXBlbmFtZX1gfScgfWA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIuZ2V0KGBfZGVzaWduLyR7bW9kZWwuX190eXBlbmFtZX1gKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5kYi5wdXQoZmlsdGVyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgY2xvc2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYi5jbG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFR5cGVOYW1lID0gKHR5cGVOYW1lOiBzdHJpbmcpID0+IHtcclxuICByZXR1cm4gKHRhcmdldDogdHlwZW9mIE1vZGVsKSA9PiB7XHJcbiAgICB0YXJnZXQuX190eXBlbmFtZSA9IHR5cGVOYW1lO1xyXG4gIH07XHJcbn07XHJcbiJdfQ==