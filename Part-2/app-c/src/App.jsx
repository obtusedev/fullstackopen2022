import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
    const [countries, setCountries] = useState([]);

    const fetchData = name => {
        axios
            .get(`https://restcountries.com/v3.1/name/${name}`)
            .then(res => setCountries(res.data));
    };

    const handleInputChange = e => {
        fetchData(e.target.value);
    };

    //useEffect(fetchData, []);

    const result = () => {
      return countries.length > 10 ? "shit" : "yea"
    }

    return (
        <div>
            find countries
            <input type="text" onChange={handleInputChange} />
            <div>
                {result()}
            </div>
        </div>
    );
}

export default App;
