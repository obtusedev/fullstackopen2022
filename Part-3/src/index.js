const express = require("express");
const app = express();
const PORT = 3001;

let phonebook = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

function generateId(id) {
    return Math.floor(Math.random() * 10000);
}

function requestLogger(req, res, next) {
    console.log("Method:", req.method);
    console.log("Path:  ", req.path);
    console.log("Body:  ", req.body);
    console.log("-------");
    next();
}

function unknownEndpoint(req, res) {
    res.status(404).json({ error: "unknown endpoint" });
}

app.use(express.json()); // handle post body data
app.use(requestLogger);
app.use(unknownEndpoint);

app.get("/info", (req, res) => {
    res.send(
        `<p>Phonebook has info for ${
            phonebook.length
        } people</p><p>${new Date()}</p>`
    );
});

app.get("/api/persons", (req, res) => {
    res.json(phonebook);
});

app.get("/api/persons/:id", (req, res) => {
    const { id } = req.params;
    const person = phonebook.find(person => person.id === parseInt(id));
    if (person) {
        res.json(person);
    } else {
        res.status(404).json({ error: "person not found" });
    }
});

app.post("/api/persons", (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        res.status(400).json({ error: "missing required fields" });
        return;
    }

    if (phonebook.find(person => person.name === body.name)) {
        res.status(400).json({ error: "name must be unique" });
        return;
    }
    if (phonebook.find(person => person.number === body.number)) {
        res.status(400).json({ error: "number must be unique" });
        return;
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    };
    phonebook = phonebook.concat(person);
    res.status(200).json({ message: "person created", content: phonebook });
});

app.delete("/api/persons/:id", (req, res) => {
    const { id } = req.params;
    phonebook = phonebook.filter(person => person.id !== parseInt(id));
    // the course use 204 but it is not good for ux since it doesn't give good res message
    res.status(200).json({ message: "person deleted", content: phonebook });
});

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
});
