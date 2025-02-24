const MongoDB = require('../utils/mongodb.utils');

// Get all user
exports.getAllUsers = async (req, res) => {
  try {
    const client = await MongoDB.connect(process.env.MONGODB_URI);
    const db = client.db('Freelancers');
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books', error });
  }
};