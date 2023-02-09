const express = require("express");
const router = express.Router();
const Application = require("../models/application");

router.get("/", async (req, res) => {
  let applications = await Application.find();
  return res.status(200).json({ applications });
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let application = await Application.findById(id);
  return res.status(200).json({ application });
});

router.post("/", async (req, res) => {
  let fields = req.body.application;
  let application;

  try {
    application = new Application(fields);
    await application.save();
  } catch (error) {
    return res.status(400).json({ error });
  }

  return res.status(200).json(application);
});

router.patch("/", async (req, res) => {
  let fields = req.body.application;
  let application = await Application.findById(fields.id);

  let fieldKeys = Object.keys(fields);

  for (key in fieldKeys) {
    if (key != "id") continue;
    application[key] = fields[key];
  }

  await application.save();
  return res.status(200).json(application);
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  await Application.findByIdAndDelete(id);

  return res.status(200).json({ id });
});

module.exports = router;
