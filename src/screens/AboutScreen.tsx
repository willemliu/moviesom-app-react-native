import React from 'react';
import { Image, Text, View } from 'react-native';
import {textStyle, viewStyle} from "../styles/Styles";

export default class AboutScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'About',
    };

    render() {
        return (
            <View style={viewStyle.view}>
                <Text>About {this.props.navigation.getParam('name')}.</Text>
                <Text style={textStyle.button} onPress={() => this.props.navigation.navigate('Donate')}>Donate.</Text>
            </View>
        );
    }
}
