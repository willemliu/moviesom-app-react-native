import React from 'react';
import { Text, ScrollView, View, Animated, Image, Dimensions } from 'react-native';
import {detailStyle, HEADER_SCROLL_DISTANCE, HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, animatedHeaderStyle, backgroundColor} from "../styles/Styles";
import Touchable from '../components/Touchable';
import {EpisodeProps} from "../interfaces/Episode";
import EpisodeIcons from "../components/icons/EpisodeIcons";

export interface Props extends EpisodeProps {
    actions: any;
    loginToken: string;
    navigation: any;
    formatDuration: any;
    get: (route: string, uriParam: string) => Promise<any>;
    getBackdropUrl: (backdropPath: string|null|undefined, quality?: number) => Promise<any>;
}
export default class EpisodeDetailScreen extends React.PureComponent<Props, any> {
    static navigationOptions = {
        title: 'Episode details',
    };

    state: any = {
        scrollY: new Animated.Value(0),
    };

    constructor(props: Props) {
        super(props);
        Dimensions.addEventListener('change', ({window, screen}) => { this.checkOrientation(window.width, window.height); });
        const {width, height} = Dimensions.get('window');
        this.checkOrientation(width, height);
        this.getDetails();
    }

    checkOrientation = (width: number, height: number) => {
        this.props.navigation.setParams({hideTabBar: (width > height)});
    }

    getDetails = async () => {
        console.log('Get episode details');
        const item = await this.props.get(`/tv/${this.props.tv_id}/season/${this.props.season_number}/episode/${this.props.episode_number}`, `append_to_response=${encodeURI('videos,credits,alternative_titles')}`).then((data) => data.json());
        item.media_type = 'episode';
        await this.loadImage(item.still_path);
        this.props.actions.addItem(item);
        this.props.actions.addItems(await this.props.getUserEpisodeSettings([{...this.props}], this.props.loginToken));
    }

    /**
     * Tries to load the image from the given URL. It determines the width and height which
     * is required in order to show the image. Otherwise it will be 0x0.
     * When all conditions are met the `image` state is set with a JSX Element triggering
     * a re-render.
     */
    loadImage = async (imagePath: string|null|undefined) => {
        const imageUrl = await this.props.getBackdropUrl(imagePath);
        if (imageUrl) {
            Image.getSize(imageUrl, (width: number, height: number) => {
                this.setState({imageUrl});
            }, (e: any) => { console.error(e); });
        } else {
            console.log('backdrop path not found', imageUrl);
        }
    }

    getFormattedEpisodeRunTime = (episodeRunTime: number[]) => {
        const result: number[] = [];
        episodeRunTime.forEach((duration: number) => {
            result.push(this.props.formatDuration(duration));
        });
        return result.join(', ');
    }

    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });
        const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0.4],
            extrapolate: 'clamp',
        });

        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -50],
            extrapolate: 'clamp',
        });
        return (
            <View style={{backgroundColor}}>
                <ScrollView
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                    )}
                    style={{backgroundColor, height: '100%'}}
                >
                    <Text
                        style={{
                            width: 360,
                            height: HEADER_MAX_HEIGHT,
                        }}
                    />
                    <Touchable style={{marginTop: HEADER_MAX_HEIGHT}}>
                        <View style={{backgroundColor, margin: 10}}>
                            <Text style={detailStyle.title}>{this.props.name}</Text>
                            <View style={detailStyle.metaView}>
                                <Text>META</Text>
                            </View>
                            <Text style={detailStyle.overview}>{this.props.overview}</Text>
                            <EpisodeIcons {...this.props}/>
                        </View>
                    </Touchable>
                </ScrollView>
                <Animated.View style={[animatedHeaderStyle.header, {height: headerHeight}]}>
                    <Animated.Image
                        style={[
                            animatedHeaderStyle.backgroundImage,
                            {
                                opacity: imageOpacity,
                                transform: [{translateY: imageTranslate}]
                            },
                        ]}
                        loadingIndicatorSource={require('../../assets/eyecon360x219.png')}
                        resizeMode='cover'
                        source={this.state.imageUrl ? {uri: this.state.imageUrl} : require('../../assets/eyecon360x219.png')}
                    />
                </Animated.View>
            </View>
        );
    }
}
