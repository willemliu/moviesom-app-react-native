import React from 'react';
import {Image, Linking, Text, View} from 'react-native';
import {textStyle, viewStyle} from "../styles/Styles";

export default class HomeScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Home',
        drawerIcon: () => (
            <Image
            source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=1`}}
            style={{width: 30, height: 30, borderRadius: 15}}
            />
        ),
    };

    render() {
        return (
            <View style={viewStyle.view}>
                <Text>Open up App.ts to start working on your app!</Text>
                <Text>Changes you make will automatically reload.</Text>
                <Text>Shake your phone to open the developer menu.</Text>
                <Text onPress={() => Linking.openURL('exp://exp.host/@willem_liu/react-native-ts?tmdbMovieId=500')} style={textStyle.button}>Linking</Text>
                <Text onPress={() => this.props.navigation.navigate('Details', {depth: 0, name: 'Willem Liu'})} style={textStyle.button}>Details</Text>
            </View>
        );
    }
}
