import {View, Text, Image, AsyncStorage, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import { searchResultStyle, movieSomColor } from '../styles/Styles';
import { getPosterUrl } from '../tmdb/TMDb';
import {parse, format} from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationRoute, NavigationScreenProp } from 'react-navigation';
import { Feather } from '@expo/vector-icons';
import MovieIcons from './MovieIcons';

export default class SearchTvResult extends React.PureComponent<any, any> {
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
                            resizeMode='cover'
                            source={{uri: url}}
                        />
                    )
                });
            }, (e) => { console.error(e); });
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
                            <Text style={searchResultStyle.title}><Feather name="tv" size={16}/> {this.props.name ? this.props.name : this.props.original_name}{this.props.first_air_date ? ` (${format(parse(this.props.first_air_date as string), 'YYYY')})` : null}</Text>
                            <Text style={searchResultStyle.overview} numberOfLines={2}>{this.props.overview}</Text>
                        </View>
                    </View>
                    <MovieIcons
                        watchedHandler={this.props.watchedHandler}
                        shareHandler={this.props.shareHandler}
                        unWatchedHandler={this.props.unWatchedHandler}
                        wantToWatchHandler={this.props.wantToWatchHandler}
                        watched={this.props.watched}
                    />
                </View>
            </TouchableNativeFeedback>
        );
    }
}
