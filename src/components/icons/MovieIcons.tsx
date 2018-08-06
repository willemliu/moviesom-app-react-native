import React from 'react';
import { Text, View, StyleProp, ViewStyle, Share } from 'react-native';
import { movieSomColor, iconsStyle, watchlistColor } from '../../styles/Styles';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import Touchable from '../Touchable';
import { get } from '../../tmdb/TMDb';
import { MovieProps } from '../../interfaces/Movie';
import { post } from '../../moviesom/MovieSom';
import { AsyncStorage } from 'react-native';

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
    want_to_watch?: number;
    formatDuration?: any;
}

/**
 * Render functional icons as part of a TMDb item.
 */
export default class MovieIcons extends React.Component<Props, any> {
    watchedHandler = () => {
        requestAnimationFrame(async () => {
            if (this.props.loggedIn) {
                const detailedItem = await get(`/movie/${this.props.id}`, `append_to_response=${encodeURI('videos,credits,alternative_titles')}`).then((data) => data.json());
                detailedItem.media_type = this.props.media_type;
                detailedItem.watched = this.props.watched ? this.props.watched + 1 : 1;
                detailedItem.tmdb_id = detailedItem.id; // Required value for backend
                detailedItem.tmdb_rating = detailedItem.vote_average; // Required value for backend
                detailedItem.tmdb_votes = detailedItem.vote_count; // Required value for backend
                detailedItem.token = await AsyncStorage.getItem('loginToken');
                this.props.actions.addItem(detailedItem);
                await post(`setMovieRatings,setUserMovieWatched`, '', JSON.stringify(detailedItem)).then((data: any) => data.json());
            } else {
                this.props.navigation.push('Login', {
                    loginReason: 'Log in to mark this movie as watched.'
                });
            }
        });
    }

    unWatchedHandler = () => {
        requestAnimationFrame(async () => {
            if (this.props.loggedIn) {
                const detailedItem = await get(`/movie/${this.props.id}`, `append_to_response=${encodeURI('videos,credits,alternative_titles')}`).then((data) => data.json());
                detailedItem.media_type = this.props.media_type;
                detailedItem.watched = this.props.watched ? this.props.watched - 1 : 0;
                detailedItem.tmdb_id = detailedItem.id; // Required value for backend
                detailedItem.tmdb_rating = detailedItem.vote_average; // Required value for backend
                detailedItem.tmdb_votes = detailedItem.vote_count; // Required value for backend
                detailedItem.token = await AsyncStorage.getItem('loginToken');
                this.props.actions.addItem(detailedItem);
                await post(`setMovieRatings,setUserMovieWatched`, '', JSON.stringify(detailedItem)).then((data: any) => data.json());
            } else {
                this.props.navigation.push('Login', {
                    loginReason: 'Log in to use this function.'
                });
            }
        });
    }

    wantToWatchHandler = () => {
        requestAnimationFrame(async () => {
            if (this.props.loggedIn) {
                const detailedItem = await get(`/movie/${this.props.id}`, `append_to_response=${encodeURI('videos,credits,alternative_titles')}`).then((data) => data.json());
                detailedItem.media_type = this.props.media_type;
                detailedItem.want_to_watch = this.props.want_to_watch ? 0 : 1;
                detailedItem.tmdb_id = detailedItem.id; // Required value for backend
                detailedItem.tmdb_rating = detailedItem.vote_average; // Required value for backend
                detailedItem.tmdb_votes = detailedItem.vote_count; // Required value for backend
                detailedItem.token = await AsyncStorage.getItem('loginToken');
                this.props.actions.addItem(detailedItem);
                await post(`setMovieRatings,setUserMovieWantToWatch`, '', JSON.stringify(detailedItem)).then((data: any) => data.json());
            } else {
                this.props.navigation.push('Login', {
                    loginReason: 'Log in to add this movie to your watchlist.'
                });
            }
        });
    }

    recommend = () => {
        requestAnimationFrame(() => {
            if (this.props.loggedIn) {
                this.props.navigation.push('Recommend', {
                    ...this.props,
                    recommendService: 'recommendMovie',
                    movieBuddiesService: 'getUsersMovieRecommendations'
                });
            } else {
                this.props.navigation.push('Login', {
                    loginReason: 'Log in to recommend this movie to your Movie Buddies.'
                });
            }
        });
    }

    shareHandler = () => {
        requestAnimationFrame(async () => {
            const service = 'tmdbMovieId';
            const title = this.props.title;
            const message = this.props.overview ? `${title} - ${this.props.overview}` : title;
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
            <View style={[iconsStyle.icons, this.props.style]}>
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
                    <View style={{padding: 5}}>
                        {this.props.want_to_watch ?
                            <MaterialIcons name="star" size={this.props.size ? this.props.size : 32} color={watchlistColor}/> :
                            <MaterialIcons name="star-border" size={this.props.size ? this.props.size : 32} color={movieSomColor}/>
                        }
                    </View>
                </Touchable>
                <Touchable
                    style={{flex: 0}}
                    onPress={this.recommend}
                >
                    <View style={{padding: 5}}><Entypo name="slideshare" size={this.props.size ? this.props.size : 32} color={movieSomColor}/></View>
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
