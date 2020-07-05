import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ContactCard from 'src/components/Contact/ContactCard';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1
  }
});

const ContactScreen = () => {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleContactScreenSave = (name, email, message) => {
    setContactInfo({
      name: name,
      email: email,
      message: message
    });
  };

  return (
    <View style={styles.container}>
      <ContactCard contactInfo={contactInfo} onSave={handleContactScreenSave} />
    </View>
  );
};

export default ContactScreen;
