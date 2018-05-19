import React from 'react';
import { Text, View, StyleProp, ViewStyle, Share } from 'react-native';
import { movieSomColor, iconsStyle } from '../../styles/Styles';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import Touchable from '../Touchable';
import { get } from '../../tmdb/TMDb';
import { TvProps } from '../../interfaces/Tv';

export interface LoginProps {
    loggedIn?: boolean;
}

export interface DeviceProps {
    online?: boolean;
}

export interface Props extends TvProps, LoginProps, DeviceProps {
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
export default class TvIcons extends React.Component<Props, any> {
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
            const service = 'tmdbTvId';
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
