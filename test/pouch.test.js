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
const PouchDB = require("pouchdb");
const InMemoryPlugin = require("pouchdb-adapter-memory");
const pouch_1 = require("../src/pouch");
PouchDB.plugin(InMemoryPlugin);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG91Y2gudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvdWNoLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdCQUFjO0FBQ2QsbUNBQW1DO0FBQ25DLHlEQUF5RDtBQUN6RCx3Q0FBMEQ7QUFDMUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUUvQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUM7QUFDcEIsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBRzFCLElBQU0sSUFBSSxHQUFWLFVBQVcsU0FBUSxhQUFXO0NBRzdCLENBQUE7QUFISyxJQUFJO0lBRFQsZ0JBQVEsQ0FBQyxJQUFJLENBQUM7R0FDVCxJQUFJLENBR1Q7QUFHRCxJQUFNLE9BQU8sR0FBYixhQUFjLFNBQVEsYUFBYztDQUluQyxDQUFBO0FBSkssT0FBTztJQURaLGdCQUFRLENBQUMsT0FBTyxDQUFDO0dBQ1osT0FBTyxDQUlaO0FBRUQsSUFBSSxDQUFDLDRDQUE0QyxFQUFFLEdBQVMsRUFBRTtJQUM1RCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLGdEQUFnRCxFQUFFLEdBQVMsRUFBRTtJQUNoRSxJQUFJLFVBQVUsR0FBYyxJQUFJLGlCQUFTLENBQUMsWUFBWSxFQUFFO1FBQ3RELElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7UUFDdEIsSUFBSSxFQUFFO1lBQ0osUUFBUSxFQUFFLE9BQU87WUFDakIsUUFBUSxFQUFFLE9BQU87U0FDbEI7UUFDRCxPQUFPLEVBQUUsUUFBUTtLQUNsQixDQUFDLENBQUM7SUFDSCxJQUFJO1FBQ0YsTUFBTSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFNUMsSUFBSSxTQUFTLEdBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFFdkMsSUFBSSxZQUFZLEdBQVksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLENBQUM7UUFFbEUsSUFBSSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUM5RCxRQUFRLEVBQ1IsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUNGLENBQUM7UUFFRixHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXRDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTFCLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFNUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzVCLFFBQVEsRUFBRTtnQkFDUixHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO2FBQ25CO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUIsR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUIsR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUMzQixRQUFRLEVBQUU7Z0JBQ1IsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTthQUNuQjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVCLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCO0lBQUMsT0FBTyxNQUFNLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3RCO1lBQVM7UUFDUixNQUFNLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUMxQjtBQUNILENBQUMsQ0FBQSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJqZXN0XCI7XHJcbmltcG9ydCAqIGFzIFBvdWNoREIgZnJvbSBcInBvdWNoZGJcIjtcclxuaW1wb3J0ICogYXMgSW5NZW1vcnlQbHVnaW4gZnJvbSBcInBvdWNoZGItYWRhcHRlci1tZW1vcnlcIjtcclxuaW1wb3J0IHsgQ29udGFpbmVyLCBNb2RlbCwgVHlwZU5hbWUgfSBmcm9tIFwiLi4vc3JjL3BvdWNoXCI7XHJcblBvdWNoREIucGx1Z2luKEluTWVtb3J5UGx1Z2luKTtcclxuXHJcbmNvbnN0IHVuaXQgPSBcIlVuaXRcIjtcclxuY29uc3QgdGVzdGluZyA9IFwiVGVzdGluZ1wiO1xyXG5cclxuQFR5cGVOYW1lKHVuaXQpXHJcbmNsYXNzIFVuaXQgZXh0ZW5kcyBNb2RlbDxVbml0PiB7XHJcbiAgX2lkPzogc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxufVxyXG5cclxuQFR5cGVOYW1lKHRlc3RpbmcpXHJcbmNsYXNzIFRlc3RpbmcgZXh0ZW5kcyBNb2RlbDxUZXN0aW5nPiB7XHJcbiAgX2lkPzogc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBkYXRlOiBEYXRlO1xyXG59XHJcblxyXG50ZXN0KFwiVGVzdGluZyBmb3IgZGVjb3JhdG9ycyB0byBpZGVudGlmeSBhIGNsYXNzXCIsIGFzeW5jICgpID0+IHtcclxuICBleHBlY3QoVW5pdC5fX3R5cGVuYW1lKS50b0JlKHVuaXQpO1xyXG4gIGV4cGVjdChUZXN0aW5nLl9fdHlwZW5hbWUpLnRvQmUodGVzdGluZyk7XHJcbn0pO1xyXG5cclxudGVzdChcIlRlc3QgdGhlIHBvdWNoZGIgY29udGFpbmVyIGRldmVsb3BlZCBieSBoZWhlbmFcIiwgYXN5bmMgKCkgPT4ge1xyXG4gIGxldCByZXBvc2l0b3J5OiBDb250YWluZXIgPSBuZXcgQ29udGFpbmVyKFwiREJfVEVTVElOR1wiLCB7XHJcbiAgICBhamF4OiB7IGNhY2hlOiBmYWxzZSB9LFxyXG4gICAgYXV0aDoge1xyXG4gICAgICB1c2VybmFtZTogXCJhbWJpdFwiLFxyXG4gICAgICBwYXNzd29yZDogXCJhbWJpdFwiXHJcbiAgICB9LFxyXG4gICAgYWRhcHRlcjogXCJtZW1vcnlcIlxyXG4gIH0pO1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCByZXBvc2l0b3J5LmFkZE1vZGVscyhbVW5pdCwgVGVzdGluZ10pO1xyXG5cclxuICAgIGxldCB1bml0TW9kZWw6IFVuaXQgPSB7IG5hbWU6IFwiVW5pdFwiIH07XHJcblxyXG4gICAgbGV0IHRlc3RpbmdNb2RlbDogVGVzdGluZyA9IHsgbmFtZTogXCJUZXN0aW5nXCIsIGRhdGU6IG5ldyBEYXRlKCkgfTtcclxuXHJcbiAgICBsZXQgcmVzID0gYXdhaXQgVW5pdC5pbnNlcnRPbmUodW5pdE1vZGVsKTtcclxuICAgIGV4cGVjdChyZXMub2spLnRvQmUodHJ1ZSk7XHJcblxyXG4gICAgVW5pdC5jaGFuZ2UoeyBzaW5jZTogXCJub3dcIiwgbGl2ZTogdHJ1ZSwgaW5jbHVkZV9kb2NzOiB0cnVlIH0pLm9uKFxyXG4gICAgICBcImNoYW5nZVwiLFxyXG4gICAgICAoaW5mbzogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coaW5mbyk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgcmVzID0gYXdhaXQgVW5pdC5pbnNlcnRPbmUodW5pdE1vZGVsKTtcclxuXHJcbiAgICBleHBlY3QocmVzLm9rKS50b0JlKHRydWUpO1xyXG5cclxuICAgIHJlcyA9IGF3YWl0IFRlc3RpbmcuaW5zZXJ0T25lKHRlc3RpbmdNb2RlbCk7XHJcblxyXG4gICAgZXhwZWN0KHJlcy5vaykudG9CZSh0cnVlKTtcclxuXHJcbiAgICBsZXQgZG9jcyA9IGF3YWl0IFVuaXQuZmluZEFsbCh7XHJcbiAgICAgIHNlbGVjdG9yOiB7XHJcbiAgICAgICAgX2lkOiB7ICRndDogbnVsbCB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGV4cGVjdChkb2NzLmxlbmd0aCkudG9CZSgyKTtcclxuXHJcbiAgICByZXMgPSBhd2FpdCBVbml0LmRlbGV0ZU9uZShkb2NzWzBdLl9pZCk7XHJcbiAgICBleHBlY3QocmVzLm9rKS50b0JlKHRydWUpO1xyXG5cclxuICAgIHJlcyA9IGF3YWl0IFVuaXQuZGVsZXRlT25lKGRvY3NbMV0uX2lkKTtcclxuICAgIGV4cGVjdChyZXMub2spLnRvQmUodHJ1ZSk7XHJcblxyXG4gICAgZG9jcyA9IGF3YWl0IFRlc3RpbmcuZmluZEFsbCh7XHJcbiAgICAgIHNlbGVjdG9yOiB7XHJcbiAgICAgICAgX2lkOiB7ICRndDogbnVsbCB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGV4cGVjdChkb2NzLmxlbmd0aCkudG9CZSgxKTtcclxuXHJcbiAgICByZXMgPSBhd2FpdCBUZXN0aW5nLmRlbGV0ZU9uZShkb2NzWzBdLl9pZCk7XHJcbiAgICBleHBlY3QocmVzLm9rKS50b0JlKHRydWUpO1xyXG4gIH0gY2F0Y2ggKHJlYXNvbikge1xyXG4gICAgZmFpbChyZWFzb24ubWVzc2FnZSk7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIGF3YWl0IHJlcG9zaXRvcnkuY2xvc2UoKTtcclxuICB9XHJcbn0pO1xyXG4iXX0=