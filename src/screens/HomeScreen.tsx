import React from 'react';
import {Image, Linking, Text, View} from 'react-native';
import {textStyle, viewStyle} from "../styles/Styles";

export default class HomeScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Home',
    };

    render() {
        return (
            <View style={viewStyle.view}>
                <Text>Open up App.ts to start working on your app!</Text>
                <Text>Changes you make will automatically reload.</Text>
                <Text>Shake your phone to open the developer menu.</Text>
                <Text onPress={() => Linking.openURL('exp://exp.host/@willem_liu/react-native-ts?tmdbMovieId=500')} style={textStyle.button}>Linking</Text>
                <Text onPress={() => this.props.navigation.navigate('Details', {depth: 0, name: 'Willem Liu'})} style={textStyle.button}>Details</Text>
                <Text onPress={() => this.props.navigation.navigate('Donate', {url: 'https://app.moviesom.com'})} style={textStyle.button}>MovieSom</Text>
            </View>
        );
    }
}
