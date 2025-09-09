import express from "express";
import { body, param, query, validationResult } from "express-validator";
import auth from "../middleware/auth.js";
import Note from "../models/Note.js";

const router = express.Router();

// protect all notes routes
router.use(auth);

/**
 * @des GET /api/notes
 * @access Private
 */
router.get(
  "/",
  [
    query("search").optional().isString().trim(),
    query("tag").optional().isString().trim(),
    query("archived").optional().isBoolean().toBoolean()
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { search, tag, archived } = req.query;
      const filter = { user: req.user.id };
      if (typeof archived === "boolean") filter.isArchived = archived;
      if (tag) filter.tags = tag;
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } }
        ];
      }

      const notes = await Note.find(filter).sort({ updatedAt: -1 });
      res.json(notes);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @des GET /api/notes/:id
 * @access Private
 */
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid note id")],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
      if (!note) return res.status(404).json({ message: "Note not found" });
      res.json(note);
    } catch (err) {
      next(err);
    }
  }
);

/**
 *
 * @des POST /api/notes
 * @access Private 
 * */
router.post(
  "/",
  [
    body("title").trim().notEmpty().withMessage("Title is required").isLength({ max: 120 }),
    body("content").optional().isString().isLength({ max: 5000 }),
    body("tags").optional().isArray(),
    body("tags.*").optional().isString().trim(),
    body("isArchived").optional().isBoolean().toBoolean()
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const note = await Note.create({ ...req.body, user: req.user.id });
      res.status(201).json(note);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * 
 * @des PUT /api/notes/:id
 * @access Private
 */
router.put(
  "/:id",
  [
    param("id").isMongoId(),
    body("title").optional().trim().isLength({ min: 1, max: 120 }),
    body("content").optional().isString().isLength({ max: 5000 }),
    body("tags").optional().isArray(),
    body("tags.*").optional().isString().trim(),
    body("isArchived").optional().isBoolean().toBoolean()
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const note = await Note.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { $set: req.body },
        { new: true }
      );
      if (!note) return res.status(404).json({ message: "Note not found" });
      res.json(note);
    } catch (err) {
      next(err);
    }
  }
);

/*
 * @des DELETE /api/notes/:id
 * @access Private
 */
router.delete(
  "/:id",
  [param("id").isMongoId()],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
      if (!note) return res.status(404).json({ message: "Note not found" });
      res.json({ message: "Note deleted" });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
