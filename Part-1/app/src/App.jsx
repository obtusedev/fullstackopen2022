import "./App.css";

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

export default App;
