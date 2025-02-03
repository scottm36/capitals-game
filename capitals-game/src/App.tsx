import { useState } from 'react'
import './App.css'

  // array of countries and capitals
  const countriesAndCapitals = [
    { country: 'United States', capital: 'Washington, D.C.' },
    { country: 'Canada', capital: 'Ottawa' },
    { country: 'United Kingdom', capital: 'London' },
    { country: 'Australia', capital: 'Canberra' },
    { country: 'New Zealand', capital: 'Wellington' },    
    { country: 'France', capital: 'Paris' },
    { country: 'Germany', capital: 'Berlin' },
    { country: 'Italy', capital: 'Rome' },
    { country: 'Spain', capital: 'Madrid' },
    { country: 'Portugal', capital: 'Lisbon' },
  ];
  
  // const countriesAndCapitals = [
  //   { country: 'Japan', capital: 'Tokyo' },
  //   { country: 'China', capital: 'Beijing' },
  //   { country: 'Brazil', capital: 'Brasília' },
  //   { country: 'Argentina', capital: 'Buenos Aires' },
  //   { country: 'Chile', capital: 'Santiago' },
  //   { country: 'South Africa', capital: 'Cape Town' },
  //   { country: 'Egypt', capital: 'Cairo' },
  //   { country: 'India', capital: 'New Delhi' },
  //   { country: 'Russia', capital: 'Moscow' },
  //   { country: 'South Korea', capital: 'Seoul' }, 
  // ];
  
  const initialCountries = [
    ...countriesAndCapitals.map((item) => item.country)
  ].sort(() => Math.random() - 0.5)
  
  const initialCapitals = [
    ...countriesAndCapitals.map((item) => item.capital)
  ].sort(() => Math.random() - 0.5)
  
  function App() {
  
    const [gameStarted, setGameStarted] = useState(false);
    const [matched, setMatched] = useState(false);
    const [countries, setCountries] = useState<string[]>(initialCountries);
    const [capitals, setCapitals] = useState<string[]>(initialCapitals);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedCapital, setSelectedCapital] = useState<string | null>(null);
  
    const startGame = () => {
      setGameStarted(true);
    };
  
    const handleCountryClick = (country: string) => {  
      setSelectedCountry(country);
      checkAnswer();
    };
  
    const handleCapitalClick = (capital: string) => {
      setSelectedCapital(capital);
      if (checkAnswer()) {
      //   setMatched(true);
      //   setCountries(countries.filter(c => c !== selectedCountry));
      //   setCapitals(capitals.filter(c => c !== selectedCapital));
      }
      // setSelectedCapital(null);
    };    
  
    const checkAnswer = () => {
      let countriesLength = countries.length;
      if(!selectedCountry || !selectedCapital)
          return false;
      if(selectedCapital === countriesAndCapitals
          .find((item) => item.country === selectedCountry)?.capital) {
        // remove both buttons
        const newCountries = countries.filter((item) => {
          if(item === selectedCountry) {
            capitals.splice(capitals.indexOf(countriesAndCapitals.find((item) => item.country === selectedCountry)?.capital ?? ''), 1);
            // remove matching country from array
            countries.splice(countries.indexOf(selectedCountry), 1);  
            return false;
          }
          return true;
        })
        if (newCountries.length < countriesLength) {  
          setMatched(true);
          setCountries(newCountries);
          setCapitals(capitals.filter((item) => {
              if(item === selectedCountry) {
                capitals.splice(capitals.indexOf(countriesAndCapitals.find((item) => item.country === selectedCountry)?.capital ?? ''), 1);
                // remove matching country from array
                countries.splice(countries.indexOf(selectedCountry), 1);  
                return false;
              }   
              return true;
              })
          );
          return true;
        }
        setMatched(false);
        return false;
      //   setCountries(newCountries);
      //   setSelectedCapital(capitals); 
      } else {
        setMatched(false);
        setSelectedCountry(null);
        setSelectedCapital(null);
        return false;
      }
  
    }
    if (matched) {
      setMatched(false);
    }
  
    return (
      <>
        {gameStarted ? (
          <div>
            <h1>Country Capital Game</h1>
            <p>Match each country with its capital</p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '1rem'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1rem',
              }}>
                {countries.map((item, index) => (
                  <>
                  <button style={{backgroundColor: selectedCountry === item ? 'blue' : 'black'}} 
                      onClick={() => handleCountryClick(item)} key={item}>{item}</button>
                  <button style={{backgroundColor: selectedCapital === capitals[index] ? 'blue' : 'black'}} 
                      onClick={() => handleCapitalClick(capitals[index])} key={capitals[index]}>{capitals[index]}</button>
                  </>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <button onClick={startGame}>
            Start Game
          </button>           
        )}
      </>
    )
  }
  
export default App
