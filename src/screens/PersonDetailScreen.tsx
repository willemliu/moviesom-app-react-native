import React from 'react';
import { Share, Text, ScrollView, TouchableNativeFeedback, View, Animated, Image, Dimensions } from 'react-native';
import {textStyle, viewStyle, detailStyle, animatedHeaderStyle, HEADER_SCROLL_DISTANCE, HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, backgroundColor} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';
import { get, getBackdropUrl } from '../tmdb/TMDb';

export default class DetailsScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Person Details',
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
        console.log('Get person details');
        const item = await get(`/person/${this.props.id}`, `append_to_response=${encodeURI('images,tagged_images,combined_credits')}`).then((data) => data.json());
        item.media_type = 'person';
        const randomImage = this.pickRandomImage(item.tagged_images.results);
        if (randomImage) {
            const imagePath = randomImage.file_path;
            await this.loadImage(imagePath);
        }
        this.props.actions.addItem(item);
    }

    pickRandomImage(images: any[]) {
        const imageCount = images.length;
        let randomImage = null;
        let count = 0;
        while (!randomImage) {
            count++;
            const candidate = images[Math.round(Math.random() * imageCount)];
            if (candidate.aspect_ratio > 1) {
                randomImage = candidate;
            }
            if (count > 10) {
                break;
            }
        }
        return randomImage;
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

    test = () => {
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
                            <Text style={detailStyle.title}>{this.props.test}{this.props.name}</Text>
                            {this.props.homepage ? <TouchTextButton
                                    onPress={() => this.props.navigation.navigate('Web', {url: this.props.homepage})}
                                >Homepage</TouchTextButton> : null}
                            <Text style={detailStyle.overview}>{this.props.biography}</Text>
                            <TouchTextButton onPress={this.test}>Show data</TouchTextButton>
                            <TouchTextButton
                                onPress={() => Share.share({
                                    title: this.props.name,
                                    message: `${this.props.overview} https://www.moviesom.com/moviesom.php?tmdbPersonId=${this.props.id}`,
                                    url: `https://www.moviesom.com/moviesom.php?tmdbPersonId=${this.props.id}`
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
                </Animated.View>
            </View>
        );
    }
}
