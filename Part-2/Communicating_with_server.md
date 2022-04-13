Objectives:

-   Rendering data collections.
-   Submitting data to React application using HTML forms.
-   Fetching data and storing to backend.
-   Styling React app with CSS.

Using `map` to create list of elements:

```jsx
items.map(item => <li key={item.id}>{item.name}</li>); // don't forget to add a key
```

Using array index as keys is an Anti-Pattern:

Wow didn't know this. Guilty of doing this.

```jsx
items.map((item, index) => <li key={index}>{item.name}</li>);
```

The reason being if you push or remove an element from the array, the index will point to another item and React might point to the wrong element.

> React uses _index_ as _key_ if no key is passed. [source](https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318#1917)

There are some situations where you don't need a key (from the article):

1. The list and items are static-they are not computed and do not change.
2. The items in the list have no ids.
3. The list is _never_ ordered or filtered.

When _all_ 3 conditions are met, you **safely use the index as a key**.

Controlled components:

Event parameter is the event that triggers the call to the event handler function. The event handler calls `event.preventDefault()` to prevent the default behavior of submitting a form, which includes causing the page to reload.

event is usually shortened to just `e`.

```jsx
const addNote = event => {
    event.preventDefault();
    console.log("saved!", event.target); // this will log the entire form below
};

<form onSubmit={addNote}>
    <input type="text" />
    <button type="submit">save</button>
</form>;
```

Important to register a event handler to `onChange()` for input that way:

-   The input value isn't just controlled by state.
-   React can synchronize the changes with the components state.

```jsx
const [newNote, setNewNote] = useState("write here...");

const handleNoteChange = event => {
    console.log(event.target.value);
    setnewNote(event.target.value);
};
<form onSubmit={addNote}>
    <input type="text" value={newNote} onChange={handleNoteChange} />
    <button type="submit">save</button>
</form>;
```

The event handler is called everytime change occurs in the input element.
Note that `event.preventDefault()` is **not** needed since there is no default action that occurs for input.

React comments:

```jsx

{
    // ok
}

{
    /*
    *
    */
}

{//} // this will give errors
// because the closing bracket } is considered to be part of the comment and is thus ignored, which throws an error. (https://stackoverflow.com/questions/30766441/how-to-use-comments-in-react)

{/* */}
```

Forms:

form - onSubmit
input - value, onChange, onClick

```jsx
// keeps the value in sync with state.
const handleNumberChange = e => setNewNumber(e.target.value);
<input value={newNumber} onChange={handleNumberChange} />;
```

This small error had me stuck for a while:

```jsx
return match.map(person => {
    <p key={person.name}>
        {person.name} - {person.number}
    </p>;
});
```

Do you see the error?

It is the `{}` right after the arrow function.

```jsx
return match.map(person => (
    <p key={person.name}>
        {person.name} - {person.number}
    </p>
));
```

Because inside jsx `{}` is interpreted as JS expression. Remember multiline JSX is wrapped with `()`.

Or you can do return twice:

```jsx
return match.map(person => {
    return (
        <p key={person.name}>
            {person.name} - {person.number}
        </p>
    );
});
```

Passing handlers and events to the child form data rather than inside the form itself. Makes it easier to pass state from parent to child.

`App.jsx`

```jsx
<PersonForm
    events={{
        resetInput,
        addPerson,
        handleNameChange,
        handleNumberChange,
    }}
    values={{ newName, newNumber }}
/>
```

`PersonForm.jsx`

```jsx
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
```

Pass a event function has `events{{handleClick}}` so that you can destructure it if needed.

Effect hooks:

```
The Effect Hook lets you perform side effects on function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.
```

`useEffect()`:

```jsx
useEffect(() => {
    axios.get("site.com/api/user").then(response => setNotes(response.data));
}, []);
```

For better readability:

```jsx
const fetchData = () => {
    axios.get("site.com/api/user").then(response => setNotes(response.data));
};

useEffect(fetchData, []);
```


Only use concat if you want to add to past state and not if you want to replace the state altogether. This caught me up a bit. That way you don't need to "reset" to inital state.

```javascript
const countries, setCountries = useState([]);
setCountries(countries.concat(newCountries));
setCountries(newCountries);

// I was doing this to try to reset state
setCountries([]);
```
