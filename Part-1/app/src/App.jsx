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
    return (
        <>
            <Part part={props.partList[0]} exercise={props.exerciseList[0]} />
            <Part part={props.partList[1]} exercise={props.exerciseList[1]} />
            <Part part={props.partList[2]} exercise={props.exerciseList[2]} />
        </>
    );
};

const Total = props => {
    return (
        <>
            <p>Number of exercises {props.total}</p>
        </>
    );
};

const App = () => {
    const course = "Half Stack application development";
    const part1 = "Fundamentals of React";
    const exercises1 = 10;
    const part2 = "Using props to pass data";
    const exercises2 = 7;
    const part3 = "State of a component";
    const exercises3 = 14;

    return (
        <div>
            <Header course={course} />
            <Content
                partList={[part1, part2, part3]}
                exerciseList={[exercises1, exercises2, exercises3]}
            />
            <Total total={exercises1 + exercises2 + exercises3} />
        </div>
    );
};

export default App;
