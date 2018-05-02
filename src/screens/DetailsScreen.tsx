import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';

export default class DetailsScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Details',
    };

    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text>Details</Text>
                <Text>Depth {this.props.navigation.getParam('depth')}.</Text>
                <Text>Details {this.props.navigation.getParam('name')}.</Text>

                <Text onPress={() => this.props.navigation.navigate('Details', {
                    depth: this.props.navigation.getParam('depth') + 1,
                    name: this.props.navigation.getParam('name')
                })} style={styles.textButton}>Details {this.props.navigation.getParam('depth') + 1}</Text>

                <Text>1Open up App.ts to start working on your app!</Text>
                <Text>2Changes you make will automatically reload.</Text>
                <Text>3Shake your phone to open the developer menu.</Text>
                <Text>4Open up App.ts to start working on your app!</Text>
                <Text>5Changes you make will automatically reload.</Text>
                <Text>6Shake your phone to open the developer menu.</Text>
                <Text>7Open up App.ts to start working on your app!</Text>
                <Text>8Changes you make will automatically reload.</Text>
                <Text>9Shake your phone to open the developer menu.</Text>
                <Text>10Open up App.ts to start working on your app!</Text>
                <Text>11Changes you make will automatically reload.</Text>
                <Text>12Shake your phone to open the developer menu.</Text>
                <Text>13Open up App.ts to start working on your app!</Text>
                <Text>14Changes you make will automatically reload.</Text>
                <Text>15Shake your phone to open the developer menu.</Text>
                <Text>16Open up App.ts to start working on your app!</Text>
                <Text>17Changes you make will automatically reload.</Text>
                <Text>18Shake your phone to open the developer menu.</Text>
                <Text>19Open up App.ts to start working on your app!</Text>
                <Text>20Changes you make will automatically reload.</Text>
                <Text>21Shake your phone to open the developer menu.</Text>
                <Text>22Open up App.ts to start working on your app!</Text>
                <Text>23Changes you make will automatically reload.</Text>
                <Text>24Shake your phone to open the developer menu.</Text>
                <Text>25Open up App.ts to start working on your app!</Text>
                <Text>26Changes you make will automatically reload.</Text>
                <Text>27Shake your phone to open the developer menu.</Text>
                <Text>28Open up App.ts to start working on your app!</Text>
                <Text>29Changes you make will automatically reload.</Text>
                <Text>30Shake your phone to open the developer menu.</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
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
