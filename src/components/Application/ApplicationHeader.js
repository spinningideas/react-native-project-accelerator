import React, { useState } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import AuthDialog from 'src/components/Application/AuthDialog';
import LanguageDialog from 'src/components/Application/LanguageDialog';
import Entypo from 'react-native-vector-icons/Entypo';
Entypo.loadFont();

const { width } = Dimensions.get('window');

let headerStyles = {
  backgroundColor: '#ffffff',
  justifyContent: 'flex-start',
  paddingTop: 0,
  height: 50
};
/*
Header has too much top padding - this seems to be an android issue ONLY
styles above attempt to address this 

if(Platform.Version <= 20){
	headerStyles['paddingTop'] = 0;
	headerStyles['height'] = 0;
}
*/

const styles = StyleSheet.create({
  rightButtonContainer: {
    flex: 1,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  rightButton: {
    textAlign: 'right',
    width: 60
  }
});

const ApplicationHeader = (props) => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [langDialogOpen, setLangDialogOpen] = useState(false);

  const toggleLangDialogOpen = () => {
    let open = !langDialogOpen;
    setLangDialogOpen(open);
  };

  const toggleAuthDialogOpen = () => {
    let open = !authDialogOpen;
    setAuthDialogOpen(open);
  };

  const onSignIn = () => {
    setAuthDialogOpen(false);
    props.triggerAppAuthEvent(true);
  };

  const onSignOut = () => {
    setAuthDialogOpen(false);
    props.triggerAppAuthEvent(false);
  };

  const getApplicationTitle = () => {
    if (width < 768) {
      return 'RNPA';
    }
    return 'React Native Project Accelerator';
  };

  return (
    <View>
      <Header
        placement="left"
        statusBarProps={{ barStyle: 'light-content' }}
        containerStyle={headerStyles}
        leftComponent={<Icon color="#616161" name="menu" navigation={props.navigation} onPress={props.openDrawer} />}
        centerComponent={{
          text: getApplicationTitle(),
          style: { color: '#616161', fontWeight: 'bold', fontSize: 22 }
        }}
        rightComponent={
          <View style={styles.rightButtonContainer}>
            <Icon
              style={styles.rightButton}
              containerStyle={{ marginRight: 20 }}
              color="#616161"
              type="entypo"
              name="language"
              navigation={props.navigation}
              onPress={toggleLangDialogOpen}
            />
            <Icon
              style={styles.rightButton}
              color="#616161"
              name="account-circle"
              navigation={props.navigation}
              onPress={toggleAuthDialogOpen}
            />
          </View>
        }
      />
      <AuthDialog
        userHasSignedIn={props.userHasSignedIn}
        open={authDialogOpen}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        onDialogClose={toggleAuthDialogOpen}
      />
      <LanguageDialog open={langDialogOpen} onDialogClose={toggleLangDialogOpen} />
    </View>
  );
};

export default ApplicationHeader;
