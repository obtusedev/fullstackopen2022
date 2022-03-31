import { useState } from "react";

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};

const App = () => {
    const [counter, setCounter] = useState(0);

    const incrementCounter = () => setCounter(counter + 1);

    const resetCounter = () => setCounter(0);

    return (
        <div>
            <Display counter={counter} />

            <Button text="plus" onClick={incrementCounter} />
            <Button text="reset" onClick={resetCounter} />
        </div>
    );
};

export default App;
