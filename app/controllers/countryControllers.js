const countries = require("../models/countries");

const getAllCountries = (req, res) => {
  res.json(countries);
};

module.exports = { getAllCountries };