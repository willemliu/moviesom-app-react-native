import React from 'react';
import {textStyle, viewStyle, webViewStyle} from "../styles/Styles";
import InlineWebView from "../components/InlineWebView";

export default class WebScreen extends React.Component<any> {
    render() {
        return (
            <InlineWebView url={this.props.navigation.getParam('url', 'https://www.moviesom.com/donate.html')}/>
        );
    }
}
