const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicantSchema = new Schema({
  full_name: { type: String,required:true },

 
  settings: {
    allowNotification: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model("Applicant", applicantSchema);
