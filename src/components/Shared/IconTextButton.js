import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  highLightContainer: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
    marginBottom: 5
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  icon: {
    height: 25,
    width: 25,
    color: '#616161'
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2
  }
});

const IconTextButton = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} style={styles.highLightContainer} underlayColor="#9e9e9e">
      <View style={styles.container}>
        <Icon style={styles.icon} name={props.icon} />
        {props.text && <Text style={styles.text}>{props.text}</Text>}
      </View>
    </TouchableHighlight>
  );
};

export default IconTextButton;
