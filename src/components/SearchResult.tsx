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
    original_title?: string;
    original_language?: string;
    title?: string;
    backdrop_path?: string|null;
    popularity?: number;
    vote_count?: number;
    video?: boolean;
    vote_average?: number;
    navigation: NavigationScreenProp<NavigationRoute>;
}

export default class SearchResult extends React.Component<Props, any> {
    state: any = {
        image: (
            <Image
                style={{marginBottom: 10}}
                resizeMode='contain'
                source={require('../../assets/eyecon48x48grey.png')}
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
                                width,
                                height,
                                maxWidth: width / 2,
                                maxHeight: height / 2,
                                alignSelf: 'baseline',
                                marginBottom: 10}}
                            resizeMode='contain'
                            source={{uri: url}}
                        />
                    )
                });
            }, (e) => { console.error(e); });
        }
    }

    watched = async () => {
        const loggedIn = await AsyncStorage.getItem('loggedIn');
        if (loggedIn) {
            alert('watched');
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    unwatched = async () => {
        const loggedIn = await AsyncStorage.getItem('loggedIn');
        if (loggedIn) {
            alert('unwatched');
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    wantToWatch = async () => {
        const loggedIn = await AsyncStorage.getItem('loggedIn');
        if (loggedIn) {
            alert('want to watch');
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    share = async () => {
        const loggedIn = await AsyncStorage.getItem('loggedIn');
        if (loggedIn) {
            alert('share');
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    render() {
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
                            <Text style={searchResultStyle.title}>{this.props.title} ({format(parse(this.props.release_date as string), 'YYYY')})</Text>
                            <Text style={searchResultStyle.overview}>{this.props.overview}</Text>
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
                            <View><MaterialIcons name="add-circle-outline" size={32} color={movieSomColor}/></View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            style={{flex: 0}}
                            onPress={this.unwatched}
                            background={TouchableNativeFeedback.SelectableBackground()}
                        >
                            <View><MaterialIcons name="remove-circle-outline" size={32} color={movieSomColor}/></View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            style={{flex: 0}}
                            onPress={this.wantToWatch}
                            background={TouchableNativeFeedback.SelectableBackground()}
                        >
                            <View><MaterialIcons name="star-border" size={32} color={movieSomColor}/></View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            style={{flex: 0}}
                            onPress={this.share}
                            background={TouchableNativeFeedback.SelectableBackground()}
                        >
                            <View><MaterialIcons name="share" size={32} color={movieSomColor}/></View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}
