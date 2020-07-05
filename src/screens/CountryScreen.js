import React, { useState, useEffect } from 'react';
import LoadingIndicator from 'src/components/Shared/LoadingIndicator';
import CountryCard from 'src/components/Country/CountryCard';
import GeographyService from 'src/services/GeographyService';

const CountryScreen = ({ route }) => {
	const [selectedContinent, setSelectedContinent] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const { country } = route.params;

  const geographyService = GeographyService();

  useEffect(() => {
    let continent = geographyService.getContinentByContinentCode(country.continentCode);
		setSelectedContinent(continent);
    setSelectedCountry(country);    
  }, [country]);

  if (selectedCountry == null || selectedContinent == null) {
    return <LoadingIndicator />;
  } else {
    return <CountryCard country={selectedCountry} continent={selectedContinent} />;
  }
};

export default CountryScreen;
