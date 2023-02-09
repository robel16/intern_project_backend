const express = require("express");
const router = express.Router();
const Applicant = require("../models/applicant");

router.get("/", async (req, res) => {
  let applicants = await Applicant.find();
  return res.status(200).json({ applicants });
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let applicant = await Applicant.findById(id);
  return res.status(200).json({ applicant });
});

router.post("/", async (req, res) => {
  let fields = req.body.applicant;
  let applicant;

  try {
    applicant = new Applicant(fields);
    await applicant.save();
  } catch (error) {
    return res.status(400).json({ error });
  }

  return res.status(200).json(applicant);
});

router.patch("/", async (req, res) => {
  let fields = req.body.applicant;
  let applicant = await Applicant.findById(fields.id);

  let fieldKeys = Object.keys(fields);

  for (key in fieldKeys) {
    if (key != "id") continue;
    applicant[key] = fields[key];
  }

  await applicant.save();
  return res.status(200).json(applicant);
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  await Applicant.findByIdAndDelete(id);

  return res.status(200).json({ id });
});

module.exports = router;
