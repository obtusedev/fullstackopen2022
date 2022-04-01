import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("Jane Doe");

    const resetInput = e => {
        setNewName("");
        e.target.value = newName;
    };

    const handlePersonChange = e => setNewName(e.target.value);
    const doesPersonExist = name =>
        persons.find(person => person.name === name);

    const addPerson = e => {
        e.preventDefault();
        let person = {
            name: newName,
        };
        if (person.name === "") return;
        if (doesPersonExist(person.name) !== undefined) {
            // run if the user already exists.
            alert(`${person.name} is already added to phonebook`);
            return;
        }
        setPersons(persons.concat(person));
        setNewName("");
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name:{" "}
                    <input
                        value={newName}
                        onChange={handlePersonChange}
                        onClick={resetInput}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => (
                <p key={person.name}>{person.name}</p>
            ))}
        </div>
    );
};

export default App;
