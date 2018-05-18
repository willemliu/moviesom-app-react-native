import React from 'react';
import { Text, View, StyleProp, ViewStyle, Share } from 'react-native';
import { movieSomColor, movieIconsStyle } from '../../styles/Styles';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import Touchable from '../Touchable';
import { get } from '../../tmdb/TMDb';
import { MovieProps } from '../../interfaces/Movie';

export interface LoginProps {
    loggedIn?: boolean;
}

export interface DeviceProps {
    online?: boolean;
}

export interface Props extends MovieProps, LoginProps, DeviceProps {
    size?: number;
    media_type?: string;
    style?: StyleProp<ViewStyle>;
    actions?: any;
    navigation?: any;
    watched?: number;
    formatDuration?: any;
}

/**
 * Render functional icons as part of a TMDb item.
 */
export default class MovieIcons extends React.Component<Props, any> {
    watchedHandler = () => {
        requestAnimationFrame(async () => {
            if (this.props.loggedIn) {
                console.log({
                    id: this.props.id,
                    media_type: this.props.media_type,
                    watched: this.props.watched ? this.props.watched + 1 : 1
                });
                this.props.actions.addItem({
                    id: this.props.id,
                    media_type: this.props.media_type,
                    watched: this.props.watched ? this.props.watched + 1 : 1
                });
                const detailedItem = await get(`/movie/${this.props.id}`, `append_to_response=${encodeURI('videos,credits,alternative_titles')}`).then((data) => data.json());
                detailedItem.media_type = 'movie';
                this.props.actions.addItem(detailedItem);
                // alert(JSON.stringify(detailedItem, null, 2));
            } else {
                this.props.navigation.push('Login');
            }
        });
    }

    unWatchedHandler = () => {
        requestAnimationFrame(async () => {
            if (this.props.loggedIn) {
                this.props.actions.addItem({
                    id: this.props.id,
                    media_type: this.props.media_type,
                    watched: this.props.watched ? this.props.watched - 1 : null
                });
            } else {
                this.props.navigation.push('Login');
            }
        });
    }

    wantToWatchHandler = () => {
        requestAnimationFrame(async () => {
            if (this.props.loggedIn) {
                alert(`want to watch ${this.props.id}`);
            } else {
                this.props.navigation.push('Login');
            }
        });
    }

    shareHandler = () => {
        requestAnimationFrame(async () => {
            const service = 'tmdbMovieId';
            const title = this.props.title;
            const message = `${this.props.overview ? this.props.overview : title}`;
            Share.share({
                title,
                message: `${message} https://www.moviesom.com/moviesom.php?${service}=${this.props.id}`,
                url: `https://www.moviesom.com/moviesom.php?${service}=${this.props.id}`
            }, {
                dialogTitle: 'MovieSom share'
            });
        });
    }

    imdbHandler = () => {
        requestAnimationFrame(() => {
            this.props.navigation.push('Web', {url: `https://www.imdb.com/title/${this.props.imdb_id}/`, canGoBack: true});
        });
    }

    homepageHandler = () => {
        requestAnimationFrame(() => {
            this.props.navigation.push('Web', {url: this.props.homepage, canGoBack: true});
        });
    }

    render() {
        return (
            <View style={[movieIconsStyle.movieIcons, this.props.style]}>
                <Touchable key="watch"
                    style={{flex: 0}}
                    onPress={this.watchedHandler}
                >
                    <View style={{padding: 5}}><MaterialIcons name="add-circle-outline" size={this.props.size ? this.props.size : 32} color={movieSomColor}/></View>
                </Touchable>
                <Text style={{lineHeight: 32}} key="watch-count">{this.props.watched ? this.props.watched : 0}</Text>
                <Touchable
                    key="unwatch"
                    style={{flex: 0}}
                    onPress={this.unWatchedHandler}
                >
                    <View style={{padding: 5}}><MaterialIcons name="remove-circle-outline" size={this.props.size ? this.props.size : 32} color={movieSomColor}/></View>
                </Touchable>
                <Touchable
                    style={{flex: 0}}
                    onPress={this.wantToWatchHandler}
                >
                    <View style={{padding: 5}}><MaterialIcons name="star-border" size={this.props.size ? this.props.size : 32} color={movieSomColor}/></View>
                </Touchable>
                <Touchable
                    style={{flex: 0}}
                    onPress={this.shareHandler}
                >
                    <View style={{padding: 5}}><MaterialIcons name="share" size={this.props.size ? this.props.size : 32} color={movieSomColor}/></View>
                </Touchable>
                {this.props.imdb_id ? <Touchable
                    style={{flex: 0}}
                    onPress={this.imdbHandler}
                >
                    <View style={{padding: 5}}><FontAwesome name="imdb" size={this.props.size ? this.props.size : 32} color={movieSomColor}/></View>
                </Touchable> : null}
                {this.props.homepage ? <Touchable
                    style={{flex: 0}}
                    onPress={this.homepageHandler}
                >
                    <View style={{padding: 5}}><MaterialCommunityIcons name="web" size={this.props.size ? this.props.size : 32} color={movieSomColor}/></View>
                </Touchable> : null}
            </View>
        );
    }
}
