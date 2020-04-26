const express = require("express");

const router = express.Router();

const deployments = require("./deployments");

router.use("/deployment", deployments);

module.exports = router;
