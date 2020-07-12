import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import AppContext from 'AppContext';
import LocalizationService from 'src/services/LocalizationService';

const styles = StyleSheet.create({
  dialogContainer: {
    margin: 0,
    padding: 10
  },
  dialogTitle: {
    marginBottom: 10,
    fontSize: 20
  }
});

const AuthDialog = (props) => {
  const [locData, setLocData] = useState({});
  const { localeCode } = useContext(AppContext);
  const localizationService = LocalizationService();

  useEffect(() => {
    async function loadLocData() {
      const locDataLoaded = await localizationService.getLocalizedTextSet(
        ['signin', 'signindescription', 'signout'],
        localeCode
      );
      setLocData(locDataLoaded);
    }
    loadLocData();
  }, [localeCode]);

  const AuthButton = (props) => {
    return <Button title={props.title} onPress={props.onClick}></Button>;
  };

  const SignInView = () => {
    return (
      <View>
        <Text style={styles.dialogTitle}>{locData.signindescription}</Text>
        <AuthButton title={locData.signin} onClick={props.onSignIn} />
      </View>
    );
  };

  return (
    <Overlay
      isVisible={props.open}
      windowBackgroundColor='#ffffff'
      overlayBackgroundColor='#ffffff'
      width='auto'
      height='auto'
      onBackdropPress={props.onDialogClose}
    >
      <View style={styles.dialogContainer}>
        {props.userHasSignedIn && <AuthButton title={locData.signout} onClick={props.onSignOut} />}
        {!props.userHasSignedIn && <SignInView />}
      </View>
    </Overlay>
  );
};

export default AuthDialog;
