import {View, Image, Dimensions} from 'react-native';
import React from 'react';
import { HEADER_MAX_HEIGHT } from '../styles/Styles';

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
            if (this.props.backdrop_path) {
                this.loadImage(this.props.backdrop_path);
            } else {
                this.loadProfile(this.props.file_path);
            }
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
            const {width, height} = Dimensions.get('window');
            Image.getSize(url, (imageWidth: number, imageHeight: number) => {
                const ratio = (height < imageHeight ? height / imageHeight : imageHeight / height) * 0.65;
                this.setState({
                    image: (
                        <Image
                            style={{
                                width: imageWidth * ratio,
                                height: height * 0.65,
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

    loadProfile = async (profilePath: string|null|undefined) => {
        const url = await this.props.getProfileUrl(profilePath, 4);
        if (url) {
            const {width, height} = Dimensions.get('window');
            Image.getSize(url, (imageWidth: number, imageHeight: number) => {
                const ratio = (height < imageHeight ? height / imageHeight : imageHeight / height) * 0.65;
                this.setState({
                    image: (
                        <Image
                            style={{
                                width: imageWidth * ratio,
                                height: height * 0.65,
                            }}
                            loadingIndicatorSource={require('../../assets/eyecon256x256.png')}
                            resizeMode='contain'
                            defaultSource={require('../../assets/eyecon56x56.png')}
                            source={{uri: url}}
                        />
                    )
                });
            }, (e) => { console.error(e); });
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
                                width: '100%',
                                height: HEADER_MAX_HEIGHT,
                                flex: 1,
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
            <View style={[{backgroundColor: 'black'}, this.props.style]}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    {this.state.image}
                </View>
            </View>
        );
    }
}
