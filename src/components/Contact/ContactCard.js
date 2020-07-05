import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, ListItem, Input, Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
		margin: 0,
		padding:0,
    justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 0
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    textAlign: 'center'
  },
  labelValue: {
    fontSize: 24,
    color: '#616161'
  }
});

const ContactCard = (props) => {
	
	return (
		<Card style={styles.container}>
			<ListItem
				title='Name'
				subtitle={
					<View>
						<Input placeholder='Name'/>
					</View>
				}
			></ListItem>
			<ListItem
				title='Email'
				subtitle={
					<View>
						<Input placeholder='Email'/>
					</View>
				}				
			/>
			<ListItem
				title='Message'
				subtitle={
					<View>
						<Input placeholder='Message'/>
					</View>
				}
				bottomDivider
			/>			
			<Button
				title='Cancel'
				type='outline'
			/>
			<Button	title='Save' />
		</Card>
	);
};

export default ContactCard;