import React from 'react';
import InlineWebView from "../components/InlineWebView";
import { navigationParamsToProps } from '../utils/navigation';

export interface Props {
    url: string;
}
class WebScreen extends React.PureComponent<Props, any> {
    render() {
        return (
            <InlineWebView {...this.props}/>
        );
    }
}

export default navigationParamsToProps(WebScreen);
