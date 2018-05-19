import React from 'react';
import { webViewStyle, transparentColor } from '../styles/Styles';
import {WebView, ActivityIndicator, View, TextInput, BackHandler, TextStyle, StyleProp} from 'react-native';
import { NavState } from 'react-native';

export interface Props {
    url: string;
    style?: StyleProp<TextStyle>;
    hideAddressBar?: boolean;
    canGoBack?: boolean;
}

export default class InlineWebView extends React.Component<Props, any> {
    state: any = {
        loading: false
    };

    constructor(props: any) {
        super(props);
    }

    onNavigationStateChange = (navState: NavState) => {
        this.setState({...navState});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.props.hideAddressBar ? null :
                <TextInput
                    selectTextOnFocus={true}
                    underlineColorAndroid={transparentColor}
                    multiline={true}
                    style={{
                        textAlign: 'center',
                        padding: 5,
                }}>{this.props.url}</TextInput>}
                <WebView
                    source={{uri: this.props.url}}
                    startInLoadingState={false}
                    onNavigationStateChange={this.onNavigationStateChange}
                    style={this.props.style ? this.props.style : webViewStyle.webView}
                />
                {this.state.loading ? <ActivityIndicator size='large' color='#009688' style={webViewStyle.activityIndicator}/> : null}
            </View>
        );
    }
}
