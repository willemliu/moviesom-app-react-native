import {View, Text, Switch, StyleProp, ViewStyle } from 'react-native';
import React from 'react';

export interface Props {
    children?: any;
    self_id: number;
    uuid1: number;
    uuid2: number;
    user_id: number;
    user_id2: number;
    user1: string;
    user2: string;
    alias1: string;
    alias2: string;
    recommend_to: number|null;
    spoiler: string;
    style?: StyleProp<ViewStyle>;
    onPress: (props: Props) => void;
}

export default class MovieBuddyResult extends React.PureComponent<Props, any> {
    render() {
        return (
            <View style={[this.props.style, {flexDirection: 'row', alignItems: 'center', marginTop: 2.5, marginBottom: 2.5}]}>
                <Switch onValueChange={(value: boolean) => {
                    this.props.onPress({
                        ...this.props,
                        recommend_to: (value ? this.props.user_id2 : null)
                    });
                }} value={this.props.recommend_to ? true : false}/>
                <Text style={{flex: 1, marginLeft: 5}}
                    onPress={() => {
                        this.props.onPress({
                            ...this.props,
                            recommend_to: (this.props.recommend_to ? null : this.props.user_id2)
                        });
                    }}
                    >{this.props.alias2 ? this.props.alias2 : this.props.user2}</Text>
            </View>
        );
    }
}
