import React from 'react';
import { Text, View, StyleProp, ViewStyle, Share } from 'react-native';
import { movieSomColor, iconsStyle, watchlistColor } from '../../styles/Styles';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import Touchable from '../Touchable';
import { get } from '../../tmdb/TMDb';
import { post } from '../../moviesom/MovieSom';
import { AsyncStorage } from 'react-native';
import {EpisodeProps} from "../../interfaces/Episode";

export interface LoginProps {
    loggedIn?: boolean;
}

export interface DeviceProps {
    online?: boolean;
}

export interface Props extends EpisodeProps, LoginProps, DeviceProps {
    size?: number;
    media_type?: string;
    style?: StyleProp<ViewStyle>;
    actions?: any;
    navigation?: any;
    watched?: number;
    want_to_watch?: number;
    formatDuration?: any;
    imdb_id?: string;
    homepage?: string;
}

/**
 * Render functional icons as part of a TMDb item.
 */
export default class EpisodeIcons extends React.Component<Props, any> {
    watchedHandler = () => {
        requestAnimationFrame(async () => {
            if (this.props.loggedIn) {
                const detailedItem = await get(`/tv/${this.props.tv_id}/season/${this.props.season_number}/episode/${this.props.episode_number}`, `append_to_response=${encodeURI('credits,external_ids')}`).then((data) => data.json());
                detailedItem.media_type = this.props.media_type;
                detailedItem.watched = this.props.watched ? this.props.watched + 1 : 1;
                detailedItem.imdb_id = detailedItem.external_ids.imdb_id; // Required value for backend
                detailedItem.tmdb_id = detailedItem.id; // Required value for backend
                detailedItem.tv_id = this.props.tv_id; // Required value for backend
                detailedItem.tmdb_tv_id = this.props.tv_id; // Required value for backend
                detailedItem.title = detailedItem.name; // Required value for backend
                detailedItem.tmdb_rating = detailedItem.vote_average; // Required value for backend
                detailedItem.tmdb_votes = detailedItem.vote_count; // Required value for backend
                detailedItem.token = await AsyncStorage.getItem('loginToken');
                this.props.actions.addItem(detailedItem);
                await post(`setTvEpisodeRatings,setUserTvEpisodeWatched`, '', JSON.stringify(detailedItem)).then((data: any) => data.json());
            } else {
                this.props.navigation.push('Login');
            }
        });
    }

    unWatchedHandler = () => {
        requestAnimationFrame(async () => {
            if (this.props.loggedIn) {
                const detailedItem = await get(`/tv/${this.props.tv_id}/season/${this.props.season_number}/episode/${this.props.episode_number}`, `append_to_response=${encodeURI('credits,external_ids')}`).then((data) => data.json());
                detailedItem.media_type = this.props.media_type;
                detailedItem.watched = this.props.watched ? this.props.watched - 1 : 0;
                detailedItem.imdb_id = detailedItem.external_ids.imdb_id; // Required value for backend
                detailedItem.tmdb_id = detailedItem.id; // Required value for backend
                detailedItem.tv_id = this.props.tv_id; // Required value for backend
                detailedItem.tmdb_tv_id = this.props.tv_id; // Required value for backend
                detailedItem.title = detailedItem.name; // Required value for backend
                detailedItem.tmdb_rating = detailedItem.vote_average; // Required value for backend
                detailedItem.tmdb_votes = detailedItem.vote_count; // Required value for backend
                detailedItem.token = await AsyncStorage.getItem('loginToken');
                this.props.actions.addItem(detailedItem);
                await post(`setTvEpisodeRatings,setUserTvEpisodeWatched`, '', JSON.stringify(detailedItem)).then((data: any) => data.json());
            } else {
                this.props.navigation.push('Login');
            }
        });
    }

    wantToWatchHandler = () => {
        requestAnimationFrame(async () => {
            if (this.props.loggedIn) {
                const detailedItem = await get(`/tv/${this.props.tv_id}/season/${this.props.season_number}/episode/${this.props.episode_number}`, `append_to_response=${encodeURI('credits,external_ids')}`).then((data) => data.json());
                detailedItem.media_type = this.props.media_type;
                detailedItem.want_to_watch = this.props.want_to_watch ? 0 : 1;
                detailedItem.imdb_id = detailedItem.external_ids.imdb_id; // Required value for backend
                detailedItem.tmdb_id = detailedItem.id; // Required value for backend
                detailedItem.tv_id = this.props.tv_id; // Required value for backend
                detailedItem.tmdb_tv_id = this.props.tv_id; // Required value for backend
                detailedItem.title = detailedItem.name; // Required value for backend
                detailedItem.tmdb_rating = detailedItem.vote_average; // Required value for backend
                detailedItem.tmdb_votes = detailedItem.vote_count; // Required value for backend
                detailedItem.token = await AsyncStorage.getItem('loginToken');
                this.props.actions.addItem(detailedItem);
                await post(`setTvEpisodeRatings,setUserTvEpisodeWantToWatch`, '', JSON.stringify(detailedItem)).then((data: any) => data.json());
            } else {
                this.props.navigation.push('Login');
            }
        });
    }

    shareHandler = () => {
        requestAnimationFrame(async () => {
            const service = 'tmdbTvEpisodeId';
            const title = this.props.name;
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
