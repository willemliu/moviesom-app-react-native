import React from 'react';
import { Share, Text, ScrollView, TouchableNativeFeedback, View, Image, Animated, StyleSheet, Dimensions, ScaledSize, Button, AsyncStorage } from 'react-native';
import {textStyle, viewStyle, detailStyle, HEADER_MAX_HEIGHT, animatedHeaderStyle, HEADER_SCROLL_DISTANCE, HEADER_MIN_HEIGHT, backgroundColor} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';
import { get, getBackdropUrl } from '../tmdb/TMDb';
import { format, parse } from 'date-fns';
import MovieIcons from '../components/MovieIcons';
import numeral from 'numeral';

numeral.register('locale', 'nl_NL', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    currency: {
        symbol: '$'
    }
} as any);

numeral.locale('nl_NL');

export interface Props {
    adult?: boolean;
    backdrop_path?: string;
    belongs_to_collection?: null|any;
    budget?: number;
    genres?: [{id?: number, name?: string}];
    homepage?: string;
    id?: number;
    imdb_id?: string;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: [{name?: string, id?: number, logo_path?: string, origin_country?: string}];
    production_countries?: [{iso_3166_1?: string, name?: string}];
    release_date?: string;
    revenue?: number;
    runtime?: number;
    spoken_languages?: [{iso639_1?: string, name?: string}];
    status?: string;
    tagline?: string;
    title?: string;
    video?: boolean;
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
}

export default class MovieDetailScreen extends React.Component<Props, any> {
    static navigationOptions = {
        title: 'Movie Details',
    };

    state: any = {
        scrollY: new Animated.Value(0),
    };

    constructor(props: any) {
        super(props);
    }

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
        console.log('Get movie details');
        const item = await get(`/movie/${this.props.id}`, `append_to_response=${encodeURI('videos,credits,alternative_titles')}`).then((data) => data.json());
        item.media_type = 'movie';
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
        const imageUrl = await getBackdropUrl(imagePath);
        if (imageUrl) {
            Image.getSize(imageUrl, (width: number, height: number) => {
                this.setState({imageUrl});
            }, (e) => { console.error(e); });
        } else {
            console.log('backdrop path not found', imageUrl);
        }
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
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                    )}
                    style={{backgroundColor}}
                >
                    <Text
                        style={{
                            width: 390,
                            height: HEADER_MAX_HEIGHT,
                        }}
                    />
                    <TouchableNativeFeedback style={{marginTop: HEADER_MAX_HEIGHT}} background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={{backgroundColor, margin: 10}}>
                            <Text style={detailStyle.title}>{this.props.title}{this.props.release_date ? ` (${format(parse(this.props.release_date as string), 'YYYY')})` : null}</Text>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                            }}>
                                {this.props.budget ? <Text style={[detailStyle.meta]}>Budget: {numeral(this.props.budget).format('$0,0')}</Text> : null}
                                {this.props.revenue ? <Text style={[detailStyle.meta]}>Revenue: {numeral(this.props.revenue).format('$0,0')}</Text> : null}
                                {this.props.runtime ? <Text style={[detailStyle.meta]}>Runtime: {this.props.formatDuration ? this.props.formatDuration(this.props.runtime) : this.props.runtime}</Text> : null}
                            </View>
                            <Text style={detailStyle.overview}>{this.props.overview}</Text>
                            <MovieIcons
                                watched={this.props.watched}
                                watchedHandler={this.props.watchedHandler}
                                unWatchedHandler={this.props.unWatchedHandler}
                                wantToWatchHandler={this.props.wantToWatchHandler}
                                imdb={this.props.imdb_id}
                                imdbHandler={this.props.imdbHandler}
                                homepage={this.props.homepage}
                                homepageHandler={this.props.homepageHandler}
                                shareHandler={this.props.shareHandler}
                            />
                        </View>
                    </TouchableNativeFeedback>
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
                        loadingIndicatorSource={require('../../assets/eyecon1080x657.png')}
                        resizeMode='cover'
                        source={this.state.imageUrl ? {uri: this.state.imageUrl} : require('../../assets/eyecon1080x657.png')}
                    />
                </Animated.View>
            </View>
        );
    }
}
