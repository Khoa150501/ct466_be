const {ObjectId, ReturnDocument} = require("mongodb");

class NxbService {
    constructor(client){
        this.Nxb = client.db().collection("nhaxuatban");
    }

    //csdl su dung mongodb api
    extractNxbtData(payload) {
        const nxb = {
            MANXB: payload.MANXB,
            TENNXB: payload.TENNXB,
            DIACHI: payload.DIACHI,
        };

        Object.keys(nxb).forEach(
            (key) => nxb[key] == undefined && delete nxb[key]
        );
        return nxb;
    }

    async create(payload) {
        const nxb = this.extractNxbtData(payload);
        const result = await this.Nxb.findOneAndUpdate(
            nxb,
            {$set: {favorite: nxb.favorite == true}},
            {returnDocument: "after", upsert: true}
        );
        return result;
    }
    async find(filter){
        const cursor = await this.Nxb.find(filter);
        return await cursor.toArray();
    }
    async findByName(name){
        return await this.find({
            name: { $regex: new RegExp(new RegExp(name)), $options: "i" },
        });
    }
    async findById(id){
        return await this.Nxb.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractContactData(payload);
        const result = await this.Nxb.findOneAndUpdate(
            filter, {$set: update},
                    {returnDocument: "after"}
        );
        return result.value;
    }
    async delete(id){
        const result = await this.Nxb.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
    async findFavorite(){
        return await this.find({favorite: true});
    }
    async deleteAll(){
        const result = await this.Nxb.deleteMany({});
        return result.deleteCount;
    }
}
module.exports = NxbService;