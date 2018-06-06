import "jest";
import { Container, Model, TypeName } from "../src/pouch";


const unit = "**Unit**";
const testing = "**Testing**";

@TypeName(unit)
class Unit extends Model<Unit>{
    _id?: string;
    name: string;
}

@TypeName(testing)
class Testing extends Model<Testing>{
    _id?: string;
    name: string;
    date: Date;
}

test("Testing for decorators to identify a class", async () => {
    expect(Unit.__typename).toBe(unit);
    expect(Testing.__typename).toBe(testing);
});


test("Test the pouchdb container developed by hehena", async () => {
    let repository: Container = new Container("db_testing", {
        ajax: { cache: false },
        auth: {
            username: "ambit",
            password: "ambit"
        }
    });
    try {
        await repository.addModels([Unit, Testing]);

        let unitModel: Unit = { name: "Unit" };

        let testingModel: Testing = { name: "Testing", date: new Date() };

        let res = await Unit.insertOne(unitModel);

        expect(res.ok).toBe(true);
        console.log(res);

        res = await Testing.insertOne(testingModel);

        expect(res.ok).toBe(true);

        let docs = await Unit.findAll({
            selector: {
                _id: { "$gt": null }
            }
        });

        expect(docs.length).toBe(1);

        res = await Unit.deleteOne(docs[0]._id);
        expect(res.ok).toBe(true);


        docs = await Testing.findAll({
            selector: {
                _id: { "$gt": null }
            }
        });

        expect(docs.length).toBe(1);

        res = await Testing.deleteOne(docs[0]._id);
        expect(res.ok).toBe(true);


    } catch (reason) {
        fail(reason.message);
    }
});
