-   `npx create-react-app app` - fast way to start a react app.
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
            <p>
                Hello {props.name}, you are {props.age} years old
            </p>
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
    const name = "Peter";
    const age = 10;

    return (
        <>
            <h1>Greetings</h1>
            <Hello name="Maya" age={26 + 10} />
            <Hello name={name} age={age} />
            <Footer />
        </>
    );
};
```

Browsers do not support all the latest features that JavaScript has to offer.  
This is why does has to be _transpiled_ from a newer version of JavaScript to an older version of JavaScript that the browser can understand.

The most popular tool for this is [Babel](https://babeljs.io/).

> I know that most web bundlers like Webpack and Parcel use Babel under the hood.

Simple example of using React hooks & state:

```jsx
import { useState } from "react";

const App = () => {
    const [counter, setCounter] = useState(0);

    setTimeout(() => {
        setCounter(counter + 1), 1000;
    });

    return <div>{counter}</div>;
};

export default App;
```

In the above example, `counter` is set to `0` initially as defined in `useState()`.  
`setCounter()` is then used to modify the state. In this example it will increment counter by 1 for every second (1000ms = 1s).

When `setCounter()` is called, React re-renders the component meaning `setTimeout()` gets called again.

Setting state mistakes:

The reason why the last 2 are not allowed is because it _mutates state directly_ and this could have unexpected side effects:

```jsx
const plus = () => setCounter(counter + 1); //ok
const plus = () => setCounter(counter++); //wrong
const plus = () => setCounter((counter += 1)); //wrong
```

Passing events mistakes:

```jsx
<button onClick={setCounter(counter + 1)}>plus</button>       //wrong
<button onClick={() => setCounter(counter + 1)}>plus</button> // ok
```

First example is wrong because an event handler is supposed to be a _function_ or _function reference_ and not a _function call_. You can also return a function that returns another function (closure).

```jsx
function hello() {
    const handler = () => {
        console.log("Hello");
    };
    return handler;
}

// Arrow function returning another arrow function
// Slightly more confusing but more concise
const Hello = () => () => {
    console.log("Hello");
};
```

If you use arrays in `useState()` make sure to use pure functions like `concat()` rather than `push()` as push modifies the original array while concat returns a copy.

Do not use React hooks from inside a loop, a conditional expression, or any place that is not a function defining a component. Declare them at the top level of your React function.

Note that this is does not refer to `setName()` or examples like this.

This is to ensure that hooks are always called in the same order.

```jsx
const App = () => {
  // these are ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
}
```

Do not define components within another component:

```jsx
const App = () => {
    // Don't do this. Instead move it outside App
    const Display = props => <div>{props.something}</div>; // No no
    return <div>App</div>;
};

export default App;
```

Passing props as object to component that destructures:

```jsx

let obj = {
    a,
    b,
    c
}

<MyJSX {...object} />
<MyJSX {...{a, b, c}} /> // simpler

```
