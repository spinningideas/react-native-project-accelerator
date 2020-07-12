import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import IconTextButton from 'src/components/Shared/IconTextButton';
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    margin: 0,
    height: height,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 0
  },
  drawerHeader: {
		height: 50,
		margin: 0
	}, 
  drawerClose: {
		marginTop: 20,
    height: 45,
		width: 45,
		left: 250
  },
  drawerMenu: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
});

const SideMenuDrawer = (props) => {
  const navigateFromLink = (routeName) => {
    props.navigate(routeName);
    props.closeDrawer();
  };

  const MenuListItem = (props) => (
    <IconTextButton text={props.text} icon={props.icon} onPress={() => navigateFromLink(props.route)}></IconTextButton>
  );

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
				<View style={styles.drawerClose}>
					<IconTextButton icon='close' onPress={props.closeDrawer}></IconTextButton>      
				</View>
      </View>
      <View style={styles.drawerMenu}>
        <MenuListItem text={props.locData.home} icon='home' route='Home' />
        <MenuListItem text={props.locData.continents} icon='explore' route='Continents' />
        <MenuListItem text={props.locData.search} icon='search' route='Search' />
        <MenuListItem text={props.locData.contact} icon='contact-mail' route='Contact' />
      </View>
    </View>
  );
};

export default SideMenuDrawer;
