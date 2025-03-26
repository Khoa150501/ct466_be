const express = require("express");
const router = express.Router();
const { getAllSkills } = require("../controllers/apiSkillControllers");

router.get("/skills", getAllSkills);

module.exports = router;