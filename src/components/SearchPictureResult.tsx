import {View, Text, Image, AsyncStorage, TouchableNativeFeedback, TextStyle, StyleProp} from 'react-native';
import React from 'react';
import { searchResultStyle, movieSomColor } from '../styles/Styles';
import {parse, format} from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationRoute, NavigationScreenProp } from 'react-navigation';
import MovieIcons from './MovieIcons';

export default class SearchPictureResult extends React.PureComponent<any, any> {
    state: any = {
        image: (
            <Image
                style={{
                    height: undefined,
                    flex: 1,
                }}
                resizeMode='cover'
                loadingIndicatorSource={require('../../assets/eyecon256x256.png')}
                defaultSource={require('../../assets/eyecon56x56.png')}
                source={require('../../assets/eyecon56x56.png')}
            />
        ),
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            this.loadImage(this.props.media.backdrop_path);
            // switch (this.props.image_type) {
            //     case 'poster':
            //         this.loadPoster(this.props.media.poster_path);
            //         break;
            //     case 'backdrop':
            //         this.loadImage(this.props.media.backdrop_path);
            //         break;
            // }
        });
    }

    /**
     * Tries to load the image from the given URL. It determines the width and height which
     * is required in order to show the image. Otherwise it will be 0x0.
     * When all conditions are met the `image` state is set with a JSX Element triggering
     * a re-render.
     */
    loadPoster = async (posterPath: string|null|undefined) => {
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
            }, (e) => { console.error(e); });
        } else {
            console.log('poster path not found', url);
        }
    }

    /**
     * Tries to load the image from the given URL. It determines the width and height which
     * is required in order to show the image. Otherwise it will be 0x0.
     * When all conditions are met the `image` state is set with a JSX Element triggering
     * a re-render.
     */
    loadImage = async (imagePath: string|null|undefined) => {
        const url = await this.props.getBackdropUrl(imagePath);
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
            }, (e) => { console.error(e); });
        } else {
            console.log('backdrop path not found', url);
        }
    }

    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.props.handleOnPress}
                background={TouchableNativeFeedback.SelectableBackground()}
            >
                <View style={[searchResultStyle.view, this.props.style]}>
                    <View style={{flex: 1}}>
                        {this.state.image}
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={searchResultStyle.overview}>{this.props.media.backdrop_path}</Text>
                        <Text style={searchResultStyle.overview}>{this.props.media.overview}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}
