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
const unit = "Unit";
const testing = "Testing";
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
    let repository = new pouch_1.Container("DB_TESTING", {
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
        Unit.change({ since: "now", live: true, include_docs: true }).on("change", (info) => {
            console.log(info);
        });
        res = yield Unit.insertOne(unitModel);
        expect(res.ok).toBe(true);
        res = yield Testing.insertOne(testingModel);
        expect(res.ok).toBe(true);
        let docs = yield Unit.findAll({
            selector: {
                _id: { "$gt": null }
            }
        });
        expect(docs.length).toBe(2);
        res = yield Unit.deleteOne(docs[0]._id);
        expect(res.ok).toBe(true);
        res = yield Unit.deleteOne(docs[1]._id);
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
    finally {
        yield repository.close();
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG91Y2gudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvdWNoLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdCQUFjO0FBQ2Qsd0NBQTBEO0FBRzFELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNwQixNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUM7QUFHMUIsSUFBTSxJQUFJLEdBQVYsVUFBVyxTQUFRLGFBQVc7Q0FHN0IsQ0FBQTtBQUhLLElBQUk7SUFEVCxnQkFBUSxDQUFDLElBQUksQ0FBQztHQUNULElBQUksQ0FHVDtBQUdELElBQU0sT0FBTyxHQUFiLGFBQWMsU0FBUSxhQUFjO0NBSW5DLENBQUE7QUFKSyxPQUFPO0lBRFosZ0JBQVEsQ0FBQyxPQUFPLENBQUM7R0FDWixPQUFPLENBSVo7QUFFRCxJQUFJLENBQUMsNENBQTRDLEVBQUUsR0FBUyxFQUFFO0lBQzFELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFHSCxJQUFJLENBQUMsZ0RBQWdELEVBQUUsR0FBUyxFQUFFO0lBQzlELElBQUksVUFBVSxHQUFjLElBQUksaUJBQVMsQ0FBQyxZQUFZLEVBQUU7UUFDcEQsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtRQUN0QixJQUFJLEVBQUU7WUFDRixRQUFRLEVBQUUsT0FBTztZQUNqQixRQUFRLEVBQUUsT0FBTztTQUNwQjtLQUNKLENBQUMsQ0FBQztJQUNILElBQUk7UUFDQSxNQUFNLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUU1QyxJQUFJLFNBQVMsR0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUV2QyxJQUFJLFlBQVksR0FBWSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUVsRSxJQUFJLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUNyRSxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVQLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUIsR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU1QyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUxQixJQUFJLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDMUIsUUFBUSxFQUFFO2dCQUNOLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7YUFDdkI7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUc1QixHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUxQixHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUcxQixJQUFJLEdBQUcsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ3pCLFFBQVEsRUFBRTtnQkFDTixHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2FBQ3ZCO1NBQ0osQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUIsR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FHN0I7SUFBQyxPQUFPLE1BQU0sRUFBRTtRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDeEI7WUFBUztRQUNOLE1BQU0sVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQzVCO0FBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcImplc3RcIjtcclxuaW1wb3J0IHsgQ29udGFpbmVyLCBNb2RlbCwgVHlwZU5hbWUgfSBmcm9tIFwiLi4vc3JjL3BvdWNoXCI7XHJcblxyXG5cclxuY29uc3QgdW5pdCA9IFwiVW5pdFwiO1xyXG5jb25zdCB0ZXN0aW5nID0gXCJUZXN0aW5nXCI7XHJcblxyXG5AVHlwZU5hbWUodW5pdClcclxuY2xhc3MgVW5pdCBleHRlbmRzIE1vZGVsPFVuaXQ+e1xyXG4gICAgX2lkPzogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG59XHJcblxyXG5AVHlwZU5hbWUodGVzdGluZylcclxuY2xhc3MgVGVzdGluZyBleHRlbmRzIE1vZGVsPFRlc3Rpbmc+e1xyXG4gICAgX2lkPzogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZGF0ZTogRGF0ZTtcclxufVxyXG5cclxudGVzdChcIlRlc3RpbmcgZm9yIGRlY29yYXRvcnMgdG8gaWRlbnRpZnkgYSBjbGFzc1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgICBleHBlY3QoVW5pdC5fX3R5cGVuYW1lKS50b0JlKHVuaXQpO1xyXG4gICAgZXhwZWN0KFRlc3RpbmcuX190eXBlbmFtZSkudG9CZSh0ZXN0aW5nKTtcclxufSk7XHJcblxyXG5cclxudGVzdChcIlRlc3QgdGhlIHBvdWNoZGIgY29udGFpbmVyIGRldmVsb3BlZCBieSBoZWhlbmFcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IHJlcG9zaXRvcnk6IENvbnRhaW5lciA9IG5ldyBDb250YWluZXIoXCJEQl9URVNUSU5HXCIsIHtcclxuICAgICAgICBhamF4OiB7IGNhY2hlOiBmYWxzZSB9LFxyXG4gICAgICAgIGF1dGg6IHtcclxuICAgICAgICAgICAgdXNlcm5hbWU6IFwiYW1iaXRcIixcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IFwiYW1iaXRcIlxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCByZXBvc2l0b3J5LmFkZE1vZGVscyhbVW5pdCwgVGVzdGluZ10pO1xyXG5cclxuICAgICAgICBsZXQgdW5pdE1vZGVsOiBVbml0ID0geyBuYW1lOiBcIlVuaXRcIiB9O1xyXG5cclxuICAgICAgICBsZXQgdGVzdGluZ01vZGVsOiBUZXN0aW5nID0geyBuYW1lOiBcIlRlc3RpbmdcIiwgZGF0ZTogbmV3IERhdGUoKSB9O1xyXG5cclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgVW5pdC5pbnNlcnRPbmUodW5pdE1vZGVsKTtcclxuICAgICAgICBleHBlY3QocmVzLm9rKS50b0JlKHRydWUpO1xyXG5cclxuICAgICAgICBVbml0LmNoYW5nZSh7IHNpbmNlOiBcIm5vd1wiLCBsaXZlOiB0cnVlLCBpbmNsdWRlX2RvY3M6IHRydWUgfSkub24oXCJjaGFuZ2VcIixcclxuICAgICAgICAgICAgKGluZm86IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5mbyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXMgPSBhd2FpdCBVbml0Lmluc2VydE9uZSh1bml0TW9kZWwpO1xyXG5cclxuICAgICAgICBleHBlY3QocmVzLm9rKS50b0JlKHRydWUpO1xyXG5cclxuICAgICAgICByZXMgPSBhd2FpdCBUZXN0aW5nLmluc2VydE9uZSh0ZXN0aW5nTW9kZWwpO1xyXG5cclxuICAgICAgICBleHBlY3QocmVzLm9rKS50b0JlKHRydWUpO1xyXG5cclxuICAgICAgICBsZXQgZG9jcyA9IGF3YWl0IFVuaXQuZmluZEFsbCh7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yOiB7XHJcbiAgICAgICAgICAgICAgICBfaWQ6IHsgXCIkZ3RcIjogbnVsbCB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZXhwZWN0KGRvY3MubGVuZ3RoKS50b0JlKDIpO1xyXG5cclxuXHJcbiAgICAgICAgcmVzID0gYXdhaXQgVW5pdC5kZWxldGVPbmUoZG9jc1swXS5faWQpO1xyXG4gICAgICAgIGV4cGVjdChyZXMub2spLnRvQmUodHJ1ZSk7XHJcblxyXG4gICAgICAgIHJlcyA9IGF3YWl0IFVuaXQuZGVsZXRlT25lKGRvY3NbMV0uX2lkKTtcclxuICAgICAgICBleHBlY3QocmVzLm9rKS50b0JlKHRydWUpO1xyXG5cclxuXHJcbiAgICAgICAgZG9jcyA9IGF3YWl0IFRlc3RpbmcuZmluZEFsbCh7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yOiB7XHJcbiAgICAgICAgICAgICAgICBfaWQ6IHsgXCIkZ3RcIjogbnVsbCB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZXhwZWN0KGRvY3MubGVuZ3RoKS50b0JlKDEpO1xyXG5cclxuICAgICAgICByZXMgPSBhd2FpdCBUZXN0aW5nLmRlbGV0ZU9uZShkb2NzWzBdLl9pZCk7XHJcbiAgICAgICAgZXhwZWN0KHJlcy5vaykudG9CZSh0cnVlKTtcclxuXHJcblxyXG4gICAgfSBjYXRjaCAocmVhc29uKSB7XHJcbiAgICAgICAgZmFpbChyZWFzb24ubWVzc2FnZSk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIGF3YWl0IHJlcG9zaXRvcnkuY2xvc2UoKTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==