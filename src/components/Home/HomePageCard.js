import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 0
  },
  section: {
    fontSize: 20,
    color: '#212121',
    textAlign: 'left',
    marginBottom: 10
  }
});

const HomePageCard = (props) => {
  return (
    <Card style={styles.container}>
      <Text style={styles.section}>{props.locData.homepagewelcome}</Text>
      <Text style={styles.section}>{props.locData.aboutdescription}</Text>
      <Text style={styles.section}>{props.locData.getstartedmessage}</Text>
      {props.userHasSignedIn && <Text style={styles.section}>{props.locData.authenticatedcontentdescription}</Text>}
    </Card>
  );
};

export default HomePageCard;
