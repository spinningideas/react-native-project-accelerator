import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import AuthDialog from 'src/components/Application/AuthDialog';

let headerStyles = {
  backgroundColor: '#ffffff',
  justifyContent: 'flex-start',
  paddingTop: 0,
  height: 50
};
/*
if(Platform.Version <= 20){
	headerStyles['paddingTop'] = 0;
	headerStyles['height'] = 0;
}
*/
const ApplicationHeader = (props) => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [userSignedIn, setUserSignedIn] = useState(false);

  useEffect(() => {
    let userHasSignedIn = props.authService.userHasSignedIn();
    setUserSignedIn(userHasSignedIn);
  }, []);

  const toggleAuthDialogOpen = () => {
    let open = !authDialogOpen;
    setAuthDialogOpen(open);
  };

  return (
    <View>
      <Header
        placement="left"
        statusBarProps={{ barStyle: 'light-content' }}
        containerStyle={headerStyles}
        leftComponent={<Icon color="#444444" name="menu" navigation={props.navigation} onPress={props.openDrawer} />}
        centerComponent={{
          text: 'React Native Project Accelerator',
          style: { color: '#444444', fontWeight: 'bold', fontSize: 22 }
        }}
        rightComponent={
          <Icon color="#444444" name="account-circle" navigation={props.navigation} onPress={toggleAuthDialogOpen} />
        }
      />
			<AuthDialog 
			userSignedIn={userSignedIn} 
			open={authDialogOpen} 
			onSignIn={toggleAuthDialogOpen}
			onSignOut={toggleAuthDialogOpen}
			onDialogClose={toggleAuthDialogOpen} />
    </View>
  );
};

export default ApplicationHeader;
