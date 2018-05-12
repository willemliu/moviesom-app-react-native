import React from 'react';
import { Share, Text, ScrollView, TouchableNativeFeedback, View, Animated, Image, Dimensions } from 'react-native';
import {textStyle, viewStyle, detailStyle, animatedHeaderStyle, HEADER_SCROLL_DISTANCE, HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, backgroundColor} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';
import MovieIcons from '../components/MovieIcons';
import { MaterialCommunityIcons, Foundation } from '@expo/vector-icons';
import { parse, format } from 'date-fns';

export interface Props {
    adult?: boolean;
    also_known_as?: [any];
    biography?: string;
    birthday?: string;
    deathday?: string;
    gender?: 0|1|2;
    homepage?: string;
    id?: number;
    imdb_id?: string;
    name?: string;
    place_of_birth?: string;
    popularity?: number;
    profile_path?: string;
    actions: any;
    navigation: any;
    watched?: any;
    watchedHandler?: any;
    unWatchedHandler?: any;
    wantToWatchHandler?: any;
    imdbPersonHandler?: any;
    homepageHandler?: any;
    shareHandler?: any;
    formatDuration: any;
    get: (route: string, uriParam: string) => Promise<any>;
    getBackdropUrl: (backdropPath: string|null|undefined) => Promise<any>;
}

export default class DetailsScreen extends React.Component<Props, any> {
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
        const item = await this.props.get(`/person/${this.props.id}`, `append_to_response=${encodeURI('images,tagged_images,combined_credits')}`).then((data) => data.json());
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
        while (!randomImage && imageCount) {
            count++;
            const candidate = images[Math.floor(Math.random() * imageCount)];
            if (candidate.aspect_ratio && candidate.aspect_ratio > 1) {
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
        const imageUrl = await this.props.getBackdropUrl(imagePath);
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

        const gender = this.props.gender === 2 ? 'male-symbol' : this.props.gender === 1 ? 'female-symbol' : null;

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
                            width: 360,
                            height: HEADER_MAX_HEIGHT,
                        }}
                    />
                    <TouchableNativeFeedback style={{marginTop: HEADER_MAX_HEIGHT}} background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={{backgroundColor, margin: 10}}>
                            <Text style={detailStyle.title}>{this.props.name} {gender ? <Foundation name={gender} size={20}/> : null}</Text>
                            <View style={detailStyle.metaView}>
                                {this.props.birthday ? <Text style={detailStyle.metaText}><MaterialCommunityIcons name="baby-buggy" size={13}/> {format(parse(this.props.birthday), 'DD-MM-YYYY')}{this.props.place_of_birth ? ` (${this.props.place_of_birth})` : null}</Text> : null}
                                {this.props.deathday ? <Text style={detailStyle.metaText}><MaterialCommunityIcons name="emoticon-dead" size={13}/> {format(parse(this.props.deathday), 'DD-MM-YYYY')}</Text> : null}
                            </View>

                            <Text style={detailStyle.overview}>{this.props.biography}</Text>
                            <MovieIcons {...this.props}/>
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
                        loadingIndicatorSource={require('../../assets/eyecon360x219.png')}
                        resizeMode='cover'
                        source={this.state.imageUrl ? {uri: this.state.imageUrl} : require('../../assets/eyecon360x219.png')}
                    />
                </Animated.View>
            </View>
        );
    }
}
