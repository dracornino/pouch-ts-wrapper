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
        },
        adapter: "memory"
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
                _id: { $gt: null }
            }
        });
        expect(docs.length).toBe(2);
        res = yield Unit.deleteOne(docs[0]._id);
        expect(res.ok).toBe(true);
        res = yield Unit.deleteOne(docs[1]._id);
        expect(res.ok).toBe(true);
        docs = yield Testing.findAll({
            selector: {
                _id: { $gt: null }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG91Y2gudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvdWNoLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdCQUFjO0FBQ2Qsd0NBQTBEO0FBRTFELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNwQixNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUM7QUFHMUIsSUFBTSxJQUFJLEdBQVYsVUFBVyxTQUFRLGFBQVc7Q0FHN0IsQ0FBQTtBQUhLLElBQUk7SUFEVCxnQkFBUSxDQUFDLElBQUksQ0FBQztHQUNULElBQUksQ0FHVDtBQUdELElBQU0sT0FBTyxHQUFiLGFBQWMsU0FBUSxhQUFjO0NBSW5DLENBQUE7QUFKSyxPQUFPO0lBRFosZ0JBQVEsQ0FBQyxPQUFPLENBQUM7R0FDWixPQUFPLENBSVo7QUFFRCxJQUFJLENBQUMsNENBQTRDLEVBQUUsR0FBUyxFQUFFO0lBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsZ0RBQWdELEVBQUUsR0FBUyxFQUFFO0lBQ2hFLElBQUksVUFBVSxHQUFjLElBQUksaUJBQVMsQ0FBQyxZQUFZLEVBQUU7UUFDdEQsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtRQUN0QixJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUUsT0FBTztZQUNqQixRQUFRLEVBQUUsT0FBTztTQUNsQjtRQUNELE9BQU8sRUFBRSxRQUFRO0tBQ2xCLENBQUMsQ0FBQztJQUNILElBQUk7UUFDRixNQUFNLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUU1QyxJQUFJLFNBQVMsR0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUV2QyxJQUFJLFlBQVksR0FBWSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUVsRSxJQUFJLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQzlELFFBQVEsRUFDUixDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQ0YsQ0FBQztRQUVGLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUIsR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU1QyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUxQixJQUFJLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDNUIsUUFBUSxFQUFFO2dCQUNSLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7YUFDbkI7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1QixHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUxQixHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUxQixJQUFJLEdBQUcsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQzNCLFFBQVEsRUFBRTtnQkFDUixHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO2FBQ25CO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUIsR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0I7SUFBQyxPQUFPLE1BQU0sRUFBRTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdEI7WUFBUztRQUNSLE1BQU0sVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQzFCO0FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcImplc3RcIjtcclxuaW1wb3J0IHsgQ29udGFpbmVyLCBNb2RlbCwgVHlwZU5hbWUgfSBmcm9tIFwiLi4vc3JjL3BvdWNoXCI7XHJcblxyXG5jb25zdCB1bml0ID0gXCJVbml0XCI7XHJcbmNvbnN0IHRlc3RpbmcgPSBcIlRlc3RpbmdcIjtcclxuXHJcbkBUeXBlTmFtZSh1bml0KVxyXG5jbGFzcyBVbml0IGV4dGVuZHMgTW9kZWw8VW5pdD4ge1xyXG4gIF9pZD86IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbkBUeXBlTmFtZSh0ZXN0aW5nKVxyXG5jbGFzcyBUZXN0aW5nIGV4dGVuZHMgTW9kZWw8VGVzdGluZz4ge1xyXG4gIF9pZD86IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgZGF0ZTogRGF0ZTtcclxufVxyXG5cclxudGVzdChcIlRlc3RpbmcgZm9yIGRlY29yYXRvcnMgdG8gaWRlbnRpZnkgYSBjbGFzc1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgZXhwZWN0KFVuaXQuX190eXBlbmFtZSkudG9CZSh1bml0KTtcclxuICBleHBlY3QoVGVzdGluZy5fX3R5cGVuYW1lKS50b0JlKHRlc3RpbmcpO1xyXG59KTtcclxuXHJcbnRlc3QoXCJUZXN0IHRoZSBwb3VjaGRiIGNvbnRhaW5lciBkZXZlbG9wZWQgYnkgaGVoZW5hXCIsIGFzeW5jICgpID0+IHtcclxuICBsZXQgcmVwb3NpdG9yeTogQ29udGFpbmVyID0gbmV3IENvbnRhaW5lcihcIkRCX1RFU1RJTkdcIiwge1xyXG4gICAgYWpheDogeyBjYWNoZTogZmFsc2UgfSxcclxuICAgIGF1dGg6IHtcclxuICAgICAgdXNlcm5hbWU6IFwiYW1iaXRcIixcclxuICAgICAgcGFzc3dvcmQ6IFwiYW1iaXRcIlxyXG4gICAgfSxcclxuICAgIGFkYXB0ZXI6IFwibWVtb3J5XCJcclxuICB9KTtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgcmVwb3NpdG9yeS5hZGRNb2RlbHMoW1VuaXQsIFRlc3RpbmddKTtcclxuXHJcbiAgICBsZXQgdW5pdE1vZGVsOiBVbml0ID0geyBuYW1lOiBcIlVuaXRcIiB9O1xyXG5cclxuICAgIGxldCB0ZXN0aW5nTW9kZWw6IFRlc3RpbmcgPSB7IG5hbWU6IFwiVGVzdGluZ1wiLCBkYXRlOiBuZXcgRGF0ZSgpIH07XHJcblxyXG4gICAgbGV0IHJlcyA9IGF3YWl0IFVuaXQuaW5zZXJ0T25lKHVuaXRNb2RlbCk7XHJcbiAgICBleHBlY3QocmVzLm9rKS50b0JlKHRydWUpO1xyXG5cclxuICAgIFVuaXQuY2hhbmdlKHsgc2luY2U6IFwibm93XCIsIGxpdmU6IHRydWUsIGluY2x1ZGVfZG9jczogdHJ1ZSB9KS5vbihcclxuICAgICAgXCJjaGFuZ2VcIixcclxuICAgICAgKGluZm86IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGluZm8pO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIHJlcyA9IGF3YWl0IFVuaXQuaW5zZXJ0T25lKHVuaXRNb2RlbCk7XHJcblxyXG4gICAgZXhwZWN0KHJlcy5vaykudG9CZSh0cnVlKTtcclxuXHJcbiAgICByZXMgPSBhd2FpdCBUZXN0aW5nLmluc2VydE9uZSh0ZXN0aW5nTW9kZWwpO1xyXG5cclxuICAgIGV4cGVjdChyZXMub2spLnRvQmUodHJ1ZSk7XHJcblxyXG4gICAgbGV0IGRvY3MgPSBhd2FpdCBVbml0LmZpbmRBbGwoe1xyXG4gICAgICBzZWxlY3Rvcjoge1xyXG4gICAgICAgIF9pZDogeyAkZ3Q6IG51bGwgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBleHBlY3QoZG9jcy5sZW5ndGgpLnRvQmUoMik7XHJcblxyXG4gICAgcmVzID0gYXdhaXQgVW5pdC5kZWxldGVPbmUoZG9jc1swXS5faWQpO1xyXG4gICAgZXhwZWN0KHJlcy5vaykudG9CZSh0cnVlKTtcclxuXHJcbiAgICByZXMgPSBhd2FpdCBVbml0LmRlbGV0ZU9uZShkb2NzWzFdLl9pZCk7XHJcbiAgICBleHBlY3QocmVzLm9rKS50b0JlKHRydWUpO1xyXG5cclxuICAgIGRvY3MgPSBhd2FpdCBUZXN0aW5nLmZpbmRBbGwoe1xyXG4gICAgICBzZWxlY3Rvcjoge1xyXG4gICAgICAgIF9pZDogeyAkZ3Q6IG51bGwgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBleHBlY3QoZG9jcy5sZW5ndGgpLnRvQmUoMSk7XHJcblxyXG4gICAgcmVzID0gYXdhaXQgVGVzdGluZy5kZWxldGVPbmUoZG9jc1swXS5faWQpO1xyXG4gICAgZXhwZWN0KHJlcy5vaykudG9CZSh0cnVlKTtcclxuICB9IGNhdGNoIChyZWFzb24pIHtcclxuICAgIGZhaWwocmVhc29uLm1lc3NhZ2UpO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBhd2FpdCByZXBvc2l0b3J5LmNsb3NlKCk7XHJcbiAgfVxyXG59KTtcclxuIl19