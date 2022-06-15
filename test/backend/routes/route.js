const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/controller");
const cache = require ("../middlewares/cache.js")

router.get("/",cache("2 minutes"), ctrl.callAPI);

module.exports = router;
