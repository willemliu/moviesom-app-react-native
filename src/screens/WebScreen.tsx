import React from 'react';
import {textStyle, viewStyle, webViewStyle} from "../styles/Styles";
import InlineWebView from "../components/InlineWebView";
import { navigationParamsToProps } from '../utils/navigation';

class WebScreen extends React.Component<any> {
    render() {
        return (
            <InlineWebView {...this.props}/>
        );
    }
}

export default navigationParamsToProps(WebScreen);
