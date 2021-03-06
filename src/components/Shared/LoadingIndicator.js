import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.horizontal} size="large" color="#616161" />
    </View>
  );
};

export default LoadingIndicator;
