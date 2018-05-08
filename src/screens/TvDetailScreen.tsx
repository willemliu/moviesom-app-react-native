import React from 'react';
import { Share, Text, ScrollView, TouchableNativeFeedback, View, Animated, Image } from 'react-native';
import {textStyle, viewStyle, detailStyle, HEADER_SCROLL_DISTANCE, HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, animatedHeaderStyle} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';
import { get, getBackdropUrl } from '../tmdb/TMDb';
import { format } from 'date-fns';

export default class TvDetailScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'TV Details',
    };

    state: any = {
        scrollY: new Animated.Value(0),
    };

    componentDidMount() {
        this.getDetails();
    }

    getDetails = async () => {
        console.log('Get tv details');
        const item = await get(`/tv/${this.props.id}`, `append_to_response=${encodeURI('videos,credits,alternative_titles')}`).then((data) => data.json());
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
            <View>
                <ScrollView
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                    )}
                    style={{backgroundColor: '#fff'}}
                >
                    <Text
                        style={{
                            width: 390,
                            height: HEADER_MAX_HEIGHT,
                        }}
                    />
                    <TouchableNativeFeedback style={{marginTop: HEADER_MAX_HEIGHT}} background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={{backgroundColor: '#fff'}}>
                            <Text style={detailStyle.title}>{this.props.name}</Text>
                            {this.props.type ? <Text style={detailStyle.overview}>Type: {this.props.type}</Text> : null}
                            {this.props.episode_runtime ? <Text style={detailStyle.overview}>Runtime: {this.props.episode_runtime}</Text> : null}
                            {this.props.first_air_date ? <Text style={detailStyle.overview}>First air date: {format(this.props.first_air_date, 'DD-MM-YYYY')}</Text> : null}
                            {this.props.number_of_seasons ? <Text style={detailStyle.overview}>Seasons: {this.props.number_of_seasons}</Text> : null}
                            {this.props.number_of_episodes ? <Text style={detailStyle.overview}>Episodes: {this.props.number_of_episodes}</Text> : null}
                            <Text style={detailStyle.overview}>{this.props.overview}</Text>
                            <TouchTextButton
                                onPress={() => Share.share({
                                    title: this.props.name,
                                    message: `${this.props.overview} https://www.moviesom.com/moviesom.php?tmdbTvId=${this.props.id}`,
                                    url: `https://www.moviesom.com/moviesom.php?tmdbTvId=${this.props.id}`
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
                                flex: 1,
                                opacity: imageOpacity,
                                transform: [{translateY: imageTranslate}]
                            },
                        ]}
                        loadingIndicatorSource={require('../../assets/eyecon1080x657.png')}
                        resizeMode='cover'
                        source={this.state.imageUrl ? {uri: this.state.imageUrl} : require('../../assets/eyecon1080x657.png')}
                    />

                    <View style={animatedHeaderStyle.bar}>
                        <Text style={animatedHeaderStyle.title}>{this.props.name}</Text>
                    </View>
                </Animated.View>
            </View>
        );
    }
}
