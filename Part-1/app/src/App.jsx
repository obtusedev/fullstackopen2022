import { useState } from "react";

const Heading = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad, total }) => {
    return (
        <div>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>total {total}</p>
            <p>average {(good - bad) / total}</p>
            <p>positive {(good / total) * 100}%</p>
        </div>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGood = () => setGood(good + 1);
    const handleNeutral = () => setNeutral(neutral + 1);
    const handleBad = () => setBad(bad + 1);

    return (
        <div>
            <Heading text="give feedback" />
            <Button text="good" onClick={handleGood} />
            <Button text="neutral" onClick={handleNeutral} />
            <Button text="bad" onClick={handleBad} />
            <Heading text="statistics" />
            <Statistics
                {...{ good, neutral, bad, total: good + neutral + bad }}
            />
        </div>
    );
};

export default App;
