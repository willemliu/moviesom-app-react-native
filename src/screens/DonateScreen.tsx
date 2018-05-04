import React from 'react';
import {textStyle, viewStyle, webViewStyle} from "../styles/Styles";
import InlineWebView from "../components/InlineWebView";

export default class DonateScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Donate',
    };

    render() {
        return (
            <InlineWebView url={this.props.navigation.getParam('url', 'https://www.moviesom.com/donate.html')}/>
        );
    }
}
