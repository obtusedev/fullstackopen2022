import { useState } from "react";

const dummyData = [
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
];

const App = () => {
    const [persons, setPersons] = useState(dummyData);
    const [newName, setNewName] = useState("Jane Doe");
    const [newNumber, setNewNumber] = useState("123 456-7890");
    // for users that match input filter
    const [match, setMatch] = useState([]);

    const resetInput = e => {
        if (e.target.id === "name") {
            setNewName("");
            e.target.value = newName;
        } else if (e.target.id === "number") {
            setNewNumber("");
            e.target.value = newNumber;
        }
    };

    const handleNameChange = e => setNewName(e.target.value);
    const doesPersonExist = name =>
        persons.find(person => person.name === name);

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

    const handleNumberChange = e => setNewNumber(e.target.value);

    const handleFilterInputChange = e => {
        // reset the matched names so you don't end up with duplicates
        setMatch([]);
        // if filter input is set to empty the just return all persons
        if (e.target.value === "") return displayNumbers;
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

    const displayNumbers = () => {
        if (match.length === 0) {
            return persons.map(person => (
                <p key={person.name}>
                    {person.name} - {person.number}
                </p>
            ));
        } else {
            return match.map(person => (
                <p key={person.name}>
                    {person.name} - {person.number}
                </p>
            ));
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            filter show with
            <input type="text" onChange={handleFilterInputChange} />
            <h3>add a new</h3>
            <form onSubmit={addPerson}>
                <div>
                    name:
                    <input
                        id="name"
                        type="text"
                        value={newName}
                        onChange={handleNameChange}
                        onClick={resetInput}
                    />
                    <br />
                    number:
                    <input
                        id="number"
                        type="text"
                        value={newNumber}
                        onChange={handleNumberChange}
                        onClick={resetInput}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {displayNumbers()}
        </div>
    );
};

export default App;
