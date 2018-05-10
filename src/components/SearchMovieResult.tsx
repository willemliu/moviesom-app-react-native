import {View, Text, Image, AsyncStorage, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import { searchResultStyle, movieSomColor, textStyle, detailStyle, movieIconsStyle } from '../styles/Styles';
import { getPosterUrl } from '../tmdb/TMDb';
import {parse, format} from 'date-fns';
import { NavigationRoute, NavigationScreenProp } from 'react-navigation';
import MovieIcons from './MovieIcons';
import { watchedHandler, shareHandler, wantToWatchHandler, unWatchedHandler } from '../utils/movieSom';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface Props {
    handleOnPress: (props: any) => void;
    poster_path?: string|null;
    adult?: boolean;
    overview?: string;
    release_date?: string;
    genre_ids?: number[];
    id?: number;
    media_type?: string;
    original_title?: string;
    original_language?: string;
    title?: string;
    backdrop_path?: string|null;
    popularity?: number;
    vote_count?: number;
    video?: boolean;
    vote_average?: number;
    navigation: NavigationScreenProp<NavigationRoute>;
    test?: number;
    actions?: any;
    watched?: number;
}

export default class SearchMovieResult extends React.PureComponent<Props, any> {
    state: any = {
        image: (
            <Image
                style={{
                    width: 46,
                    height: 68,
                }}
                resizeMode='cover'
                source={require('../../assets/eyecon256x256.png')}
            />
        ),
        media_type: 'person'
    };

    componentDidMount() {
        this.loadImage(this.props.poster_path);
    }

    /**
     * Tries to load the image from the given URL. It determines the width and height which
     * is required in order to show the image. Otherwise it will be 0x0.
     * When all conditions are met the `image` state is set with a JSX Element triggering
     * a re-render.
     */
    loadImage = async (posterPath: string|null|undefined) => {
        const url = await getPosterUrl(posterPath);
        if (url) {
            Image.getSize(url, (width: number, height: number) => {
                this.setState({
                    image: (
                        <Image
                            style={{
                                width: Math.min(width / 2, 46),
                                height: Math.min(height / 2, 68),
                            }}
                            loadingIndicatorSource={require('../../assets/eyecon256x256.png')}
                            resizeMode='cover'
                            source={{uri: url}}
                        />
                    )
                });
            }, (e) => { console.error(e); });
        } else {
            console.log('poster path not found', url);
        }
    }

    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.props.handleOnPress}
                background={TouchableNativeFeedback.SelectableBackground()}
            >
                <View style={searchResultStyle.view}>
                    <View style={{flex: 0, flexDirection: 'row'}}>
                        <View style={{flex: 2}}>
                            {this.state.image}
                        </View>
                        <View style={{flex: 10}}>
                            <Text style={searchResultStyle.title}><MaterialCommunityIcons name="filmstrip" size={16}/> {this.props.title ? this.props.title : this.props.original_title}{this.props.release_date ? ` (${format(parse(this.props.release_date as string), 'YYYY')})` : null}</Text>
                            <Text style={searchResultStyle.overview} numberOfLines={2}>{this.props.overview}</Text>
                        </View>
                    </View>
                    <MovieIcons
                        watched={this.props.watched}
                        watchedHandler={() => watchedHandler(this.props)}
                        unWatchedHandler={() => unWatchedHandler(this.props)}
                        wantToWatchHandler={() => wantToWatchHandler(this.props)}
                        shareHandler={() => shareHandler(this.props)}
                    />
                </View>
            </TouchableNativeFeedback>
        );
    }
}
