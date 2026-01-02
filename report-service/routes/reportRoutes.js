import express from "express";
import axios from "axios";
import { generatePDF } from "../utils/pdfGenerator.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// FR-12: Daily Transaction Report

router.get("/transactions/daily", authMiddleware, async (req, res) => {
  const response = await axios.get("http://localhost:4000/api/circulation", {
    headers: { Authorization: req.headers.authorization },
  });

  const today = new Date().toDateString();
  const lines = response.data
    .filter((t) => new Date(t.createdAt).toDateString() === today)
    .map(
      (t) =>
        `Transaction ${t.transactionId} | Book ${t.bookId} | Member ${t.memberId} | Status ${t.status}`
    );

  generatePDF("Daily_Transaction_Report", lines, res);
});

// FR-13: Overdue Report

router.get("/overdue", authMiddleware, async (req, res) => {
  const fines = await axios.get("http://localhost:4000/api/fines/overdue", {
    headers: { Authorization: req.headers.authorization },
  });

  const lines = fines.data.map(
    (f) =>
      `Member ${f.memberId} | Transaction ${f.transactionId} | Fine Rs.${f.amount}`
  );

  generatePDF("Overdue_Report", lines, res);
});

// FR-14: Inventory Summary

router.get("/inventory", authMiddleware, async (req, res) => {
  const books = await axios.get("http://localhost:4000/api/books", {
    headers: { Authorization: req.headers.authorization },
  });

  const lines = books.data.map(
    (b) => `${b.title} | Total: ${b.quantity} | Available: ${b.available}`
  );

  generatePDF("Inventory_Summary_Report", lines, res);
});

export default router;
