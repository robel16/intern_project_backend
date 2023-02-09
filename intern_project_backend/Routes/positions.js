const express = require("express");
const router = express.Router();
const Position = require("../models/position");
const { allowedRoles, verifyToken } = require("../util");

router.get("/", verifyToken, async (req, res) => {
  let positions = await Position.find();
  return res.status(200).json({ positions });
});

router.get("/:id", verifyToken, async (req, res) => {
  let id = req.params.id;
  let position = await Position.findById(id);
  return res.status(200).json({ position });
});

router.post("/", verifyToken, allowedRoles(["recruiter"]), async (req, res) => {
  let fields = req.body.position;
  let position;

  try {
    position = new Position(fields);
    await position.save();
  } catch (error) {
    return res.status(400).json({ error });
  }

  return res.status(200).json(position);
});

router.patch("/", verifyToken, allowedRoles(["recruiter"]), async (req, res) => {
  let fields = req.body.position;
  let position = await Position.findById(fields.id);

  let fieldKeys = Object.keys(fields);

  for (key in fieldKeys) {
    if (key != "id") continue;
    position[key] = fields[key];
  }

  await position.save();
  return res.status(200).json(position);
});

router.delete("/:id", verifyToken, allowedRoles(["recruiter"]), async (req, res) => {
  let id = req.params.id;
  await Position.findByIdAndDelete(id);

  return res.status(200).json({ id });
});

module.exports = router;
