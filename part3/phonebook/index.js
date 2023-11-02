const http = require("http");

const express = require("express");
const app = express();
app.use(express.json()); //Necesario para leer bodys
app.use(express.static('dist')) //Muestra el frontend compilado en dist en la ruta "/"

const morgan = require("morgan");
morgan.token('custom', (tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
        tokens.method(req, res) === "POST" ? JSON.stringify(req.body) : null,
    ].join(" ");
})
app.use(morgan('custom'));
const cors = require('cors')
app.use(cors())

// DATA
let persons = [
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

// ENDPOINTS
app.get("/info", (request, response) => {
    let now = new Date();
    response.send(`
        <p>Phonebook has info for ${persons.length} people<p/>
        <p>${now}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((person) => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.post("/api/persons", (request, response) => {
    const body = request.body;

    // The name is missing
    if (!body.name) {
        return response.status(400).json({
            error: "The name is missing.",
        });
    }

    // The name already exists in the phonebook
    const existing_person = persons.find((person) => person.name === body.name);
    if (existing_person) {
        return response.status(400).json({
            error: "The name already exists in the phonebook.",
        });
    }

    // The number is missing
    if (!body.number) {
        return response.status(400).json({
            error: "The number is missing.",
        });
    }

    // Everything is OK
    const person = {
        name: body.name,
        number: body.number || false,
        id: Math.floor(Math.random() * 9999),
    };

    persons = persons.concat(person);

    response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((person) => person.id !== id);

    response.status(204).end();
});

// LAUNCH
const PORT = process.env.PORT || 3001
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
