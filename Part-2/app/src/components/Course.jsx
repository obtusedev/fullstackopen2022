import React from "react";

const Course = ({ course }) => {
    // the 0 sets the inital value of total to 0.
    let totalCourse = course.parts.reduce(
        (total, part) => total + part.exercises,
        0
    );
    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map(part => (
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>
            ))}
            <p>
                <b>total of {totalCourse} exercises</b>
            </p>
        </div>
    );
};

export default Course;
