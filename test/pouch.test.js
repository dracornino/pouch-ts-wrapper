"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const pouch_1 = require("../src/pouch");
const unit = "**Unit**";
const testing = "**Testing**";
let Unit = class Unit extends pouch_1.Model {
};
Unit = __decorate([
    pouch_1.TypeName(unit)
], Unit);
let Testing = class Testing extends pouch_1.Model {
};
Testing = __decorate([
    pouch_1.TypeName(testing)
], Testing);
test("Testing for decorators to identify a class", () => __awaiter(this, void 0, void 0, function* () {
    expect(Unit.__typename).toBe(unit);
    expect(Testing.__typename).toBe(testing);
}));
test("Test the pouchdb container developed by hehena", () => __awaiter(this, void 0, void 0, function* () {
    let repository = new pouch_1.Container("db_testing", {
        ajax: { cache: false },
        auth: {
            username: "ambit",
            password: "ambit"
        }
    });
    try {
        yield repository.addModels([Unit, Testing]);
        let unitModel = { name: "Unit" };
        let testingModel = { name: "Testing", date: new Date() };
        let res = yield Unit.insertOne(unitModel);
        expect(res.ok).toBe(true);
        console.log(res);
        res = yield Testing.insertOne(testingModel);
        expect(res.ok).toBe(true);
        let docs = yield Unit.findAll({
            selector: {
                _id: { "$gt": null }
            }
        });
        expect(docs.length).toBe(1);
        res = yield Unit.deleteOne(docs[0]._id);
        expect(res.ok).toBe(true);
        docs = yield Testing.findAll({
            selector: {
                _id: { "$gt": null }
            }
        });
        expect(docs.length).toBe(1);
        res = yield Testing.deleteOne(docs[0]._id);
        expect(res.ok).toBe(true);
    }
    catch (reason) {
        fail(reason.message);
    }
}));
//# sourceMappingURL=pouch.test.js.map