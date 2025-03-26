require('dotenv').config();
const ApiError = require("./app/api-error");
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const { connectDB } = require('./app/utils/db');
const authRoutes = require('./app/router/authRoutes');
const usersRoutes = require('./app/router/users');
const countryRoutes = require("./app/router/countryRouter");
const apiSkillsRoutes = require("./app/router/apiSkillsRoutes");


const config = require('./app/config');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());



// Kết nối MongoDB và khởi động server
app.get("/", (req, res) => {
    res.json({ message: "Chào mừng bạn đến với thư viện!"});
});

app.use((err, req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
    });

app.use((err, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use("/api", countryRoutes);
app.use("/api", apiSkillsRoutes);







module.exports = app;