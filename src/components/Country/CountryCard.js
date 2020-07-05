import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

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

const CountryCard = (props) => {
	let country = props.country;
	let continent = props.continent;
	
	return (
		<Card style={styles.container}>
			<ListItem
				title={
					<View>
						<Text style={styles.title}>{country.countryName}</Text>
					</View>
				}
			></ListItem>
			<ListItem
				title="Continent"
				subtitle={
					<View>
						<Text style={styles.labelValue}>{continent.continentName}</Text>
					</View>
				}
				bottomDivider
			/>
			<ListItem
				title="Capital"
				subtitle={
					<View>
						<Text style={styles.labelValue}>{country.capital}</Text>
					</View>
				}
				bottomDivider
			/>
			<ListItem
				title="Area"
				subtitle={
					<View>
						<Text style={styles.labelValue}>{country.area.toLocaleString()}</Text>
					</View>
				}
				bottomDivider
			/>
			<ListItem
				title="Population"
				subtitle={
					<View>
						<Text style={styles.labelValue}>{country.population.toLocaleString()}</Text>
					</View>
				}
				bottomDivider
			/>
			<ListItem
				title="Currency"
				subtitle={
					<View>
						<Text style={styles.labelValue}>{country.currencyCode}</Text>
					</View>
				}
			/>
		</Card>
	);
};

export default CountryCard;