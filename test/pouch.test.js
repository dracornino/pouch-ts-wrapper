"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
var pouch_1 = require("../src/pouch");
var unit = "Unit";
var testing = "Testing";
var Unit = /** @class */ (function (_super) {
    __extends(Unit, _super);
    function Unit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Unit = __decorate([
        pouch_1.TypeName(unit)
    ], Unit);
    return Unit;
}(pouch_1.Model));
var Testing = /** @class */ (function (_super) {
    __extends(Testing, _super);
    function Testing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Testing = __decorate([
        pouch_1.TypeName(testing)
    ], Testing);
    return Testing;
}(pouch_1.Model));
test("Testing for decorators to identify a class", function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        expect(Unit.__typename).toBe(unit);
        expect(Testing.__typename).toBe(testing);
        return [2 /*return*/];
    });
}); });
test("Test the pouchdb container developed by hehena", function () { return __awaiter(_this, void 0, void 0, function () {
    var repository, unitModel, testingModel, res, docs, reason_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                repository = new pouch_1.Container("db_testing", {
                    ajax: { cache: false },
                    auth: {
                        username: "ambit",
                        password: "ambit"
                    },
                    adapter: "memory"
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 18, 19, 21]);
                return [4 /*yield*/, repository.addModels([Unit, Testing])];
            case 2:
                _a.sent();
                unitModel = { name: "Unit" };
                testingModel = { name: "Testing", date: new Date() };
                return [4 /*yield*/, Unit.insertOne(unitModel)];
            case 3:
                res = _a.sent();
                expect(res.ok).toBe(true);
                Unit.change({ since: "now", live: true, include_docs: true }).on("change", function (_info) {
                    // console.log(info);
                });
                return [4 /*yield*/, Unit.insertOne(unitModel)];
            case 4:
                res = _a.sent();
                expect(res.ok).toBe(true);
                return [4 /*yield*/, Testing.insertOne(testingModel)];
            case 5:
                res = _a.sent();
                expect(res.ok).toBe(true);
                return [4 /*yield*/, repository.safePurge()];
            case 6:
                res = _a.sent();
                expect(res.ok).toBe(false);
                return [4 /*yield*/, Unit.findAll({
                        selector: {
                            _id: { $gt: null }
                        }
                    })];
            case 7:
                docs = _a.sent();
                expect(docs.length).toBe(2);
                return [4 /*yield*/, Unit.deleteOne(docs[0]._id)];
            case 8:
                res = _a.sent();
                expect(res.ok).toBe(true);
                return [4 /*yield*/, Unit.deleteOne(docs[1]._id)];
            case 9:
                res = _a.sent();
                expect(res.ok).toBe(true);
                return [4 /*yield*/, Testing.findAll({
                        selector: {
                            _id: { $gt: null }
                        }
                    })];
            case 10:
                docs = _a.sent();
                expect(docs.length).toBe(1);
                return [4 /*yield*/, Testing.deleteOne(docs[0]._id)];
            case 11:
                res = _a.sent();
                expect(res.ok).toBe(true);
                return [4 /*yield*/, Testing.insertOne(testingModel)];
            case 12:
                res = _a.sent();
                expect(res.ok).toBe(true);
                return [4 /*yield*/, Testing.insertOne(testingModel)];
            case 13:
                res = _a.sent();
                expect(res.ok).toBe(true);
                return [4 /*yield*/, Testing.findAll({
                        selector: {
                            _id: { $gt: null }
                        }
                    })];
            case 14:
                docs = _a.sent();
                expect(docs.length).toBe(2);
                return [4 /*yield*/, Testing.deleteAll()];
            case 15:
                _a.sent();
                return [4 /*yield*/, Testing.findAll({
                        selector: {
                            _id: { $gt: null }
                        }
                    })];
            case 16:
                docs = _a.sent();
                expect(docs.length).toBe(0);
                return [4 /*yield*/, repository.safePurge()];
            case 17:
                res = _a.sent();
                expect(res.ok).toBe(true);
                return [3 /*break*/, 21];
            case 18:
                reason_1 = _a.sent();
                fail(reason_1.message);
                return [3 /*break*/, 21];
            case 19: return [4 /*yield*/, repository.close()];
            case 20:
                _a.sent();
                return [7 /*endfinally*/];
            case 21: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG91Y2gudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvdWNoLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQXdIQTs7QUF4SEEsZ0JBQWM7QUFDZCxzQ0FBMEQ7QUFFMUQsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDO0FBQ3BCLElBQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQztBQUcxQjtJQUFtQix3QkFBVztJQUE5Qjs7SUFHQSxDQUFDO0lBSEssSUFBSTtRQURULGdCQUFRLENBQUMsSUFBSSxDQUFDO09BQ1QsSUFBSSxDQUdUO0lBQUQsV0FBQztDQUFBLEFBSEQsQ0FBbUIsYUFBSyxHQUd2QjtBQUdEO0lBQXNCLDJCQUFjO0lBQXBDOztJQUlBLENBQUM7SUFKSyxPQUFPO1FBRFosZ0JBQVEsQ0FBQyxPQUFPLENBQUM7T0FDWixPQUFPLENBSVo7SUFBRCxjQUFDO0NBQUEsQUFKRCxDQUFzQixhQUFLLEdBSTFCO0FBRUQsSUFBSSxDQUFDLDRDQUE0QyxFQUFFOztRQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O0tBQzFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxnREFBZ0QsRUFBRTs7Ozs7Z0JBQ2pELFVBQVUsR0FBYyxJQUFJLGlCQUFTLENBQUMsWUFBWSxFQUFFO29CQUN0RCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO29CQUN0QixJQUFJLEVBQUU7d0JBQ0osUUFBUSxFQUFFLE9BQU87d0JBQ2pCLFFBQVEsRUFBRSxPQUFPO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUUsUUFBUTtpQkFDbEIsQ0FBQyxDQUFDOzs7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QUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Z0JBRTFCLElBQUksQ0FBQyxRQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7O3FCQUVyQixxQkFBTSxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUE7O2dCQUF4QixTQUF3QixDQUFDOzs7OztLQUU1QixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJqZXN0XCI7XHJcbmltcG9ydCB7IENvbnRhaW5lciwgTW9kZWwsIFR5cGVOYW1lIH0gZnJvbSBcIi4uL3NyYy9wb3VjaFwiO1xyXG5cclxuY29uc3QgdW5pdCA9IFwiVW5pdFwiO1xyXG5jb25zdCB0ZXN0aW5nID0gXCJUZXN0aW5nXCI7XHJcblxyXG5AVHlwZU5hbWUodW5pdClcclxuY2xhc3MgVW5pdCBleHRlbmRzIE1vZGVsPFVuaXQ+IHtcclxuICBfaWQ/OiBzdHJpbmc7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG59XHJcblxyXG5AVHlwZU5hbWUodGVzdGluZylcclxuY2xhc3MgVGVzdGluZyBleHRlbmRzIE1vZGVsPFRlc3Rpbmc+IHtcclxuICBfaWQ/OiBzdHJpbmc7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGRhdGU6IERhdGU7XHJcbn1cclxuXHJcbnRlc3QoXCJUZXN0aW5nIGZvciBkZWNvcmF0b3JzIHRvIGlkZW50aWZ5IGEgY2xhc3NcIiwgYXN5bmMgKCkgPT4ge1xyXG4gIGV4cGVjdChVbml0Ll9fdHlwZW5hbWUpLnRvQmUodW5pdCk7XHJcbiAgZXhwZWN0KFRlc3RpbmcuX190eXBlbmFtZSkudG9CZSh0ZXN0aW5nKTtcclxufSk7XHJcblxyXG50ZXN0KFwiVGVzdCB0aGUgcG91Y2hkYiBjb250YWluZXIgZGV2ZWxvcGVkIGJ5IGhlaGVuYVwiLCBhc3luYyAoKSA9PiB7XHJcbiAgbGV0IHJlcG9zaXRvcnk6IENvbnRhaW5lciA9IG5ldyBDb250YWluZXIoXCJkYl90ZXN0aW5nXCIsIHtcclxuICAgIGFqYXg6IHsgY2FjaGU6IGZhbHNlIH0sXHJcbiAgICBhdXRoOiB7XHJcbiAgICAgIHVzZXJuYW1lOiBcImFtYml0XCIsXHJcbiAgICAgIHBhc3N3b3JkOiBcImFtYml0XCJcclxuICAgIH0sXHJcbiAgICBhZGFwdGVyOiBcIm1lbW9yeVwiXHJcbiAgfSk7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IHJlcG9zaXRvcnkuYWRkTW9kZWxzKFtVbml0LCBUZXN0aW5nXSk7XHJcblxyXG4gICAgbGV0IHVuaXRNb2RlbDogVW5pdCA9IHsgbmFtZTogXCJVbml0XCIgfTtcclxuXHJcbiAgICBsZXQgdGVzdGluZ01vZGVsOiBUZXN0aW5nID0geyBuYW1lOiBcIlRlc3RpbmdcIiwgZGF0ZTogbmV3IERhdGUoKSB9O1xyXG5cclxuICAgIGxldCByZXMgPSBhd2FpdCBVbml0Lmluc2VydE9uZSh1bml0TW9kZWwpO1xyXG4gICAgZXhwZWN0KHJlcy5vaykudG9CZSh0cnVlKTtcclxuXHJcbiAgICBVbml0LmNoYW5nZSh7IHNpbmNlOiBcIm5vd1wiLCBsaXZlOiB0cnVlLCBpbmNsdWRlX2RvY3M6IHRydWUgfSkub24oXHJcbiAgICAgIFwiY2hhbmdlXCIsXHJcbiAgICAgIChfaW5mbzogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coaW5mbyk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgcmVzID0gYXdhaXQgVW5pdC5pbnNlcnRPbmUodW5pdE1vZGVsKTtcclxuXHJcbiAgICBleHBlY3QocmVzLm9rKS50b0JlKHRydWUpO1xyXG5cclxuICAgIHJlcyA9IGF3YWl0IFRlc3RpbmcuaW5zZXJ0T25lKHRlc3RpbmdNb2RlbCk7XHJcblxyXG4gICAgZXhwZWN0KHJlcy5vaykudG9CZSh0cnVlKTtcclxuXHJcbiAgICByZXMgPSBhd2FpdCByZXBvc2l0b3J5LnNhZmVQdXJnZSgpO1xyXG4gICAgZXhwZWN0KHJlcy5vaykudG9CZShmYWxzZSk7XHJcblxyXG4gICAgbGV0IGRvY3MgPSBhd2FpdCBVbml0LmZpbmRBbGwoe1xyXG4gICAgICBzZWxlY3Rvcjoge1xyXG4gICAgICAgIF9pZDogeyAkZ3Q6IG51bGwgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBleHBlY3QoZG9jcy5sZW5ndGgpLnRvQmUoMik7XHJcblxyXG4gICAgcmVzID0gYXdhaXQgVW5pdC5kZWxldGVPbmUoZG9jc1swXS5faWQpO1xyXG4gICAgZXhwZWN0KHJlcy5vaykudG9CZSh0cnVlKTtcclxuXHJcbiAgICByZXMgPSBhd2FpdCBVbml0LmRlbGV0ZU9uZShkb2NzWzFdLl9pZCk7XHJcbiAgICBleHBlY3QocmVzLm9rKS50b0JlKHRydWUpO1xyXG5cclxuICAgIGRvY3MgPSBhd2FpdCBUZXN0aW5nLmZpbmRBbGwoe1xyXG4gICAgICBzZWxlY3Rvcjoge1xyXG4gICAgICAgIF9pZDogeyAkZ3Q6IG51bGwgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBleHBlY3QoZG9jcy5sZW5ndGgpLnRvQmUoMSk7XHJcblxyXG4gICAgcmVzID0gYXdhaXQgVGVzdGluZy5kZWxldGVPbmUoZG9jc1swXS5faWQpO1xyXG4gICAgZXhwZWN0KHJlcy5vaykudG9CZSh0cnVlKTtcclxuXHJcbiAgICByZXMgPSBhd2FpdCBUZXN0aW5nLmluc2VydE9uZSh0ZXN0aW5nTW9kZWwpO1xyXG5cclxuICAgIGV4cGVjdChyZXMub2spLnRvQmUodHJ1ZSk7XHJcblxyXG4gICAgcmVzID0gYXdhaXQgVGVzdGluZy5pbnNlcnRPbmUodGVzdGluZ01vZGVsKTtcclxuXHJcbiAgICBleHBlY3QocmVzLm9rKS50b0JlKHRydWUpO1xyXG5cclxuICAgIGRvY3MgPSBhd2FpdCBUZXN0aW5nLmZpbmRBbGwoe1xyXG4gICAgICBzZWxlY3Rvcjoge1xyXG4gICAgICAgIF9pZDogeyAkZ3Q6IG51bGwgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBleHBlY3QoZG9jcy5sZW5ndGgpLnRvQmUoMik7XHJcblxyXG4gICAgYXdhaXQgVGVzdGluZy5kZWxldGVBbGwoKTtcclxuXHJcbiAgICBkb2NzID0gYXdhaXQgVGVzdGluZy5maW5kQWxsKHtcclxuICAgICAgc2VsZWN0b3I6IHtcclxuICAgICAgICBfaWQ6IHsgJGd0OiBudWxsIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZXhwZWN0KGRvY3MubGVuZ3RoKS50b0JlKDApO1xyXG5cclxuICAgIHJlcyA9IGF3YWl0IHJlcG9zaXRvcnkuc2FmZVB1cmdlKCk7XHJcbiAgICBleHBlY3QocmVzLm9rKS50b0JlKHRydWUpO1xyXG4gIH0gY2F0Y2ggKHJlYXNvbikge1xyXG4gICAgZmFpbChyZWFzb24ubWVzc2FnZSk7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIGF3YWl0IHJlcG9zaXRvcnkuY2xvc2UoKTtcclxuICB9XHJcbn0pO1xyXG4iXX0=