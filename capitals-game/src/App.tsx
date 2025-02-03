import { useState } from 'react'
import './App.css'

// array of countries and capitals
interface CountryItem {
  name: string;
  capital: string;
  selected: boolean;
  matched: boolean;
}

interface CapitalItem {
  name: string;
  country: string;
  selected: boolean;
  matched: boolean;
}

// const Game = () => {
function App() {
  const [countries, setCountries] = useState([
    { name: 'United Kingdom', capital: 'London', selected: false, matched: false },
    { name: 'United States', capital: 'Washington, D.C.', selected: false, matched: false },
    { name: 'Italy', capital: 'Rome', selected: false, matched: false },
    { name: 'Canada', capital: 'Ottawa', selected: false, matched: false },
    { name: 'Portugal', capital: 'Lisbon', selected: false, matched: false },
    { name: 'New Zealand', capital: 'Wellington', selected: false, matched: false },
    { name: 'Australia', capital: 'Canberra', selected: false, matched: false },
    { name: 'France', capital: 'Paris', selected: false, matched: false },
    { name: 'Spain', capital: 'Madrid', selected: false, matched: false },
    { name: 'Germany', capital: 'Berlin', selected: false, matched: false }
  ]);

  const [capitals, setCapitals] = useState([
    { name: 'Washington, D.C.', country: 'United States', selected: false, matched: false },
    { name: 'Rome', country: 'Italy', selected: false, matched: false },
    { name: 'London', country: 'United Kingdom', selected: false, matched: false },
    { name: 'Berlin', country: 'Germany', selected: false, matched: false },
    { name: 'Lisbon', country: 'Portugal', selected: false, matched: false },
    { name: 'Paris', country: 'France', selected: false, matched: false },
    { name: 'Wellington', country: 'New Zealand', selected: false, matched: false },
    { name: 'Canberra', country: 'Australia', selected: false, matched: false },
    { name: 'Ottawa', country: 'Canada', selected: false, matched: false },
    { name: 'Madrid', country: 'Spain', selected: false, matched: false }
  ]);

  const [selectedCountry, setSelectedCountry] = useState<CountryItem | null>(null);
  const [selectedCapital, setSelectedCapital] = useState<CapitalItem | null>(null);

  const resetSelections = () => {
    setCountries(countries.map(c => ({ ...c, selected: false })));
    setCapitals(capitals.map(c => ({ ...c, selected: false })));
    setSelectedCountry(null);
    setSelectedCapital(null);
  };

  // const initialCountries = [
  //   ...countriesAndCapitals.map((item) => item.country)
  // ].sort(() => Math.random() - 0.5)

  // const initialCapitals = [
  //   ...countriesAndCapitals.map((item) => item.capital)
  // ].sort(() => Math.random() - 0.5)


  const [gameStarted, setGameStarted] = useState(false);


  const startGame = () => {
    setGameStarted(true);
  };

  const handleCountryClick = (country: CountryItem) => {
    // Reset any incorrect matches
    if (selectedCountry && selectedCapital) {
      resetSelections();
      return;
    }

    setCountries(countries.map(c => ({
      ...c,
      selected: c.name === country.name
    })));
    setSelectedCountry(country);

    // Check for match if a capital is already selected
    if (selectedCapital) {
      if (country.capital === selectedCapital.name) {
        // Match found
        setCountries(countries.map(c => ({
          ...c,
          matched: c.name === country.name ? true : c.matched
        })));
        setCapitals(capitals.map(c => ({
          ...c,
          matched: c.name === selectedCapital.name ? true : c.matched
        })));
        resetSelections();
      }
    }
  };

  const handleCapitalClick = (capital: CapitalItem) => {
    // Reset any incorrect matches
    if (selectedCountry && selectedCapital) {
      resetSelections();
      return;
    }

    setCapitals(capitals.map(c => ({
      ...c,
      selected: c.name === capital.name
    })));
    setSelectedCapital(capital);

    // Check for match if a country is already selected
    if (selectedCountry) {
      if (selectedCountry.capital === capital.name) {
        // Match found
        setCountries(countries.map(c => ({
          ...c,
          matched: c.name === selectedCountry.name ? true : c.matched
        })));
        setCapitals(capitals.map(c => ({
          ...c,
          matched: c.name === capital.name ? true : c.matched
        })));
        resetSelections();
      }
    }
  };

  return (
    <>
      {gameStarted ? (
        <div className="game-container">
          <h1>Country Capital Game</h1>
          <p>Match each country with its capital</p>
          <div className="game-grid">
            <div className="column">
              <h2>Countries</h2>
              <div className="button-container">
                {countries.map((country) => (
                  !country.matched && (
                    <button
                      key={country.name}
                      className={`game-button ${country.selected ? 'selected' : ''} 
                        ${selectedCountry?.name === country.name && selectedCapital && 
                        country.capital !== selectedCapital.name ? 'incorrect' : ''}`}
                      onClick={() => handleCountryClick(country)}
                    >
                      {country.name}
                    </button>
                  )
                ))}
              </div>
            </div>
            <div className="column">
              <h2>Capitals</h2>
              <div className="button-container">
                {capitals.map((capital) => (
                  !capital.matched && (
                    <button
                      key={capital.name}
                      className={`game-button ${capital.selected ? 'selected' : ''} 
                        ${selectedCapital?.name === capital.name && selectedCountry && 
                        selectedCountry.capital !== capital.name ? 'incorrect' : ''}`}
                      onClick={() => handleCapitalClick(capital)}
                    >
                      {capital.name}
                    </button>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={startGame}>Start Game</button>
      )}
    </>
  );
}

export default App
