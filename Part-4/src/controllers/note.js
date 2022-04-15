const notesRouter = require("express").Router();
const Note = require("../models/Note");

notesRouter.get("/", async (req, res) => {
    let notes = await Note.find({}, "-_id -__v");
    res.status(200).json(notes);
});

notesRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    let note = await Note.findOne({ id: id }, "-_id -__v");
    return note
        ? res.status(200).json(note)
        : res.status(404).json({ error: "note not found" });
});

notesRouter.post("/", async (req, res) => {
    const body = req.body;
    if (!body.title || !body.content) {
        return res.status(400).json({ error: "missing required fields" });
    }
    const newNote = {
        id: body.id,
        title: body.title,
        content: body.content,
        important: body.important || false,
    };
    try {
        let noteCreated = await Note.create(newNote);
        res.status(200).json({ message: "note created" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

notesRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        let result = await Note.deleteOne({ id: id });
        if (result.deletedCount !== 0) {
            res.status(200).json({ message: "note deleted successfully" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = notesRouter;
