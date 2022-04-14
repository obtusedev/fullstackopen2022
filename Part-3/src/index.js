const express = require("express");
const app = express();
const PORT = 3001;

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2022-05-30T17:30:31.098Z",
        important: true,
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2022-05-30T18:39:34.091Z",
        important: false,
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2022-05-30T19:20:14.298Z",
        important: true,
    },
];

function generateId() {
    const maxId =
        notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0;
    return maxId + 1;
}

app.use(express.json()); // handle post body data

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    const note = notes.find(note => note.id === parseInt(id));
    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ error: "note not found" });
    }
});

app.post("/api/notes", (req, res) => {
    const body = req.body;
    if (!body.content) {
        res.status(400).json({
            error: "missing content"
        });
        return;
    }
    
    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    }
    notes = notes.concat(note);
    res.json(note);
});

app.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    note = notes.filter(note => note.id !== parseInt(id));
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
});
