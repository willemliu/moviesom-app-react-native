import React from 'react';
import { Text, View, TouchableNativeFeedback, StyleProp, ViewStyle } from 'react-native';
import { movieSomColor, movieIconsStyle } from '../styles/Styles';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

export interface Props {
    watched?: number;
    imdb?: string;
    homepage?: string;
    size?: number;
    watchedHandler: () => any;
    unWatchedHandler: () => any;
    wantToWatchHandler: () => any;
    shareHandler: () => any;
    imdbHandler?: () => any;
    homepageHandler?: () => any;
    style?: StyleProp<ViewStyle>;
}

export default class MovieIcons extends React.Component<Props, any> {

    render() {
        return (
            <View style={[movieIconsStyle.movieIcons, this.props.style]}>
                <TouchableNativeFeedback
                    style={{flex: 0}}
                    onPress={this.props.watchedHandler}
                    background={TouchableNativeFeedback.SelectableBackground()}
                >
                    <View style={{padding: 5}}><MaterialIcons name="add-circle-outline" size={this.props.size ? this.props.size : 32} color={movieSomColor}/></View>
                </TouchableNativeFeedback>
                <Text style={{lineHeight: 32}}>{this.props.watched ? this.props.watched : 0}</Text>
                <TouchableNativeFeedback
                    style={{flex: 0}}
                    onPress={this.props.unWatchedHandler}
                    background={TouchableNativeFeedback.SelectableBackground()}
                >
                    <View style={{padding: 5}}><MaterialIcons name="remove-circle-outline" size={this.props.size ? this.props.size : 32} color={movieSomColor}/></View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    style={{flex: 0}}
                    onPress={this.props.wantToWatchHandler}
                    background={TouchableNativeFeedback.SelectableBackground()}
                >
                    <View style={{padding: 5}}><MaterialIcons name="star-border" size={this.props.size ? this.props.size : 32} color={movieSomColor}/></View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    style={{flex: 0}}
                    onPress={this.props.shareHandler}
                    background={TouchableNativeFeedback.SelectableBackground()}
                >
                    <View style={{padding: 5}}><MaterialIcons name="share" size={this.props.size ? this.props.size : 32} color={movieSomColor}/></View>
                </TouchableNativeFeedback>
                {this.props.imdb && this.props.imdbHandler ? <TouchableNativeFeedback
                    style={{flex: 0}}
                    onPress={this.props.imdbHandler}
                    background={TouchableNativeFeedback.SelectableBackground()}
                >
                    <View style={{padding: 5}}><FontAwesome name="imdb" size={this.props.size ? this.props.size : 32} color={movieSomColor}/></View>
                </TouchableNativeFeedback> : null}
                {this.props.homepage && this.props.homepageHandler ? <TouchableNativeFeedback
                    style={{flex: 0}}
                    onPress={this.props.homepageHandler}
                    background={TouchableNativeFeedback.SelectableBackground()}
                >
                    <View style={{padding: 5}}><MaterialCommunityIcons name="web" size={this.props.size ? this.props.size : 32} color={movieSomColor}/></View>
                </TouchableNativeFeedback> : null}
            </View>
        );
    }
}
