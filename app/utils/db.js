const { MongoClient } = require('mongodb');
const config = require('../config');

const client = new MongoClient(config.db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db;

const connectDB = async () => {
    try {
        await client.connect();
        db = client.db(); // Kết nối đến database
        console.log("MongoDB connected successfully!");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1); // Dừng server nếu không kết nối được
    }
};

const getDB = () => {
    if (!db) throw new Error("Database not initialized");
    return db;
};

module.exports = { connectDB, getDB };
