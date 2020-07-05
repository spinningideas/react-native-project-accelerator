import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import IconTextButton from 'src/components/Shared/IconTextButton';
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    margin: 0,
    height: height,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 0
  },
  drawerHeader: {
    height: 50,
    padding: 10,
    alignItems: 'flex-end'
  },
  drawerClose: {
    height: 50,
    width: 50,
    alignSelf: 'flex-end'
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
		<IconTextButton
			text={props.text}
			icon={props.icon}
			onPress={() => navigateFromLink(props.route)}
		></IconTextButton>
	);

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <IconTextButton style={styles.drawerClose} icon="close" onPress={props.closeDrawer}></IconTextButton>
      </View>
      <View style={styles.drawerMenu}>
        <MenuListItem text={props.locData.home} icon="home" route="Home" />
        <MenuListItem text={props.locData.continents} icon="explore" route="Continents" />
        <MenuListItem text={props.locData.search} icon="search" route="Search" />
				<MenuListItem text={props.locData.contact} icon="contact-mail" route="Contact" />
      </View>
    </View>
  );
};

export default SideMenuDrawer;
