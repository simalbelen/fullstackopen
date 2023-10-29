import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Title from "./components/Title";
import { useEffect } from "react";
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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

  const handleClick = (event) => {
    event.preventDefault();
    if (newName === "") {
      alert(`You need to write a name to continue`);
    } else if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
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

  return (
    <div>
      <Title text={"Phonebook"}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Title text={"Add a new"}/>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleClick={handleClick}
      />
      <Title text={"Numbers"}/>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
