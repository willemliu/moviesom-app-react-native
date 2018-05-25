import {View, Text, Image, AsyncStorage} from 'react-native';
import React from 'react';
import { searchResultStyle } from '../styles/Styles';
import {parse, format} from 'date-fns';
import { Feather } from '@expo/vector-icons';
import Touchable from './Touchable';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { EpisodeProps } from '../interfaces/Episode';
import EpisodeIcons from './icons/EpisodeIcons';

export interface Props extends EpisodeProps {
    handleOnPress: (props: any) => void;
    navigation: NavigationScreenProp<NavigationRoute>;
    actions: any;
    loginToken: string;
    getPosterUrl: (posterPath: string|null|undefined) => Promise<any>;
}

export default class SearchEpisodeResult extends React.PureComponent<Props, any> {
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
                loadingIndicatorSource={require('../../assets/eyecon256x256.png')}
                defaultSource={require('../../assets/eyecon256x256.png')}
                resizeMode='cover'
                source={require('../../assets/eyecon56x56.png')}
            />
        )
    };

    constructor(props: any) {
        super(props);
        this.queueGetUserEpisodeSettings();
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            this.loadImage(this.props.still_path);
        });
    }

    queueGetUserEpisodeSettings = () => {
        if (!SearchEpisodeResult.queue) {
            SearchEpisodeResult.queue = new Array();
        }
        SearchEpisodeResult.queue.push(this.props);
        if (SearchEpisodeResult.timeout) {
            clearTimeout(SearchEpisodeResult.timeout);
        }
        SearchEpisodeResult.timeout = setTimeout(() => {
            this.props.getUserEpisodeSettings([...SearchEpisodeResult.queue], this.props.loginToken).then((data: any) => {
                this.props.actions.addItems(data);
            });
            SearchEpisodeResult.queue = new Array();
        }, 300);
    }

    /**
     * Tries to load the image from the given URL. It determines the width and height which
     * is required in order to show the image. Otherwise it will be 0x0.
     * When all conditions are met the `image` state is set with a JSX Element triggering
     * a re-render.
     */
    loadImage = async (stillPath: string|null|undefined) => {
        const url = await this.props.getPosterUrl(stillPath);
        if (url) {
            Image.getSize(url, (width: number, height: number) => {
                this.setState({
                    image: (
                        <Image
                            style={{
                                width: 56,
                                height: 83,
                            }}
                            loadingIndicatorSource={require('../../assets/eyecon256x256.png')}
                            defaultSource={require('../../assets/eyecon56x56.png')}
                            resizeMode='cover'
                            source={{uri: url}}
                        />
                    )
                });
            }, (e: any) => { console.error(e); });
        }
    }

    wantToWatch = async () => {
        const loggedIn = await AsyncStorage.getItem('loggedIn');
        if (loggedIn) {
            alert(`want to watch ${this.props.id}`);
        } else {
            this.props.navigation.push('Login');
        }
    }

    share = async () => {
        const loggedIn = await AsyncStorage.getItem('loggedIn');
        if (loggedIn) {
            alert(`share ${this.props.id}`);
        } else {
            this.props.navigation.push('Login');
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
                            <Text style={searchResultStyle.title}><Feather name="tv" size={16}/> {this.props.name ? this.props.name : this.props.original_name}{this.props.first_air_date ? ` (${format(parse(this.props.first_air_date as string), 'YYYY')})` : null}</Text>
                            <Text style={searchResultStyle.overview} numberOfLines={2}>{this.props.overview}</Text>
                        </View>
                    </View>
                    <EpisodeIcons {...this.props}/>
                </View>
            </Touchable>
        );
    }
}
