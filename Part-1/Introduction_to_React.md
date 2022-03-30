- `npx create-react-app app` - fast way to start a react app.
> I personally prefer vite as it is faster and easier to use and setup.
> `npm init @vite-latest app` then follow the prompts.


JSX is xml like. Babel is used under the hood to transform JSX into JavaScript.
You can write React without JSX instead using "raw JavaScript" but this is not recommended for your sanity.

A core philosophy of React is to combine reusable components into a complex application while keeping the app maintainable.

Passing props to components:
```jsx
const Hello = props => {
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    );
};

const App = () => {
    const name = "Peter";
    const age = 10;

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="Alice" />
            <Hello name="Bob" />
            <Hello name="foo" />
            <Hello name={name} age={age} />
        </div>
    );
};
```

Component names must be capitalized! This is to prevent name collision with regular HTML elements.

App can only have one root element (usually a `<div>`):

```jsx
// Error
const App = () => {
    return (
        <h1>hi</h1>
        <Hello name="Maya" age="34" />
        <Footer />
    )
}

// No Error
const App = () => {
    return (
        <div>
            <h1>hi</h1>
            <Hello name="Maya" age="34" />
            <Footer />
        </div>
    )
}

// You can also use an array of components
const App = () => {
    return [
        <h1>Hi</h1>,
        <Hello name="Alice" age="22" />
        <Footer />
    ]
}
```

You can avoid the extra `<div>` by using fragments.

```jsx
const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Footer />
    </>
  )
}
```
