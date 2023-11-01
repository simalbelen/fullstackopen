import { useState } from 'react';
import Filter from './components/Filter'
import CountryList from './components/CountryList';
import countriesService from './services/countries'
import { useEffect } from 'react';

const App = () => {
  const [newFilter, setNewFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  //Carga inicial
  useEffect(() => {
      countriesService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
      .catch()
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  useEffect(() => {
      if (newFilter === ""){
        setFilteredCountries([])
      } else {
        const matchingCountries = countries.filter((country) => {
          const countryName = country.name.common
          return countryName.includes(newFilter)
        })
        if (matchingCountries.length > 0){
          setFilteredCountries(matchingCountries)
        } else {
          setFilteredCountries([])
        }
      }
  }, [newFilter]);
  

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <CountryList countries={filteredCountries} />
    </div>
  );
};

export default App
