import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
    const [countries, setCountries] = useState([]);

    const fetchCountries = async name => {
        let res = await axios.get("https://restcountries.com/v3.1/all");
        let data = await res.data;
        let regex = new RegExp(name, "i");
        let matched = [];
        data.filter(country => {
            if (regex.test(country.name.common)) {
                matched.push(country);
            }
        });
        setCountries(matched);
    };

    const handleInput = e => {
        fetchCountries(e.target.value);
    };

    const display = () => {
        if (countries.length > 10) {
            return <p>Too many matches, specify another filter</p>;
        } else if (countries.length > 1 && countries.length <= 10) {
            return countries.map(country => (
                <p key={country.name.official}>{country.name.common}</p>
            ));
        } else if (countries.length === 1) {
            return countries.map(country => {
                return (
                    <div key={country.name.common}>
                        <h1>{country.name.common}</h1>
                        <p>capital {country.capital}</p>
                        <p>area {country.area}</p>
                        <h3>languages:</h3>
                        <ul>
                            {Object.values(country.languages).map(lang => (
                                <li key={lang}>{lang}</li>
                            ))}
                        </ul>
                        <img
                            src={country.flags.png}
                            alt={`${country.name.common} flag`}
                        />
                    </div>
                );
            });
        }
    };

    return (
        <div>
            find countries <input onChange={handleInput} />
            <div>{display()}</div>
        </div>
    );
}

export default App;
