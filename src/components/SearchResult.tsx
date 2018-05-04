import { TouchableOpacity, View, Text } from 'react-native';
import React from 'react';
import { searchResultStyle } from '../styles/Styles';

export interface Props {
    handleOnPress: (id: number) => void;
    id: number;
    title: string;
    description: string;
}

export default class SearchResult extends React.Component<Props, any> {

    handleOnPress = () => {
        if (this.props.handleOnPress) { this.props.handleOnPress(this.props.id); }
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handleOnPress}>
                <View style={searchResultStyle.view}>
                    <Text>{this.props.id} {this.props.title}</Text>
                    <Text>{this.props.description}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
