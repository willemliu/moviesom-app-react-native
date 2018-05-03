import React from 'react';
import { Image, Text, View } from 'react-native';
import {textStyle, viewStyle} from "../styles/Styles";
import { WebBrowser } from 'expo';

export default class AboutScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'About',
        drawerIcon: () => (
            <Image
                source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=2`}}
                style={{width: 30, height: 30, borderRadius: 15}}
            />
        ),
    };

    render() {
        return (
            <View style={viewStyle.view}>
                <Text>About {this.props.navigation.getParam('name')}.</Text>
                <Text style={textStyle.button} onPress={() => WebBrowser.openBrowserAsync('https://www.moviesom.com/donate.html')}>Donate.</Text>
            </View>
        );
    }
}
