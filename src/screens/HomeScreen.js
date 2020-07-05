import React, { useEffect, useState, useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import AppContext from 'src/AppContext';
import LocalizationService from 'src/services/LocalizationService';
import HomePageCard from 'src/components/Home/HomePageCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 20
  }
});

const HomeScreen = (props) => {
  const [locData, setLocData] = useState({});

  const { userHasSignedIn } = useContext(AppContext);

  const localizationService = LocalizationService();

  const homePageContentItems = [
    { id: 'continents', title: 'View Continents', onPressItem: () => props.navigation.navigate('Continents', {}) },
    { id: 'search', title: 'Search', onPressItem: () => props.navigation.navigate('Search', {}) },
    { id: 'contact', title: 'Forms Example', onPressItem: () => props.navigation.navigate('Contact', {}) }
  ];

  useEffect(() => {
    async function loadLocalization() {
      const locCode = await localizationService.getUserLocale();

      const locDataLoaded = await localizationService.getLocalizedTextSet(
        [
          'welcome',
          'homepagewelcome',
          'aboutdescription',
          'getstartedmessage',
          'notifications',
          'notificationsdescription',
          'modals',
          'modalsdescription',
          'error',
          'success',
          'view',
          'close',
          'authenticatedcontent',
          'authenticatedcontentdescription',
          'services',
          'serviceexampletitle',
          'serviceexampledescription',
          'forms',
          'formsexample',
          'formsexampledescription'
        ],
        locCode
      );
      setLocData(locDataLoaded);
    }
    loadLocalization();
  }, []);

  const renderHomeContentItems = ({ item }) => (
    <ListItem
      title={item.title}
      onPress={item.onPressItem}
      bottomDivider
      chevron={<Icon color="#616161" name="arrow-forward" />}
    ></ListItem>
  );

  return (
    <View style={styles.container}>
      <HomePageCard locData={locData} userHasSignedIn={userHasSignedIn} />
      <FlatList
        vertical
        showsVerticalScrollIndicator={true}
        numColumns={1}
        data={homePageContentItems}
        renderItem={renderHomeContentItems}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

export default HomeScreen;
