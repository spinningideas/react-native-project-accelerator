import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  title: {
    flex: 1,
    alignSelf: 'flex-start',
    flexDirection: 'column',
    fontSize: 20
  },
  logo: {
    flex: 1,
    marginTop: 50,
    flexDirection: 'column',
    alignSelf: 'center',
    width: 150,
    height: 150
  }
});

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Project Accelerator</Text>
      <Image style={styles.logo} source={require('assets/icons/logo-100.png')} />
    </View>
  );
};

export default SplashScreen;
