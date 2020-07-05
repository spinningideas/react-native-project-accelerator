import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import AppContext from 'src/AppContext';
import LocalizationService from 'src/services/LocalizationService';
import Notification from 'src/components/Shared/Notification';
import ContactCard from 'src/components/Contact/ContactCard';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1
  }
});

const ContactScreen = () => {
	const [locData, setLocData] = useState({});
	
	const { localeCode } = useContext(AppContext);

  const localizationService = LocalizationService();

  useEffect(() => {
    async function loadLocData() {
      const locDataLoaded = await localizationService.getLocalizedTextSet(
        [
          'contact',
          'contactdescription',
          'save',
          'cancel',
          'name',
          'email',
          'message',
          'messagedescription',
          'required'
        ],
        localeCode
      );
      setLocData(locDataLoaded);
    }
    loadLocData();
  }, [localeCode]);

  const handleContactScreenSave = (contactInfo) => {
    const notification = Notification();
    return notification.show('Contact submitted: ' + contactInfo.name);
  };

  return (
    <View style={styles.container}>
      <ContactCard locData={locData} onSubmit={handleContactScreenSave} />
    </View>
  );
};

export default ContactScreen;
