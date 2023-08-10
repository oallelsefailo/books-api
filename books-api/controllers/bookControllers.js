const express = require("express");
const Book = require("../models/bookModel");

const booksRouter = express.Router();

// GET all books
booksRouter.get("/", async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.status(200).json(allBooks);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

// GET specific book
booksRouter.get("/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

// PATCH/PUT update a specific book
booksRouter.patch("/:id", async (req, res) => {
  const bookId = req.params.id;
  const updateData = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

// DELETE delete a specific book
booksRouter.delete("/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

// POST create a new book
booksRouter.post("/", async (req, res) => {
  const newBookData = req.body;

  try {
    const newBook = await Book.create(newBookData);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

module.exports = booksRouter;
