import React from "react";

const PersonForm = ({ events, values }) => {
    let { addPerson, resetInput, handleNameChange, handleNumberChange } =
        events;
    let { newName, newNumber } = values;
    return (
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
    );
};

export default PersonForm;
