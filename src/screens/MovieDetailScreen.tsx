import React from 'react';
import { Share, Text, ScrollView, TouchableNativeFeedback, View, Image, Animated, StyleSheet, Dimensions, ScaledSize } from 'react-native';
import {textStyle, viewStyle, detailStyle, HEADER_MAX_HEIGHT, animatedHeaderStyle, HEADER_SCROLL_DISTANCE, HEADER_MIN_HEIGHT, backgroundColor} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';
import { get, getBackdropUrl } from '../tmdb/TMDb';
import { format, parse } from 'date-fns';

export interface Props {
    id: number;
    title: string;
    overview: string;
    revenue?: number;
    budget?: number;
    runtime?: number;
}

export default class MovieDetailScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Movie Details',
    };

    state: any = {
        scrollY: new Animated.Value(0),
    };

    constructor(props: any) {
        super(props);
        this.props = props;
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

    updateMovieTest = () => {
        this.props.actions.addItem({
            id: this.props.id,
            media_type: this.props.media_type,
            test: this.props.test ? this.props.test + 1 : 1
        });
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
                        <View style={{backgroundColor}}>
                            <Text style={detailStyle.title}>{this.props.test}{this.props.title}{this.props.release_date ? ` (${format(parse(this.props.release_date as string), 'YYYY')})` : null}</Text>
                            {this.props.homepage ? <TouchTextButton
                                    onPress={() => this.props.navigation.navigate('Web', {url: this.props.homepage})}
                                >Homepage</TouchTextButton> : null}
                            {this.props.budget ? <Text style={detailStyle.overview}>Budget: $ {parseInt(this.props.budget, 10).toLocaleString()}</Text> : null}
                            {this.props.revenue ? <Text style={detailStyle.overview}>Revenue: $ {parseInt(this.props.revenue, 10).toLocaleString()}</Text> : null}
                            {this.props.runtime ? <Text style={detailStyle.overview}>Runtime: {this.props.runtime}</Text> : null}
                            <Text style={detailStyle.overview}>{this.props.overview}</Text>
                            <TouchTextButton onPress={this.updateMovieTest}>Show data</TouchTextButton>
                            <TouchTextButton
                                onPress={() => Share.share({
                                    title: this.props.title,
                                    message: `${this.props.overview} https://www.moviesom.com/moviesom.php?tmdbMovieId=${this.props.id}`,
                                    url: `https://www.moviesom.com/moviesom.php?tmdbMovieId=${this.props.id}`
                                }, {
                                    dialogTitle: 'MovieSom share'
                                })}
                            >Share</TouchTextButton>
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

                    <View style={animatedHeaderStyle.bar}>
                        <Text style={animatedHeaderStyle.title}>{this.props.title}</Text>
                    </View>
                </Animated.View>
            </View>
        );
    }
}
