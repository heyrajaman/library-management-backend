import express from "express";
import Book from "../models/book.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

// FR-04: Add new book

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, author, category, quantity, shelfLocation } = req.body;

    if (!title || !author || !category || !quantity) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const book = await Book.create({
      title,
      author,
      category,
      quantity,
      available: quantity,
      shelfLocation,
    });

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FR-06: Get all books / search

router.get("/", authMiddleware, async (req, res) => {
  try {
    const { title, author, category } = req.query;

    const where = {};
    if (title) where.title = title;
    if (author) where.author = author;
    if (category) where.category = category;

    const books = await Book.findAll({ where });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FR-05: Update book

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.update(req.body);
    res.json({ message: "Book updated", book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FR-05: Delete book

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.destroy();
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Internal working: Update book availability

router.patch("/availability/:id", authMiddleware, async (req, res) => {
  try {
    const { change } = req.body; // +1 or -1 (increase or decrease)
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.available + change < 0) {
      return res.status(400).json({ message: "No books available" });
    }

    book.available += change;
    await book.save();

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
