import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function Country(country) {
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
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
        </div>
    );
}

function App() {
    const [countries, setCountries] = useState([]);
    const [showDetails, setShowDetails] = useState({ show: false, name: "" });

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
        // sort alphabetically
        matched.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));
        setCountries(matched);
    };

    const showMore = () => {
        let country = countries.find(c => c.name.common === showDetails.name);
        if (showDetails.show) {
            return <Country {...country} />;
        }
    };

    const handleInput = e => {
        fetchCountries(e.target.value);
    };

    const handleClick = e => {
        setShowDetails(prevState => ({
            ...prevState,
            show: !prevState.show,
            name: e.target.id,
        }));
    };

    const display = () => {
        if (countries.length > 10) {
            return <p>Too many matches, specify another filter</p>;
        } else if (countries.length > 1 && countries.length <= 10) {
            return countries.map(country => {
                return (
                    <div key={country.name.official}>
                        <span>{country.name.common}</span>
                        <button id={country.name.common} onClick={handleClick}>
                            show
                        </button>
                    </div>
                );
            });
        } else if (countries.length === 1) {
            return <Country {...countries[0]} />;
        }
    };

    return (
        <div>
            find countries <input onChange={handleInput} />
            <div>{display()}</div>
            <div>{showMore()}</div>
        </div>
    );
}

export default App;
