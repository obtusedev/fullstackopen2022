import { useState } from "react";

const Heading = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => (
    <tbody>
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    </tbody>
);

const Statistics = ({ good, neutral, bad, total }) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return <p>No feedback given</p>;
    }
    return (
        <>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="total" value={total} />
            <StatisticsLine text="average" value={(good - bad) / total} />
            <StatisticsLine
                text="positive"
                value={`${(good / total) * 100}%`}
            />
        </>
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
            <table>
                <Statistics
                    {...{ good, neutral, bad, total: good + neutral + bad }}
                />
            </table>
        </div>
    );
};

export default App;
