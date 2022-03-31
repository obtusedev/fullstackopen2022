import { useState } from "react";

const App = () => {
    const [counter, setCounter] = useState(0);

    const incrementCounter = () => setCounter(counter + 1);

    const resetCounter = () => setCounter(0);

    return (
        <div>
            <div>{counter}</div>
            {/* You can also do
          <button onClick={() => console.log("Clicked")}>Increment</button>
          this forces the component to re-render.
        */}
            <button onClick={incrementCounter}>Increment</button>
            <button onClick={resetCounter}>Reset</button>
        </div>
    );
};

export default App;
