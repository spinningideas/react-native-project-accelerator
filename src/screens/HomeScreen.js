import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import AuthService from 'src/services/AuthService';
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

const HomeScreen = ({ navigation }) => {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [locData, setLocData] = useState({});

  const authService = AuthService();
  const localizationService = LocalizationService();

  const homePageContentItems = [
    { id: 'continents', title: 'View Continents', onPressItem: () => navigation.navigate('Continents', {}) },
    { id: 'search', title: 'Search', onPressItem: () => navigation.navigate('Search', {}) }
  ];

  useEffect(() => {
    let userHasSignedIn = authService.userHasSignedIn();
    setUserSignedIn(userHasSignedIn);
  }, []);

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
      chevron={<Icon color="#444444" name="arrow-forward" />}
    ></ListItem>
  );

  return (
    <View style={styles.container}>
      <HomePageCard locData={locData} />
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
