import {View, Text, Image} from 'react-native';
import React from 'react';
import { searchResultStyle } from '../styles/Styles';
import {parse, format} from 'date-fns';
import { NavigationRoute, NavigationScreenProp } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Touchable from './Touchable';
import MovieIcons from './icons/MovieIcons';
import { MovieProps } from '../interfaces/Movie';
import { ActivityIndicator } from 'react-native';

export interface Props extends MovieProps {
    handleOnPress?: (props: any) => void;
    navigation?: NavigationScreenProp<NavigationRoute>;
    actions?: any;
    loginToken: string;
    loggedIn?: boolean;
    watched?: number;
    getPosterUrl: (posterPath: string|null|undefined, quality?: number) => Promise<any>;
}

export default class SearchMovieResult extends React.PureComponent<Props, any> {
    static queue: any[];
    static timeout: NodeJS.Timer;

    state: any = {
        image: (
            <Image
                style={{
                    width: 56,
                    height: 83,
                    flex: 1,
                }}
                resizeMode='cover'
                loadingIndicatorSource={require('../../assets/eyecon256x256.png')}
                defaultSource={require('../../assets/eyecon256x256.png')}
                source={require('../../assets/eyecon256x256.png')}
            />
        )
    };

    constructor(props: Props) {
        super(props);
        this.queueGetUserMoviesSettings();
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            this.loadImage(this.props.poster_path);
        });
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            this.setState({loadingUserSettings: true});
            requestAnimationFrame(() => {
                this.queueGetUserMoviesSettings();
            });
        }
        if (SearchMovieResult.queue.length === 0) {
            this.setState({loadingUserSettings: false});
        }
    }

    queueGetUserMoviesSettings = () => {
        if (!SearchMovieResult.queue) {
            SearchMovieResult.queue = new Array();
        }
        SearchMovieResult.queue.push(this.props);
        if (SearchMovieResult.timeout) {
            clearTimeout(SearchMovieResult.timeout);
        }
        SearchMovieResult.timeout = setTimeout(() => {
            this.props.getUserMoviesSettings([...SearchMovieResult.queue], this.props.loginToken).then((data: any) => {
                this.props.actions.addItems(data);
            });
            SearchMovieResult.queue = new Array();
        }, 300);
    }

    /**
     * Tries to load the image from the given URL. It determines the width and height which
     * is required in order to show the image. Otherwise it will be 0x0.
     * When all conditions are met the `image` state is set with a JSX Element triggering
     * a re-render.
     */
    loadImage = async (posterPath: string|null|undefined) => {
        const url = await this.props.getPosterUrl(posterPath);
        if (url) {
            Image.getSize(url, (width: number, height: number) => {
                this.setState({
                    image: (
                        <Image
                            style={{
                                width: 56,
                                height: 83,
                            }}
                            loadingIndicatorSource={require('../../assets/eyecon56x56.png')}
                            defaultSource={require('../../assets/eyecon56x56.png')}
                            resizeMode='cover'
                            source={{uri: url}}
                        />
                    )
                });
            }, (e: any) => { console.error(e); });
        } else {
            console.log('movie poster path not found', url);
        }
    }

    render() {
        return (
            <Touchable onPress={this.props.handleOnPress}>
                <View style={searchResultStyle.view}>
                    <View style={{flex: 0, flexDirection: 'row'}}>
                        <View style={{flex: 2}}>
                            {this.state.image}
                        </View>
                        <View style={{flex: 10}}>
                            <Text style={searchResultStyle.title}><MaterialCommunityIcons name="filmstrip" size={16}/> {this.props.title ? this.props.title : this.props.original_title}{this.props.release_date ? ` (${format(parse(this.props.release_date as string), 'YYYY')})` : null}</Text>
                            {this.props.character ? <Text style={searchResultStyle.credit}>as <Text style={{fontWeight: 'bold'}}>{this.props.character}</Text></Text> : null}
                            {this.props.job ? <Text style={searchResultStyle.credit}>as <Text style={{fontWeight: 'bold'}}>{this.props.job}</Text></Text> : null}
                            <Text style={searchResultStyle.overview} numberOfLines={2}>{this.props.overview}</Text>
                        </View>
                    </View>
                    {this.state.loadingUserSettings ? <ActivityIndicator size='small' color='#009688' style={{flex: 1}}/> : <MovieIcons {...this.props as any}/>}
                </View>
            </Touchable>
        );
    }
}
