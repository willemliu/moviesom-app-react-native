import React from 'react';
import {Text, View} from 'react-native';
import {textStyle, viewStyle} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';

export default class AboutScreen extends React.PureComponent<any, any> {
    static navigationOptions = {
        title: 'About',
    };

    render() {
        return (
            <View style={viewStyle.view}>
                <Text style={textStyle.loginReason}>MovieSom app developed by {this.props.navigation.getParam('name')}.</Text>
                <Text style={textStyle.loginReason}>This product uses the TMDb API but is not endorsed or certified by TMDb.</Text>
                <Text style={textStyle.loginReason}>If you find this app useful then please make a donation of any amount you see fit.</Text>
                <TouchTextButton
                    onPress={() => requestAnimationFrame(() => this.props.navigation.push('Web', {
                        url: 'https://www.moviesom.com/donate.html',
                        hideAddressBar: true
                    }))}
                >Donate</TouchTextButton>
            </View>
        );
    }
}
