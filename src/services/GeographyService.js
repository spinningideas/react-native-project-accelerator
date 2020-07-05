import { continents } from 'src/services/data/continents';
import { countries } from 'src/services/data/countries';

const GeographyService = () => {
  const getContinents = () => {
    return continents;
  };

  const getCountriesByContinentCode = (continentCode) => {
    const countriesArray = [];
    countries.map((country) => {
      if (country.continentCode === continentCode) {
        countriesArray.push(country);
      }
    });
    return countriesArray;
  };

  const getCountryByCountryCode = (countryCode) => {
    let results = countries.filter((country) => country.countryCode === countryCode);
    if (results.length > 0) {
      return results[0];
    }
    return null;
  };

  const getContinentByContinentCode = (continentCode) => {
    let results = continents.filter((continent) => continent.continentCode === continentCode);
    if (results.length > 0) {
      return results[0];
    }
    return null;
  };

  const getNumberCountriesByContinentCode = (continentCode) => {
    let count = 0;
    countries.map((data) => {
      if (data.continentCode === continentCode) {
        count++;
      }
    });
    return count;
  };

  const searchCountriesByCountryName = (countryName) => {
    const nameUpper = countryName.toUpperCase();
    const resultsArray = [];
    countries.map((data) => {
      if (data.countryName.toUpperCase().includes(nameUpper)) {
        resultsArray.push(data);
      }
    });
    return resultsArray;
  };

  return {
    getContinents,
    getCountriesByContinentCode,
    getCountryByCountryCode,
    getContinentByContinentCode,
    getNumberCountriesByContinentCode,
    searchCountriesByCountryName
  };
};

export default GeographyService;
