import React from 'react';
import { TouchableHighlight, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 180,
    padding: 8,
    margin: 10,
    backgroundColor: 'white',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },
  btnIcon: {
    height: 17,
    width: 17
  }
});

const ImageButton = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} style={styles.btnContainer}>
      <Image source={require(props.source)} style={styles.btnIcon} />
    </TouchableHighlight>
  );
};

export default ImageButton;
