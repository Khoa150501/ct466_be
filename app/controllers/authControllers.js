const jwt = require('jsonwebtoken');
const MongoDB = require('../utils/mongodb.utils');


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
// Đăng nhập
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const client = await MongoDB.connect(process.env.MONGODB_URI);
        const db = client.db('Freelancers');
        // console.log('Request Body:', req.body); // Kiểm tra dữ liệu gửi từ client
        const user = await db.collection('users').findOne({ email, password });
        // console.log('User Found:', user); // Log user tìm thấy

        if (!user) {
            return res.status(401).json({ message: 'Thông tin đăng nhập không chính xác!' });
        }

        const token = jwt.sign(
            { _id: user._id, email: user.email, username: user.username },
            'secret_key',
            { expiresIn: '45s' }
        );

        res.status(200).json({
            message: 'Đăng nhập thành công!',
            token,
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
            },
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Lỗi server!', error: err.message });
    }
};

//đăng ký
exports.register = async (req, res) => {
    const { email, password, username, role } = req.body;

    try {
        const client = await MongoDB.connect(process.env.MONGODB_URI);
        const db = client.db('Freelancers');

        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã được sử dụng!' });
        }

        // Tạo một người dùng mới
        const newUser = {
            email,
            password, // Lưu ý: Trong thực tế, bạn nên băm mật khẩu trước khi lưu vào cơ sở dữ liệu
            username,
            role: role || 'user', // Mặc định role là 'user' nếu không được cung cấp
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Thêm người dùng mới vào cơ sở dữ liệu
        const result = await db.collection('users').insertOne(newUser);

        // Tạo token cho người dùng mới
        const token = jwt.sign(
            { _id: result.insertedId, email: newUser.email, username: newUser.username },
            'secret_key',
            { expiresIn: '45s' }
        );

        res.status(201).json({
            message: 'Đăng ký thành công!',
            token,
            user: {
                _id: result.insertedId,
                email: newUser.email,
                username: newUser.username,
                role: newUser.role,
            },
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Lỗi server!', error: err.message });
    }
};


