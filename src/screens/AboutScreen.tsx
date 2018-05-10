import React from 'react';
import { Image, Text, View } from 'react-native';
import {textStyle, viewStyle} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';

export default class AboutScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'About',
    };

    render() {
        return (
            <View style={viewStyle.view}>
                <Text>MovieSom app developed by {this.props.navigation.getParam('name')}.</Text>
                <TouchTextButton
                    onPress={() => requestAnimationFrame(() => this.props.navigation.navigate('Web', {
                        url: 'https://www.moviesom.com/donate.html',
                        hideAddressBar: true
                    }))}
                >Donate</TouchTextButton>
            </View>
        );
    }
}
