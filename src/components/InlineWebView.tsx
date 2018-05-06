import React from 'react';
import { webViewStyle } from '../styles/Styles';
import { WebView, ActivityIndicator, View } from 'react-native';

export default class InlineWebView extends React.Component<any, any> {
    state: any = {
        loading: false
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <WebView
                    source={{uri: this.props.url}}
                    startInLoadingState={false}
                    onNavigationStateChange={(state) => { this.setState(state); }}
                    style={this.props.style ? this.props.style : webViewStyle.webView}
                />
                {this.state.loading ? <ActivityIndicator size='large' color='#009688' style={webViewStyle.activityIndicator}/> : null}
            </View>
        );
    }
}
