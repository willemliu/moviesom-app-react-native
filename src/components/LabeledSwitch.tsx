import React from 'react';
import {View, Text} from 'react-native';
import { Switch } from 'react-native';
import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native';

export interface Props {
    onValueChange: (newValue: boolean) => void;
    value?: boolean;
    text?: string;
    children?: string;
    style?: StyleProp<ViewStyle>;
}

export default class LabeledSwitch extends React.PureComponent<Props, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <View style={[{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 2.5, marginBottom: 2.5}, this.props.style]}>
                <Switch onValueChange={this.props.onValueChange} value={this.props.value}/>
                <Text style={{flex: 1, marginRight: 5}}
                      onPress={() => this.props.onValueChange(!this.props.value)}
                >{this.props.text ? this.props.text : this.props.children}</Text>
            </View>
        );
    }
}
