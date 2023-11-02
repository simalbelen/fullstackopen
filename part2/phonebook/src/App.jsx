import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Title from "./components/Title";
import { useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");
    const [filteredPersons, setFilteredPersons] = useState(persons);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorType, setErrorType] = useState(null);

    // Carga los contactos al iniciar la app
    useEffect(() => {
        personService
            .getAll()
            .then((response) => {
                setPersons(response.data);
            })
            .catch((error) => {
                console.log(error.response.data.error);
                handleNotification(error.response.data.error, "error");
            });
    }, []);

    //Se actualiza la lista de contactps al aplicar un filtro o al modificar la lista de personas
    useEffect(() => {
        if (newFilter === "") {
            setFilteredPersons(persons);
        } else {
            const filterRegex = new RegExp(newFilter, "i"); // 'i' makes it case-insensitive
            setFilteredPersons(
                persons.filter((person) => filterRegex.test(person.name))
            );
        }
    }, [persons, newFilter]);

    // Crea una nueva persona
    const handleAdd = (event) => {
        event.preventDefault();
        if (newName === "") {
            alert(`You need to write a name to continue`);
        } else if (persons.some((person) => person.name === newName)) {
            handleEditNumber(newName, newNumber);
        } else {
            const newPerson = {
                name: newName,
                number: newNumber,
            };
            personService
                .create(newPerson)
                .then((response) => {
                    setPersons(persons.concat(response.data));
                    handleNotification(`Added ${newName}`, "info");
                    setNewName("");
                    setNewNumber("");
                })
                .catch((error) => {
                    console.log(error.response.data.error);
                    handleNotification(error.response.data.error, "error");
                });
        }
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personService
                .deleteObj(id)
                .then((response) => {
                    const filtered = persons.filter((person) => {
                        return person.id != id;
                    });
                    setPersons(filtered);
                    handleNotification(`Deleted ${name}`, "info");
                })
                .catch((error) => {
                    console.log(error.response.data.error);
                    handleNotification(error.response.data.error, "error");
                });
        }
    };

    const handleEditNumber = (name, newNumber) => {
        if (
            window.confirm(
                `${name} is arleady added to phonebook, replace the old number with a new one?`
            )
        ) {
            let oldPerson = persons.find((person) => person.name === name);
            console.log(oldPerson);
            const changedPerson = { ...oldPerson, number: newNumber };
            personService
                .update(oldPerson.id, changedPerson)
                .then((response) => {
                    setPersons(
                        persons.map((person) =>
                            person.id !== response.data.id
                                ? person
                                : response.data
                        )
                    );
                    handleNotification(`Edited ${name}`, "info");
                })
                .catch((error) => {
                    console.log(error.response.data.error);
                    handleNotification(error.response.data.error, "error");
                });
        }
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        console.log(event.target.value);
        setNewFilter(event.target.value);
    };

    const handleNotification = (text, type) => {
        setErrorType(type);
        setErrorMessage(text);
        setTimeout(function () {
            setErrorMessage(null);
        }, 2000);
    };

    return (
        <div>
            <Notification message={errorMessage} type={errorType} />
            <Title text={"Phonebook"} />
            <Filter
                newFilter={newFilter}
                handleFilterChange={handleFilterChange}
            />
            <Title text={"Add a new"} />
            <PersonForm
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
                handleAdd={handleAdd}
            />
            <Title text={"Numbers"} />
            <Persons
                filteredPersons={filteredPersons}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default App;
