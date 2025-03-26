const express = require("express");
const router = express.Router();
const { getAllCountries } = require("../controllers/countryControllers");

router.get("/countries", getAllCountries);

module.exports = router;