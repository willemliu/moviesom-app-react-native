import React from 'react';
import { Text, ScrollView, View, Animated, Image, Dimensions } from 'react-native';
import {detailStyle, HEADER_SCROLL_DISTANCE, HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, animatedHeaderStyle, backgroundColor} from "../styles/Styles";
import { format } from 'date-fns';
import MovieIcons from '../components/MovieIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Touchable from '../components/Touchable';

export interface Props {
    backdrop_path?: string;
    created_by?: [{id?: number, name?: string, gender?: 0|1|2, profile_path?: string}];
    episode_run_time?: number[];
    first_air_date?: string;
    genres?: [{id?: number, name?: string}];
    homepage?: string;
    id?: number;
    in_production?: boolean;
    languages?: string[];
    last_air_date?: string;
    name?: string;
    networs?: [{id?: number, name: string}];
    number_of_episodes?: number;
    number_of_seasons?: number;
    origin_country?: string[];
    origial_language?: string;
    original_name?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: [{name?: string, id?: number, logo_path?: string, origin_country?: string}];
    seasons?: [{air_date?: string, episode_count?: number, id?: number, poster_path?: string, season_number?: number}];
    status?: string;
    type?: string;
    vote_average?: number;
    vote_count?: number;
    actions: any;
    navigation: any;
    watched?: any;
    watchedHandler?: any;
    unWatchedHandler?: any;
    wantToWatchHandler?: any;
    imdbHandler?: any;
    homepageHandler?: any;
    shareHandler?: any;
    formatDuration: any;
    get: (route: string, uriParam: string) => Promise<any>;
    getBackdropUrl: (backdropPath: string|null|undefined) => Promise<any>;
}
export default class TvDetailScreen extends React.Component<Props, any> {
    static navigationOptions = {
        title: 'TV details',
    };

    state: any = {
        scrollY: new Animated.Value(0),
    };

    componentDidMount() {
        this.getDetails();
        Dimensions.addEventListener('change', ({window, screen}) => { this.checkOrientation(window.width, window.height); });
        const {width, height} = Dimensions.get('window');
        this.checkOrientation(width, height);
    }

    checkOrientation = (width: number, height: number) => {
        this.props.navigation.setParams({hideTabBar: (width > height)});
    }

    getDetails = async () => {
        console.log('Get tv details');
        const item = await this.props.get(`/tv/${this.props.id}`, `append_to_response=${encodeURI('videos,credits,alternative_titles')}`).then((data) => data.json());
        item.media_type = 'tv';
        await this.loadImage(item.backdrop_path);
        this.props.actions.addItem(item);
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
            }, (e) => { console.error(e); });
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
                    style={{backgroundColor}}
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
                                {this.props.type ? <Text style={detailStyle.metaText}>Type: {this.props.type}</Text> : null}
                                {this.props.created_by ? <Text style={detailStyle.metaText}>Created by: {this.props.created_by.map((creator) => creator.name).join(', ')}</Text> : null}
                                {this.props.episode_run_time ? <Text style={detailStyle.metaText}><MaterialCommunityIcons name="timer-sand" size={13}/> {this.getFormattedEpisodeRunTime(this.props.episode_run_time)}</Text> : null}
                                {this.props.first_air_date ? <Text style={detailStyle.metaText}>First air date: {format(this.props.first_air_date, 'DD-MM-YYYY')}</Text> : null}
                                {this.props.number_of_seasons ? <Text style={detailStyle.metaText}>Seasons: {this.props.number_of_seasons}</Text> : null}
                                {this.props.number_of_episodes ? <Text style={detailStyle.metaText}>Episodes: {this.props.number_of_episodes}</Text> : null}
                            </View>
                            <Text style={detailStyle.overview}>{this.props.overview}</Text>
                            <MovieIcons {...this.props}/>
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
