import React from 'react';
import { FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import GeographyService from 'src/services/GeographyService';

const ContinentsScreen = ({ navigation }) => {

	const geographyService = GeographyService();

  const onPressContinent = (item) => {
    navigation.navigate('CountriesList', { continent: item });
  };

  const renderContinents = ({ item }) => (
    <ListItem
      key={item.continentCode}
      title={item.continentName}
      subtitle={`${geographyService.getNumberCountriesByContinentCode(item.continentCode)} countries`}
      chevron={<Icon color="#444444" name="arrow-forward" />}
      bottomDivider
      onPress={() => onPressContinent(item)}
    />
  );

  const continents = geographyService.getContinents();

  return <FlatList data={continents} renderItem={renderContinents} keyExtractor={(item) => `${item.continentCode}`} />;
};

export default ContinentsScreen;
