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
		color: '#444444'
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2
  }
});

const IconTextButton = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} style={styles.highLightContainer} underlayColor="#e5e5e5">
      <View style={styles.container}>
        <Icon style={styles.icon} name={props.icon} />
        {props.title && <Text style={styles.text}>{props.title}</Text>}
      </View>
    </TouchableHighlight>
  );
};

export default IconTextButton;
