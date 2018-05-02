import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class FilmographyScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Filmography',
    };

    filmography = (params: any) => {
        const navigate = NavigationActions.navigate({
            routeName: 'Details',
            params,
            // action: NavigationActions.navigate({ routeName: 'FilmographyScreen', params })
        });
        this.props.navigation.dispatch(navigate);
    }

    render() {
        return (
            <ScrollView style={styles.scrollView}>
                <Text>Filmography</Text>
                <Text>Depth {this.props.navigation.getParam('depth')}.</Text>
                <Text>Filmography {this.props.navigation.getParam('name')}.</Text>
                <Text onPress={() => this.filmography({
                    depth: this.props.navigation.getParam('depth') + 1,
                    name: this.props.navigation.getParam('name')
                    })
                } style={styles.textButton}>Filmography {this.props.navigation.getParam('depth') + 1}</Text>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollView: {
      backgroundColor: '#fff',
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#008CBA',
        padding: 15,
        margin: 5,
        borderRadius: 2,
        borderColor: '#008CBA',
        borderWidth: 1,
        textAlign: 'center'
    }
});
