const express = require("express");
const users = require("../controllers/users.controllers");
const router = express.Router();


router.get('/', users.getAllUsers); 

module.exports = router;