import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("Jane Doe");
    const [newNumber, setNewNumber] = useState("123 456-7890");
    // for users that match input filter
    const [match, setMatch] = useState([]);

    const fetchData = () => {
        axios.get("http://localhost:3001/persons").then(res => setPersons(res.data));
    }

    useEffect(fetchData, []);

    const resetInput = e => {
        if (e.target.id === "name") {
            setNewName("");
            e.target.value = newName;
        } else if (e.target.id === "number") {
            setNewNumber("");
            e.target.value = newNumber;
        }
    };

    const addPerson = e => {
        e.preventDefault();
        let person = {
            name: newName,
            number: newNumber,
        };
        if (person.name === "" || person.number === "") return;
        if (doesPersonExist(person.name) !== undefined) {
            // run if the user already exists.
            alert(`${person.name} is already added to phonebook`);
            return;
        }
        setPersons(persons.concat(person));
        setNewName(""); // reset name input
        setNewNumber(""); // reset number input
    };

    const handleNameChange = e => setNewName(e.target.value);

    const doesPersonExist = name =>
        persons.find(person => person.name === name);

    const handleNumberChange = e => setNewNumber(e.target.value);

    const handleFilterInputChange = e => {
        // reset the matched names so you don't end up with duplicates
        setMatch([]);
        // if filter input is set to empty the just return all persons
        if (e.target.value === "") return;
        persons.filter(person => {
            if (
                person.name.toLowerCase().includes(e.target.value.toLowerCase())
            ) {
                // if person already exist in match do nothing
                if (match.includes(person)) return;
                setMatch(match.concat(person));
            }
        });
    };

    const display = () => {
        if (match.length === 0) {
            return <Persons persons={persons} />;
        } else {
            return <Persons persons={match} />;
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter events={{ handleFilterInputChange }} />
            <h3>add a new</h3>
            <PersonForm
                events={{
                    resetInput,
                    addPerson,
                    handleNameChange,
                    handleNumberChange,
                }}
                values={{ newName, newNumber }}
            />
            <h2>Numbers</h2>
            {display()}
        </div>
    );
};

export default App;
