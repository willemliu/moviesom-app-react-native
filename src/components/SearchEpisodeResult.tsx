import {View, Text, Image} from 'react-native';
import React from 'react';
import { searchResultStyle } from '../styles/Styles';
import {parse, format} from 'date-fns';
import { Feather, Octicons, MaterialIcons } from '@expo/vector-icons';
import Touchable from './Touchable';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { EpisodeProps, GetUserTvEpisodesSettingsResponse } from '../interfaces/Episode';
import EpisodeIcons from './icons/EpisodeIcons';
import { ActivityIndicator } from 'react-native';

export interface Props extends EpisodeProps, GetUserTvEpisodesSettingsResponse {
    handleOnPress?: (props: any) => void;
    navigation?: NavigationScreenProp<NavigationRoute>;
    actions?: any;
    loggedIn?: boolean;
    loginToken: string;
    getPosterUrl: (posterPath: string|null|undefined, quality?: number) => Promise<any>;
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

    componentDidMount() {
        this.queueGetUserEpisodeSettings();
        requestAnimationFrame(() => {
            this.loadImage(this.props.still_path);
        });
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            this.setState({loadingUserSettings: true});
            requestAnimationFrame(() => {
                this.queueGetUserEpisodeSettings();
            });
        }
        if (SearchEpisodeResult.queue.length === 0) {
            this.setState({loadingUserSettings: false});
        }
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

    render() {
        return (
            <Touchable onPress={this.props.handleOnPress}>
                <View style={searchResultStyle.view}>
                    <View style={{flex: 0, flexDirection: 'row'}}>
                        <View style={{flex: 2}}>
                            {this.state.image}
                        </View>
                        <View style={{flex: 10}}>
                            <Text style={searchResultStyle.title}><Feather name="tv" size={16}/> {this.props.episode_number ? `#${this.props.episode_number} ` : ''}{this.props.name}{this.props.first_air_date ? ` (${format(parse(this.props.first_air_date as string), 'YYYY')})` : null}</Text>
                            <Text style={searchResultStyle.overview} numberOfLines={2}>{this.props.overview}</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                                {this.props.blu_ray === "1" ? <Image style={{width: 20}} resizeMode='contain' source={require('../../img/blu-ray.png')}/> : null}
                                {this.props.dvd === "1" ? <Image style={{marginLeft: 5, width: 20}} resizeMode='contain' source={require('../../img/dvd.png')}/> : null}
                                {this.props.digital === "1" ? <Octicons name="file-binary" size={10} style={{marginLeft: 5}}/> : null}
                                {this.props.other === "1" ? <MaterialIcons name="devices-other" size={10} style={{marginLeft: 5}}/> : null}
                            </View>
                        </View>
                    </View>
                    {this.state.loadingUserSettings ? <ActivityIndicator size='small' color='#009688' style={{flex: 1}}/> : <EpisodeIcons {...this.props}/>}
                </View>
            </Touchable>
        );
    }
}
