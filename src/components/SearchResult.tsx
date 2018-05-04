import {TouchableOpacity, View, Text, Image} from 'react-native';
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
            <TouchableOpacity onPress={this.handleOnPress} activeOpacity={0.9}>
                <View style={searchResultStyle.view}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image
                            style={searchResultStyle.image}
                            resizeMode='contain'
                            source={{uri: 'https://image.tmdb.org/t/p/w92/30oXQKwibh0uANGMs0Sytw3uN22.jpg'}}
                            loadingIndicatorSource={require('../../assets/eyecon48x48grey.png')}
                        />
                        <View style={{flex: 3}}>
                            <Text style={searchResultStyle.title}>{this.props.id} {this.props.title}</Text>
                            <Text>{this.props.description}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
