import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'react-native-elements';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from 'src/AppContext';
import { theme } from 'src/AppStyles';
import AppNavigationScreens, { appNavigate, navigationRef } from 'src/AppNavigation';
import AuthService from 'src/services/AuthService';
import LocalizationService from 'src/services/LocalizationService';
import ApplicationHeader from 'src/components/Application/ApplicationHeader';
import SideMenuDrawer from 'src/components/Application/SideMenuDrawer';

export default App = () => {
  const [userHasSignedIn, setUserHasSignedIn] = useState(false);
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
    }
    loadLocData();
  }, []);

  const onAuthEvent = (userSignedIn) => {
    setUserHasSignedIn(userSignedIn);
  };

  return (
    <AppContextProvider value={{ userHasSignedIn: userHasSignedIn }}>
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
              triggerAppAuthEvent={onAuthEvent}
              openDrawer={() => drawer.openDrawer()}
            />
            <AppNavigationScreens locData={locData} />
          </DrawerLayout>
        </NavigationContainer>
      </ThemeProvider>
    </AppContextProvider>
  );
};
