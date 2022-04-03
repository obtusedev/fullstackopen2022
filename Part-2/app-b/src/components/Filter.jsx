import React from "react";

const Filter = ({ events }) => {
    let { handleFilterInputChange } = events;
    return (
        <div>
            filter show with
            <input type="text" onChange={handleFilterInputChange} />
        </div>
    );
};

export default Filter;
