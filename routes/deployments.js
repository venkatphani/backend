const express = require("express");
const createLogger = require("@lionellbriones/logging").default;

const logger = createLogger("deployment.js");
const { validateInput } = require("../validations");
const { getError } = require("../utils/helpers");
const { Deployment } = require("../models");

const router = express.Router();

router.post("/", async (req, res) => {
  const { errors, isValid } = validateInput(req.body, ["templateName", "url", "version"]);
  if (!isValid) {
    logger.warn("add deployment", errors);
    return res.status(400).json({ error: errors, success: false });
  }

  try {
    const { templateName, url, version } = req.body;
    const deployment = new Deployment({
      templateName,
      url,
      version,
      deployedAt: new Date(),
    });
    const result = await deployment.save();
    return res.status(200).json({ data: result, success: true });
  } catch (err) {
    logger.error("add deployment api failed", err);
    return res.status(500).json({ error: getError(err), success: false });
  }
});

router.get("/all", async (req, res) => {
  try {
    const deployments = await Deployment.find();
    return res.status(200).json({ data: deployments, success: true });
  } catch (err) {
    logger.error("get all deployments api failed", err);
    return res.status(500).json({ error: getError(err), success: false });
  }
});

router.delete("/", async (req, res) => {
  const { errors, isValid } = validateInput(req.body, ["id"]);
  if (!isValid) {
    logger.warn("Invalid input for delete deployment", errors);
    return res.status(400).json({ error: errors, success: false });
  }
  try {
    const { id } = req.body;
    const deployment = await Deployment.findById(id);
    if (!deployment) {
      errors.id = "Invalid deployment id";
      logger.warn(errors);
      return res.status(404).json({ error: errors, success: false });
    }
    await deployment.remove();
    return res.status(200).json({ data: deployment, success: true });
  } catch (err) {
    logger.error("delete deployment api failed", err);
    return res.status(500).json({ error: getError(err), success: false });
  }
});

module.exports = router;
