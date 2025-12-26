import express from "express";
import Fine from "../models/Fine.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

/**
 * FR-10 & FR-13: Get overdue fines
 */
router.get("/overdue", authMiddleware, async (req, res) => {
  try {
    const fines = await Fine.findAll({ where: { paidStatus: false } });
    res.json(fines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Create fine (called internally / manually)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { memberId, transactionId, daysLate } = req.body;

    const fineAmount = daysLate * 0.5; // Rs 0.50/day

    const fine = await Fine.create({
      memberId,
      transactionId,
      amount: fineAmount,
    });

    res.status(201).json(fine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * FR-11: Pay fine
 */
router.post("/pay/:id", authMiddleware, async (req, res) => {
  try {
    const fine = await Fine.findByPk(req.params.id);

    if (!fine) {
      return res.status(404).json({ message: "Fine not found" });
    }

    fine.paidStatus = true;
    fine.paidDate = new Date();

    await fine.save();

    res.json({ message: "Fine paid successfully", fine });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * FR-14 (basic): Fine summary
 */
router.get("/summary", authMiddleware, async (req, res) => {
  try {
    const fines = await Fine.findAll();
    res.json(fines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
