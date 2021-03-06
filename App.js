import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
// Navigation
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigationScreens, { appNavigate, navigationRef, isReadyRef } from 'src/AppNavigation';
// Context
import { AppContextProvider } from 'AppContext';
// Styling and themeing
import { ThemeProvider } from 'react-native-elements';
import { theme } from 'src/AppStyles';
// Services
import AuthService from 'src/services/AuthService';
import LocalizationService from 'src/services/LocalizationService';
// Components
import ApplicationHeader from 'src/components/Application/ApplicationHeader';
import SideMenuDrawer from 'src/components/Application/SideMenuDrawer';

export default App = () => {
  const [userHasSignedIn, setUserHasSignedIn] = useState(false);
  const [localeCode, setLocaleCode] = useState('enUS');
  const [locData, setLocData] = useState({});
  const authService = AuthService();
  const localizationService = LocalizationService();

  useEffect(() => {
    let userSignedIn = authService.userHasSignedIn();
    setUserHasSignedIn(userSignedIn);
  }, []);

  useEffect(() => {
    async function loadLocData() {
      const locCode = await localizationService.getUserLocale();
      const locDataLoaded = await localizationService.getLocalizedTextSet(
        ['home', 'continents', 'countries', 'country', 'search', 'contact'],
        locCode
      );
      setLocData(locDataLoaded);
      setLocaleCode(locCode);
    }
    loadLocData();
  }, [localeCode]);

  const onAuthEvent = (userSignedIn) => {
    setUserHasSignedIn(userSignedIn);
  };

  const onLocaleSelectEvent = (locCode) => {
    setLocaleCode(locCode);
  };

  return (
    <AppContextProvider value={{ userHasSignedIn: userHasSignedIn, localeCode: localeCode }}>
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
              <SideMenuDrawer locData={locData} closeDrawer={() => drawer.closeDrawer()} navigate={appNavigate} />
            )}
            contentContainerStyle={{}}
          >
            <ApplicationHeader
              authService={authService}
              userHasSignedIn={userHasSignedIn}
              triggerOnAppAuthEvent={onAuthEvent}
              triggerOnLocaleEvent={onLocaleSelectEvent}
              openDrawer={() => drawer.openDrawer()}
            />
            <AppNavigationScreens locData={locData} />
          </DrawerLayout>
        </NavigationContainer>
      </ThemeProvider>
    </AppContextProvider>
  );
};
