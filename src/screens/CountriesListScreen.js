import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import GeographyService from 'src/services/GeographyService';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    marginTop: 1
  },
  title: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: '#212121',
    textAlign: 'center'
  },
  listContainer: {
    marginTop: 0
  }
});

const CountriesListScreen = ({ route, navigation }) => {
	const { continent } = route.params;
	
	const geographyService = GeographyService();

  const countriesArray = geographyService.getCountriesByContinentCode(route.params.continent.continentCode);

  const onPressCountry = (item) => {
    navigation.navigate('Country', { country: item });
  };

  const renderCountriesList = ({ item }) => (
    <ListItem
      key={item.countryCode}
      title={item.countryName}
      subtitle={
        <View>
          <Text>Population: {item.population.toLocaleString()}</Text>
        </View>
      }
      chevron={<Icon color='#616161' name='arrow-forward' />}
      bottomDivider
      onPress={() => onPressCountry(item)}
    ></ListItem>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{continent.continentName}</Text>
      <FlatList
        style={styles.listContainer}
        data={countriesArray}
        renderItem={renderCountriesList}
        keyExtractor={(item) => `${item.countryId}`}
      ></FlatList>
    </View>
  );
};

export default CountriesListScreen;
