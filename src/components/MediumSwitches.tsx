import React from 'react';
import {View, Text} from 'react-native';
import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native';
import LabeledSwitch from './LabeledSwitch';

export interface Props {
    handleOnBluRay: (newValue: boolean) => void;
    handleOnDvd: (newValue: boolean) => void;
    handleOnDigital: (newValue: boolean) => void;
    handleOnOther: (newValue: boolean) => void;
    blu_ray: string;
    dvd: string;
    digital: string;
    other: string;
    value?: boolean;
    style?: StyleProp<ViewStyle>;
}

export default class MediumSwitches extends React.PureComponent<Props, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return [
            <Text key="title" style={{marginTop: 10, textAlign: 'center', fontWeight: 'bold'}}>In your collection</Text>,
            (
                <View key="switches" style={{flex: 0, flexDirection: 'row', flexWrap: 'wrap'}}>
                    <LabeledSwitch
                        onValueChange={this.props.handleOnBluRay}
                        style={{width: '50%'}}
                        value={this.props.blu_ray === '1'}
                    >Blu-ray</LabeledSwitch>
                    <LabeledSwitch onValueChange={this.props.handleOnDvd}
                        style={{width: '50%'}}
                        value={this.props.dvd === '1'}
                    >DVD</LabeledSwitch>
                    <LabeledSwitch onValueChange={this.props.handleOnDigital}
                        style={{width: '50%'}}
                        value={this.props.digital === '1'}
                    >Digital</LabeledSwitch>
                    <LabeledSwitch onValueChange={this.props.handleOnOther}
                        style={{width: '50%'}}
                        value={this.props.other === '1'}
                    >Other</LabeledSwitch>
                </View>
            )
        ];
    }
}
