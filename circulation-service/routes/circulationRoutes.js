import express from "express";
import Transaction from "../models/Transaction.js";
import axios from "axios";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

// FR-07: Issue Book

router.post("/issue", authMiddleware, async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    //Reduce book avaliability
    await axios.patch(
      "http://localhost:4000/api/books/availability/" + bookId,
      { change: -1 },
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    //create transaction
    if (!memberId || !bookId) {
      return res.status(400).json({ message: "memberId and bookId required" });
    }

    // (Optional validation hooks – can be expanded later)
    // We assume member & book exist

    const issueDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(issueDate.getDate() + 7); // 7 days

    const transaction = await Transaction.create({
      memberId,
      bookId,
      issueDate,
      dueDate,
      status: "ISSUED",
    });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * FR-08: Return Book
 */
router.post("/return/:id", authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.status === "RETURNED") {
      return res.status(400).json({ message: "Book already returned" });
    }

    //Increase book avaliability
    await axios.patch(
      "http://localhost:4003/books/availability/" + transaction.bookId,
      { change: +1 },
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    //Update transaction status
    transaction.status = "RETURNED";
    transaction.returnDate = new Date();

    await transaction.save();

    res.json({ message: "Book returned successfully", transaction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * FR-09: Renew Book
 */
router.post("/renew/:id", authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.status !== "ISSUED") {
      return res
        .status(400)
        .json({ message: "Only issued books can be renewed" });
    }

    const newDueDate = new Date(transaction.dueDate);
    newDueDate.setDate(newDueDate.getDate() + 7); // extend 7 days

    transaction.dueDate = newDueDate;
    await transaction.save();

    res.json({ message: "Book renewed", transaction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * View all transactions
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
