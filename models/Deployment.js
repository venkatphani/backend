const mongoose = require("mongoose");

const { Schema } = mongoose;

const DeploymentSchema = new Schema({
  templateName: { type: String, required: true },
  url: { type: String, required: true },
  version: { type: String, required: true },
  deployedAt: { type: Date, required: true, default: Date.now() },
});

module.exports = mongoose.model("Deployment", DeploymentSchema);
