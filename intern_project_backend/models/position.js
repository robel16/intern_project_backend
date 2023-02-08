const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stageSchema = new Schema({
  type: {
    type: String,
    enum: ["text", "voice", "video", "file", "finished"],
  },
  prompt: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
});

const positionSchema = new Schema({
  name: { type: String, required: true, unique: true },
  instructions: { type: String, required: true },
  stages: [stageSchema],
  status: {
    type: String,
    required: true,
    enum: ["approved", "pending-approval", "rejected", "draft", "active", "inactive"],
    default: "pending-approval",
  },
});

module.exports = mongoose.model("Position", positionSchema);
