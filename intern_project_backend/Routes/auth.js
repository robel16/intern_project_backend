const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Recruiter = require("../models/recruiter");
const { verifyToken, generateToken } = require("../util");

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Invalid Information" });

  let recruiter = await Recruiter.findOne({ email });

  if (!recruiter) return res.status(401).json({ message: "Incorrect Information" });

  let hashedPassword = recruiter.password;

  let validPassword = await bcrypt.compare(password, hashedPassword);

  if (!validPassword) return res.status(401).json({ message: "Incorrect Information" });

  let token = generateToken(recruiter._id, email, recruiter.roles);

  return res.status(200).json({
    token,
    first_name: recruiter.first_name,
    last_name: recruiter.last_name,
    email,
    roles: recruiter.roles,
    id: recruiter._id,
  });
});

router.post("/changePassword", verifyToken, async (req, res) => {
  let { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) return res.status(400).json({ message: "Invalid Information" });

  if (oldPassword == newPassword)
    return res.status(401).json({ message: "Old password can not be the same as new password" });

  let recruiterId = req.id;
  let applicant = await Recruiter.findById(recruiterId);
  if (!applicant) return res.status(401).json({ message: "Incorrect Information" });

  let hashedPassword = applicant.password;

  let validPassword = await bcrypt.compare(oldPassword, hashedPassword);

  if (!validPassword) return res.status(401).json({ message: "Old Password Incorrect" });

  if (!validatePassword(newPassword)) return res.status(401).json({ message: "New Password Invalid" });

  let newHashedPassword = await bcrypt.hash(newPassword, 10);

  await Recruiter.findOneAndUpdate({ _id: recruiterId }, { password: newHashedPassword });

  return res.status(200).json({ message: "Password Updated" });
});

function validatePassword(password) {
  if (password.length < 8) return false;

  return true;
}

module.exports = router;
