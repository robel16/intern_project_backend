const express = require("express");
const router = express.Router();
const Recruiter = require("../models/recruiter");

router.get("/", async (req, res) => {
  let recruiters = await Recruiter.find();
  return res.status(200).json({ recruiters });
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let recruiter = await Recruiter.findById(id);
  return res.status(200).json({ recruiter });
});

router.post("/", async (req, res) => {
  let fields = req.body.recruiter;
  let recruiter;

  try {
    recruiter = new Recruiter(fields);
    await recruiter.save();
  } catch (error) {
    return res.status(400).json({ error });
  }

  return res.status(200).json(recruiter);
});

router.patch("/", async (req, res) => {
  let fields = req.body.recruiter;
  let recruiter = await Recruiter.findById(fields.id);

  let fieldKeys = Object.keys(fields);

  for (key in fieldKeys) {
    if (key != "id") continue;
    recruiter[key] = fields[key];
  }

  await recruiter.save();
  return res.status(200).json(recruiter);
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  await Recruiter.findByIdAndDelete(id);

  return res.status(200).json({ id });
});
