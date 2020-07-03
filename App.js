import 'react-native-gesture-handler';
import React, { useEffect, useState }  from 'react';
import { ThemeProvider } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import HomeScreen from 'src/screens/HomeScreen';
import ContinentsScreen from 'src/screens/ContinentsScreen';
import CountriesListScreen from 'src/screens/CountriesListScreen';
import CountryScreen from 'src/screens/CountryScreen';
import SearchScreen from 'src/screens/SearchScreen';
import ApplicationHeader from 'src/components/Application/ApplicationHeader';
import SideMenuDrawer from 'src/components/Application/SideMenuDrawer';

import AuthService from 'src/services/AuthService';
import { navigateViaRef } from 'src/services/NavigationService';

export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();

const theme = {
	colors:{
		background: '#ffffff',
		text: '#222222',
		border: '#222222'
	},
	Card:{
		margin: 0,
		containerStyle:{margin: 0}
	},
  Button: {
    raised: false
  }
};

const Stack = createStackNavigator();

const AppNavigationScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="Continents" component={ContinentsScreen} options={{ title: 'Continents' }} />
      <Stack.Screen name="CountriesList" component={CountriesListScreen} options={{ title: 'Countries' }} />
      <Stack.Screen name="Country" component={CountryScreen} options={{ title: 'Country' }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
    </Stack.Navigator>
  );
};

const appNavigate = (routeName, routeData) => {
  navigateViaRef(navigationRef, routeName, routeData);
};

export default App = () => {
	const [userSignedIn, setUserSignedIn] = useState(false);
	const authService = AuthService();

  useEffect(() => {
    let userHasSignedIn = authService.userHasSignedIn();
    setUserSignedIn(userHasSignedIn);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}
      >
        <DrawerLayout
          ref={(drawer) => {
            this.drawer = drawer;
          }}
          drawerWidth={300}
          keyboardDismissMode="on-drag"
          drawerPosition={DrawerLayout.positions.Left}
          drawerType={'front'}
          drawerBackgroundColor="#ffffff"
          overlayColor={'transparent'}
          renderNavigationView={() => (
            <SideMenuDrawer closeDrawer={() => drawer.closeDrawer()} navigate={appNavigate} />
          )}
          contentContainerStyle={{}}
        >
          <ApplicationHeader authService={authService} openDrawer={() => drawer.openDrawer()} />
          <AppNavigationScreens />
        </DrawerLayout>
      </NavigationContainer>
    </ThemeProvider>
  );
};
