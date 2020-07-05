import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
  const localizationService = LocalizationService();

  useEffect(() => {
    async function loadLocData() {
      const locCode = await localizationService.getUserLocale();
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
        locCode
      );
      setLocData(locDataLoaded);
    }
    loadLocData();
  }, []);

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
