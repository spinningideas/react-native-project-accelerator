import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { navigateViaRef } from 'src/services/NavigationService';
import HomeScreen from 'src/screens/HomeScreen';
import ContactScreen from 'src/screens/ContactScreen';
import ContinentsScreen from 'src/screens/ContinentsScreen';
import CountriesListScreen from 'src/screens/CountriesListScreen';
import CountryScreen from 'src/screens/CountryScreen';
import SearchScreen from 'src/screens/SearchScreen';

export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();

export const appNavigate = (routeName, routeData) => {
  navigateViaRef(navigationRef, routeName, routeData);
};

const Stack = createStackNavigator();

const AppNavigationScreens = (props) => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: props.locData.home }} />
      <Stack.Screen name="Continents" component={ContinentsScreen} options={{ title: props.locData.continents }} />
      <Stack.Screen name="CountriesList" component={CountriesListScreen} options={{ title: props.locData.countries }} />
      <Stack.Screen name="Country" component={CountryScreen} options={{ title: props.locData.country }} />
      <Stack.Screen name="Contact" component={ContactScreen} options={{ title: props.locData.contact }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: props.locData.search }} />
    </Stack.Navigator>
  );
};

export default AppNavigationScreens;
