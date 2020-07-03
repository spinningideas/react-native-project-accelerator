import React from 'react';
import { View } from 'react-native';
import { Button, Overlay } from 'react-native-elements';

const AuthButton = (props) => {
  return <Button title={props.title} onPress={props.onClick}></Button>;
};

const AuthDialog = (props) => {
  return (
    <Overlay
      isVisible={props.open}
      windowBackgroundColor="#ffffff"
      overlayBackgroundColor="#ffffff"
      width="auto"
      height="auto"
      onBackdropPress={props.onDialogClose}
    >
      <View>
        {props.userSignedIn && <AuthButton title="Sign Out" onClick={props.onSignOut} />}
        {!props.userSignedIn && <AuthButton title="Sign in" onClick={props.onSignIn} />}
      </View>
    </Overlay>
  );
};

export default AuthDialog;
