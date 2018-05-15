import React from 'react';
import { Text, View, StyleProp, ViewStyle, Share } from 'react-native';
import { movieSomColor, movieIconsStyle } from '../styles/Styles';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import Touchable from './Touchable';

export interface MovieProps {
    adult?: boolean;
    backdrop_path?: string;
    belongs_to_collection?: null|any;
    budget?: number;
    genres?: [{id?: number, name?: string}];
    homepage?: string;
    id?: number;
    imdb_id?: string;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: [{name?: string, id?: number, logo_path?: string, origin_country?: string}];
    production_countries?: [{iso_3166_1?: string, name?: string}];
    release_date?: string;
    revenue?: number;
    runtime?: number;
    spoken_languages?: [{iso639_1?: string, name?: string}];
    status?: string;
    tagline?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
    media_type?: string;
}

export interface TvProps {
    name?: string;
    biography?: string;
}

export interface LoginProps {
    loggedIn?: boolean;
}

export interface DeviceProps {
    online?: boolean;
}

export interface Props extends MovieProps, TvProps, LoginProps, DeviceProps {
    size?: number;
    media_type?: string;
    style?: StyleProp<ViewStyle>;
    actions?: any;
    navigation?: any;
    watched?: any;
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
            } else {
                this.props.navigation.navigate('Login');
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
                this.props.navigation.navigate('Login');
            }
        });
    }

    wantToWatchHandler = () => {
        requestAnimationFrame(async () => {
            if (this.props.loggedIn) {
                alert(`want to watch ${this.props.id}`);
            } else {
                this.props.navigation.navigate('Login');
            }
        });
    }

    shareHandler = () => {
        requestAnimationFrame(async () => {
            let service = 'tmdbMovieId';
            switch (this.props.media_type) {
                case 'tv':
                    service = 'tmdbTvId';
                    break;
                case 'episode':
                    service = 'tmdbTvEpisodeId';
                    break;
                case 'person':
                    service = 'tmdbPersonId';
                    break;
            }
            const title = this.props.title ? this.props.title : this.props.name;
            const message = `${this.props.overview ? this.props.overview : this.props.biography ? this.props.biography : title} `;
            Share.share({
                title,
                message: `${message}https://www.moviesom.com/moviesom.php?${service}=${this.props.id}`,
                url: `https://www.moviesom.com/moviesom.php?${service}=${this.props.id}`
            }, {
                dialogTitle: 'MovieSom share'
            });
        });
    }

    imdbHandler = () => {
        switch (this.props.media_type) {
            case 'movie':
            case 'tv':
            case 'episode':
                this.imdbMovieHandler();
                break;
            case 'person':
                this.imdbPersonHandler();
                break;
        }
    }

    imdbMovieHandler = () => {
        requestAnimationFrame(() => {
            this.props.navigation.navigate('Web', {url: `https://www.imdb.com/title/${this.props.imdb_id}/`, canGoBack: true});
        });
    }

    imdbPersonHandler = () => {
        requestAnimationFrame(() => {
            this.props.navigation.navigate('Web', {url: `https://www.imdb.com/name/${this.props.imdb_id}/`, canGoBack: true});
        });
    }

    homepageHandler = () => {
        requestAnimationFrame(() => {
            this.props.navigation.navigate('Web', {url: this.props.homepage, canGoBack: true});
        });
    }

    render() {
        return (
            <View style={[movieIconsStyle.movieIcons, this.props.style]}>
                <Touchable
                    style={{flex: 0}}
                    onPress={this.watchedHandler}
                >
                    <View style={{padding: 5}}><MaterialIcons name="add-circle-outline" size={this.props.size ? this.props.size : 32} color={movieSomColor}/></View>
                </Touchable>
                <Text style={{lineHeight: 32}}>{this.props.watched ? this.props.watched : 0}</Text>
                <Touchable
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
