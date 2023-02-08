const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  applicant_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Applicant",
    required: true,
  },
  position_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Position",
    required: true,
  },
  current_stage: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  status: {
    type: String,
    default: "Not Downloaded",
    enum: ["Not Downloaded", "Downloaded", "Reuploaded"],
  },
});

module.exports = mongoose.model("Application", applicationSchema);
