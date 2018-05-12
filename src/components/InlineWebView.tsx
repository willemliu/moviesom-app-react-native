import React from 'react';
import { webViewStyle, transparentColor } from '../styles/Styles';
import { WebView, ActivityIndicator, View, TextInput, BackHandler } from 'react-native';

export default class InlineWebView extends React.Component<any, any> {
    state: any = {
        loading: false
    };

    private webRef: any;
    private lastUrl: any;

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        if (this.props.canGoBack) {
            console.log('WebView canGoBacjkjhlk');
            BackHandler.addEventListener('hardwareBackPress', this.backHandler);
        }
    }

    backHandler = (): boolean => {
        if (this.webRef && this.state.url !== this.lastUrl && this.props.canGoBack && this.state.canGoBack) {
            console.log('GOBACK!', this.state.url, this.lastUrl);
            this.lastUrl = this.state.url;
            this.webRef.goBack();
            return true;
        }
        return false;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
    }

    onNavigationStateChange = (navState: any) => {
        this.setState({
            ...navState,
        });
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
                    ref={(ref: any) => this.webRef = ref}
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
