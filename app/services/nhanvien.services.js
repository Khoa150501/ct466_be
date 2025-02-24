const {ObjectId, ReturnDocument} = require("mongodb");

class NhanVienService {
    constructor(client){
        this.NhanVien = client.db().collection("nhanvien");
    }

    //csdl su dung mongodb api
    extractNhanVienData(payload) {
        const nhanvien = {
            msnv: payload.msnv,
            hotennv: payload.hotennv,
            password: payload.password,
            diachi: payload.diachi,
            sdtnv: payload.sdtnv,

        };

        Object.keys(nhanvien).forEach(
            (key) => nhanvien[key] == undefined && delete nhanvien[key]
        );
        return nhanvien;
    }

    async create(payload) {
        const nhanvien = this.extractNhanVienData(payload);
        const result = await this.NhanVien.findOneAndUpdate(
             nhanvien,
            {$set: {favorite: nhanvien.favorite == true}},
            {returnDocument: "after", upsert: true}
        );
        return result;
    }
    //
    async find(filter){
        const cursor = await this.NhanVien.find(filter);
        return await cursor.toArray();
    }
    async findByName(name){
        return await this.find({
            name: { $regex: new RegExp(new RegExp(name)), $options: "i" },
        });
    }
    async findById(id){
        return await this.NhanVien.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractNhanVienData(payload);
        const result = await this.NhanVien.findOneAndUpdate(
            filter, {$set: update},
                    {returnDocument: "after"}
        );
        return result.value;
    }
    async delete(id){
        const result = await this.NhanVien.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
    async findFavorite(){
        return await this.find({favorite: true});
    }
    async deleteAll(){
        const result = await this.NhanVien.deleteMany({});
        return result.deleteCount;
    }
}
module.exports = NhanVienService;