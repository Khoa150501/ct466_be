const {ObjectId, ReturnDocument} = require("mongodb");

class BorrowService {
    constructor(client){
        this.Borrow = client.db().collection("theodoimuonsach");
    }

    //csdl su dung mongodb api
    extractBorrowData(payload) {
        const borrow = {
            madg: payload.madg,
            masach: payload.masach,
            ngaymuon: payload.ngaymuon,
            ngaytra: payload.ngaytra,
            tinhtrang: payload.tinhtrang,
        };

        Object.keys(borrow).forEach(
            (key) => borrow[key] == undefined && delete borrow[key]
        );
        return borrow;
    }

    async create(payload) {
        const borrow = this.extractBorrowData(payload);
        const result = await this.Borrow.findOneAndUpdate(
            borrow,
            {$set: {favorite: borrow.favorite == true}},
            {returnDocument: "after", upsert: true}
        );
        return result;
    }
    async find(filter){
        const cursor = await this.Borrow.find(filter);
        return await cursor.toArray();
    }
    async findByName(name){
        return await this.find({
            name: { $regex: new RegExp(new RegExp(name)), $options: "i" },
        });
    }
    async findById(id){
        return await this.Borrow.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractBorrowData(payload);
        const result = await this.Borrow.findOneAndUpdate(
            filter, {$set: update},
                    {returnDocument: "after"}
        );
        return result.value;
    }
    async delete(id){
        const result = await this.Borrow.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
    async findFavorite(){
        return await this.find({favorite: true});
    }
    async deleteAll(){
        const result = await this.Borrow.deleteMany({});
        return result.deleteCount;
    }
}
module.exports = BorrowService;