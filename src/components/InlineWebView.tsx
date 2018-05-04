import React from 'react';
import { webViewStyle } from '../styles/Styles';
import { WebView, ActivityIndicator } from 'react-native';

export default class InlineWebView extends React.Component<any> {
    render() {
        return (
            <WebView
                source={{uri: this.props.url}}
                startInLoadingState={true}
                renderLoading={() => <ActivityIndicator size='large' color='#009688' style={webViewStyle.activityIndicator}/>}
                style={this.props.style ? this.props.style : webViewStyle.webView}
            />
        );
    }
}
