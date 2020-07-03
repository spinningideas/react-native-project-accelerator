import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements';
import GeographyService from 'src/services/GeographyService';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  title: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: '#222222',
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
  const [searchText, setSearchText] = useState('');
	const [searchResultsData, setSearchResultsData] = useState([]);
	
	const geographyService = GeographyService();

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
			chevron={<Icon color="#444444" name="arrow-forward" />}
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
					color: '#222222'
				}}
				placeholderTextColor='#222222'
        inputContainerStyle={{
          backgroundColor: '#e5e5e5',
          color: '#222222'
        }}
        inputStyle={{
          backgroundColor: '#e5e5e5',
          color: '#222222'
        }}
        searchIcond
        clearIcon
        lightTheme
        onChangeText={(text) => handleSearch(text)}
        onClear={() => handleSearch('')}
        placeholder="Search"
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
