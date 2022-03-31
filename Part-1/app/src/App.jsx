const Header = props => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    );
};

const Part = props => {
    return (
        <p>
            {props.part} {props.exercise}
        </p>
    );
};

const Content = props => {
    let { name: part1, exercises: exercises1 } = props.parts[0];
    let { name: part2, exercises: exercises2 } = props.parts[1];
    let { name: part3, exercises: exercises3 } = props.parts[2];
    return (
        <>
            <Part part={part1} exercise={exercises1} />
            <Part part={part2} exercise={exercises2} />
            <Part part={part3} exercise={exercises3} />
        </>
    );
};

const Total = props => {
    let first = props.parts[0].exercises;
    let second = props.parts[1].exercises;
    let third = props.parts[2].exercises;
    return (
        <>
            <p>Number of exercises {first + second + third}</p>
        </>
    );
};

const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
            },
            {
                name: "State of a component",
                exercises: 14,
            },
        ],
    };
    let {name, parts} = course;
    return (
        <div>
            <Header course={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    );
};

export default App;
