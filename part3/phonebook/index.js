require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json()); //Necesario para leer bodys
app.use(express.static("dist")); //Muestra el frontend compilado en dist en la ruta "/"

const Person = require("./models/person");

const morgan = require("morgan");
morgan.token("custom", (tokens, req, res) => {
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
});
app.use(morgan("custom"));
const cors = require("cors");
app.use(cors());

// DATA
// let persons = [
//     {
//         id: 1,
//         name: "Arto Hellas",
//         number: "040-123456",
//     },
//     {
//         id: 2,
//         name: "Ada Lovelace",
//         number: "39-44-5323523",
//     },
//     {
//         id: 3,
//         name: "Dan Abramov",
//         number: "12-43-234345",
//     },
//     {
//         id: 4,
//         name: "Mary Poppendieck",
//         number: "39-23-6423122",
//     },
// ];

// ENDPOINTS
app.get("/info", (request, response, next) => {
    let now = new Date();
    Person.countDocuments({})
        .then((count) => {
            response.send(`
                <p>Phonebook has info for ${count} people<p/>
                <p>${now}</p>`);
        })
        .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            console.log(person);
            if (person) {
                response.json(person);
            } else {
                return response.status(404).json({
                    error: "Not found",
                });
            }
        })
        .catch((error) => next(error));
});

app.get("/api/persons", (request, response, next) => {
    Person.find({})
        .then((persons) => {
            response.json(persons);
        })
        .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
    const { name, number } = request.body;

    const person = {
        name: name,
        number: number,
    };

    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
        .then((updatedPerson) => {
            response.json(updatedPerson);
        })
        .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
    const { name, number } = request.body;

    Person.findOne({ name: name })
        .then((person) => {
            if (person) {
                // The name already exists in the phonebook
                return response.status(400).json({
                    error: "The name already exists in the phonebook",
                });
            }

            // Everything is OK
            const new_person = new Person({
                name: name,
                number: number,
            });

            new_person
                .save()
                .then((person) => {
                    console.log(`added ${name} number ${number} to phonebook`);
                    response.json(person);
                })
                .catch((error) => next(error));
        })
        .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findOneAndDelete(request.params.id)
        .then((person) => {
            if (person) {
                return response.status(204).json(person);
            } else {
                return response.status(404).json({
                    error: "Not found",
                });
            }
        })
        .catch((error) => next(error));
});

const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {

    if (["CastError", "ValidationError"].includes(error.name)) {
        return response.status(400).send({ error: error.message });
    }

    next(error);
};

// handler of requests with result to errors
app.use(errorHandler);

// LAUNCH
const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
