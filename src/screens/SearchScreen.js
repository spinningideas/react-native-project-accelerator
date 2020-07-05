import React, { useEffect, useState, useContext } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements';
import AppContext from 'src/AppContext';
import GeographyService from 'src/services/GeographyService';
import LocalizationService from 'src/services/LocalizationService';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  title: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: '#212121',
    textAlign: 'center'
  },
  listItemContainer: {
    flex: 1,
    margin: 10,
    marginTop: 10,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 0
  },
  listItemText: {
    margin: 10,
    textAlign: 'center'
  }
});

const SearchScreen = ({ navigation }) => {
	const [locData, setLocData] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchResultsData, setSearchResultsData] = useState([]);

  const geographyService = GeographyService();
	const localizationService = LocalizationService();
	
  const { userHasSignedIn } = useContext(AppContext);

  useEffect(() => {
    async function loadLocData() {
      const locCode = await localizationService.getUserLocale();
      const locDataLoaded = await localizationService.getLocalizedTextSet(
        ['search'],
        locCode
      );
      setLocData(locDataLoaded);
    }
    loadLocData();
  }, []);

  const handleSearch = (text) => {
    var searchResultsArray = geographyService.searchCountriesByCountryName(text);
    if (text == '') {
      setSearchText('');
      setSearchResultsData([]);
    } else {
      setSearchText(text);
      setSearchResultsData(searchResultsArray);
    }
  };

  const onPressCountry = (item) => {
    navigation.navigate('Country', { country: item });
  };

  const renderCountries = ({ item }) => (
    <ListItem
      key={item.countryCode}
      title={item.countryName}
      chevron={<Icon color="#616161" name="arrow-forward" />}
      bottomDivider
      onPress={() => onPressCountry(item)}
    ></ListItem>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
          color: '#212121'
        }}
        placeholderTextColor="#212121"
        inputContainerStyle={{
          backgroundColor: '#eeeeee',
          color: '#212121'
        }}
        inputStyle={{
          backgroundColor: '#eeeeee',
          color: '#212121'
        }}
        searchIcond
        clearIcon
        lightTheme
        onChangeText={(text) => handleSearch(text)}
        onClear={() => handleSearch('')}
        placeholder={locData.search}
        value={searchText}
      />
      <FlatList
        vertical
        data={searchResultsData}
        renderItem={renderCountries}
        keyExtractor={(item) => `${item.countryId}`}
      />
    </View>
  );
};

export default SearchScreen;
