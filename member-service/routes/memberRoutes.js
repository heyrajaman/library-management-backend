import express from "express";
import Member from "../models/member.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

/**
 * FR-01: Add new member
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ message: "All fields required" });
    }

    const member = await Member.create({ name, phone, email });
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * FR-02: Get all members / search
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const members = await Member.findAll();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * FR-02: Update member
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    await member.update(req.body);
    res.json({ message: "Member updated", member });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * FR-03: Get single member
 */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
