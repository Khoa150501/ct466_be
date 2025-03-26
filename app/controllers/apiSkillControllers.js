const skills = require("../models/apiSkills");

const getAllSkills = (req, res) => {
  res.json(skills);
};

module.exports = { getAllSkills };