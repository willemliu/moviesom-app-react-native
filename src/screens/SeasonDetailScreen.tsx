import React from 'react';
import { Text, ScrollView, View, Animated, Image, Dimensions } from 'react-native';
import {detailStyle, HEADER_SCROLL_DISTANCE, HEADER_MAX_HEIGHT, animatedHeaderStyle, backgroundColor} from "../styles/Styles";
import {SeasonProps} from "../interfaces/Season";
import {format, parse} from "date-fns";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export interface Props extends SeasonProps {
    actions: any;
    loginToken: string;
    navigation: any;
    formatDuration: any;
    episode_run_time: number[];
    get: (route: string, uriParam: string) => Promise<any>;
    getPosterUrl: (imagePath: string|null|undefined, quality?: number) => Promise<any>;
}
export default class SeasonDetailScreen extends React.PureComponent<Props, any> {
    static navigationOptions = {
        title: 'Season details',
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
        console.log('Get season details');
        const item = await this.props.get(`/tv/${this.props.tv_id}/season/${this.props.season_number}`, `append_to_response=${encodeURI('credits')}`).then((data) => data.json());
        item.media_type = 'season';
        await this.loadImage(item.poster_path);
        this.props.actions.addItem(item);
    }

    /**
     * Tries to load the image from the given URL. It determines the width and height which
     * is required in order to show the image. Otherwise it will be 0x0.
     * When all conditions are met the `image` state is set with a JSX Element triggering
     * a re-render.
     */
    loadImage = async (imagePath: string|null|undefined) => {
        const imageUrl = await this.props.getPosterUrl(imagePath, 3);
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
        const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0.4],
            extrapolate: 'clamp',
        });

        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -100],
            extrapolate: 'clamp',
        });
        return (
            <View style={{backgroundColor}}>
                <Animated.View style={[animatedHeaderStyle.header, {height: HEADER_MAX_HEIGHT}]}>
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
                <ScrollView
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                    )}
                    style={{backgroundColor: 'transparent', height: '100%'}}
                >
                    <View style={{backgroundColor, padding: 10, marginTop: HEADER_MAX_HEIGHT}}>
                        <Text style={detailStyle.title}>{this.props.name}</Text>
                        <View style={detailStyle.metaView}>
                            {this.props.air_date ? <Text style={[detailStyle.metaText]}>First aired: {format(parse(this.props.air_date as string), 'dddd DD-MM-YYYY')}</Text> : null}
                            {this.props.season_number ? <Text style={[detailStyle.metaText]}>Season: {this.props.season_number}</Text> : null}
                            {this.props.episode_count ? <Text style={[detailStyle.metaText]}>Episodes: {this.props.episode_count}</Text> : null}
                            {this.props.episode_count && this.props.episode_run_time ? <Text style={detailStyle.metaText}>Total duration: <MaterialCommunityIcons name="timer-sand" size={13}/> {this.props.formatDuration(this.props.episode_count * this.props.episode_run_time[0])}</Text> : null}
                        </View>
                        <Text style={detailStyle.overview}>{this.props.overview}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
