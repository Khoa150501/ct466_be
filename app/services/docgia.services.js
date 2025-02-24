const { MongoDB } = require("../utils/mongodb.utils");

async function getAllDocgia() {
    const db = await connectDb();
    return db.collection("docgia").find().toArray();
}

async function addDocgia(docgiaData) {
    const db = await connectDb();
    return db.collection("docgia").insertOne(docgiaData);
}

async function deleteDocgia(docgiaId) {
    const db = await connectDb();
    const { ObjectId } = require("mongodb");
    return db.collection("docgia").deleteOne({ _id: new ObjectId(docgiaId) });
}

module.exports = { getAllDocgia, addDocgia, deleteDocgia };