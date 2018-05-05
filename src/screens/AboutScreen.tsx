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
                    style={textStyle.button}
                    onPress={() => this.props.navigation.navigate('Donate')}
                >Donate</TouchTextButton>
            </View>
        );
    }
}
