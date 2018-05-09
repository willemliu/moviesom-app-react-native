import {View, Text, Image, AsyncStorage, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import { searchResultStyle, movieSomColor } from '../styles/Styles';
import { getPosterUrl } from '../tmdb/TMDb';
import {parse, format} from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationRoute, NavigationScreenProp } from 'react-navigation';

export interface Props {
    handleOnPress: (id: number|null|undefined) => void;
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
        )
    };

    componentDidMount() {
        this.loadImage(this.props.poster_path);
    }

    handleOnPress = () => {
        if (this.props.handleOnPress) { this.props.handleOnPress(this.props.id); }
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

    watched = async () => {
        const loggedIn = await AsyncStorage.getItem('loggedIn');
        if (loggedIn) {
            alert(`watched ${this.props.id}`);
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    unwatched = async () => {
        const loggedIn = await AsyncStorage.getItem('loggedIn');
        if (loggedIn) {
            alert(`unwatched ${this.props.id}`);
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    wantToWatch = async () => {
        const loggedIn = await AsyncStorage.getItem('loggedIn');
        if (loggedIn) {
            alert(`want to watch ${this.props.id}`);
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    share = async () => {
        const loggedIn = await AsyncStorage.getItem('loggedIn');
        if (loggedIn) {
            alert(`share ${this.props.id}`);
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    render() {
        if (this.props.media_type !== 'movie') { return null; }
        return (
            <TouchableNativeFeedback
                onPress={this.handleOnPress}
                background={TouchableNativeFeedback.SelectableBackground()}
            >
                <View style={searchResultStyle.view}>
                    <View style={{flex: 0, flexDirection: 'row'}}>
                        <View style={{flex: 2}}>
                            {this.state.image}
                        </View>
                        <View style={{flex: 10}}>
                            <Text style={searchResultStyle.title}>{this.props.media_type ? `[${this.props.media_type}] ` : null}{this.props.test}{this.props.title ? this.props.title : this.props.original_title}{this.props.release_date ? ` (${format(parse(this.props.release_date as string), 'YYYY')})` : null}</Text>
                            <Text style={searchResultStyle.overview} numberOfLines={2}>{this.props.overview}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <TouchableNativeFeedback
                            style={{flex: 0}}
                            onPress={this.watched}
                            background={TouchableNativeFeedback.SelectableBackground()}
                        >
                            <View style={{paddingTop: 5, paddingLeft: 5, paddingRight: 5}}><MaterialIcons name="add-circle-outline" size={32} color={movieSomColor}/></View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            style={{flex: 0}}
                            onPress={this.unwatched}
                            background={TouchableNativeFeedback.SelectableBackground()}
                        >
                            <View style={{paddingTop: 5, paddingLeft: 5, paddingRight: 5}}><MaterialIcons name="remove-circle-outline" size={32} color={movieSomColor}/></View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            style={{flex: 0}}
                            onPress={this.wantToWatch}
                            background={TouchableNativeFeedback.SelectableBackground()}
                        >
                            <View style={{paddingTop: 5, paddingLeft: 5, paddingRight: 5}}><MaterialIcons name="star-border" size={32} color={movieSomColor}/></View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            style={{flex: 0}}
                            onPress={this.share}
                            background={TouchableNativeFeedback.SelectableBackground()}
                        >
                            <View style={{paddingTop: 5, paddingLeft: 5, paddingRight: 5}}><MaterialIcons name="share" size={32} color={movieSomColor}/></View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}
