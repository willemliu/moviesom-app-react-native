import React from 'react';
import {Text, View, Image} from 'react-native';
import { viewStyle, detailStyle, searchScreenStyle, backgroundColor, sectionListStyle, movieSomSecondaryColor, transparentColor, HEADER_SCROLL_DISTANCE, HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, animatedHeaderStyle} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';
import { FlatList } from 'react-native';
import MovieBuddyResult, {Props as iMovieBuddyResult} from '../components/MovieBuddyResult';
import { Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { TextInput } from 'react-native';
import { Animated } from 'react-native';
import { ScrollView } from 'react-native';

export interface UsersMovieRecommendationsResponse {
    getUsersMovieRecommendations: {
        status: number;
        message: [iMovieBuddyResult],
        execTime: number;
    };
    execTime: number;
}

export interface UsersEpisodeRecommendationsResponse {
    getUsersTvEpisodeRecommendations: {
        status: number;
        message: [iMovieBuddyResult],
        execTime: number;
    };
    execTime: number;
}

export interface RecommendMovie {
    token: string;
    recommend_to: RecommendTo[];
    movie_tmdb_id: number;
    spoiler: string;
}

export interface RecommendEpisode {
    token: string;
    recommend_to: RecommendTo[];
    spoiler: string;
    tv_tmdb_id: number;
    tv_episode_tmdb_id: number;
    tv_season_number: number;
    tv_episode_number: number;
}

export interface RecommendTo {
    id: number;
    recommend: 0|1;
}

export default class AboutScreen extends React.PureComponent<any, any> {
    static navigationOptions = {
        title: 'Recommend',
    };

    state: any = {
        movieBuddies: [],
        scrollY: new Animated.Value(0),
        spoiler: null
    };

    componentDidMount() {
        if (this.props.media_type === 'movie') {
            this.getMovieBuddies();
        } else if (this.props.media_type === 'episode') {
            this.getEpisodeBuddies();
        }
        this.loadImage(this.props.backdrop_path);
    }

    getMovieBuddies = async () => {
        const response: UsersMovieRecommendationsResponse = await this.props.post('getUsersMovieRecommendations', '', JSON.stringify({
            token: this.props.loginToken,
            movie_tmdb_id: this.props.id
        })).then((data: any) => data.json());
        this.setState({movieBuddies: response.getUsersMovieRecommendations.message});
    }

    getEpisodeBuddies = async () => {
        const response: UsersEpisodeRecommendationsResponse = await this.props.post('getUsersTvEpisodeRecommendations', '', JSON.stringify({
            token: this.props.loginToken,
            tv_tmdb_id: this.props.tv_id,
            tv_episode_tmdb_id: this.props.id,
            tv_season_number: this.props.season_number,
            tv_episode_number: this.props.episode_number
        })).then((data: any) => data.json());
        this.setState({movieBuddies: response.getUsersTvEpisodeRecommendations.message});
    }

    keyExtractor = (item: any, index: number) => `${item.user_id2}`;

    recommendMovie = () => {
        requestAnimationFrame(() => {
            const recommendTo: RecommendTo[] = [];
            this.state.movieBuddies.forEach((movieBuddy: iMovieBuddyResult) => {
                recommendTo.push({
                    id: movieBuddy.user_id2,
                    recommend: movieBuddy.recommend_to ? 1 : 0
                });
            });
            const payload: RecommendMovie = {
                token: this.props.loginToken,
                recommend_to: recommendTo,
                movie_tmdb_id: this.props.id,
                spoiler: this.state.spoiler
            };
            this.props.post('recommendMovie', '', JSON.stringify(payload));
        });
        this.props.navigation.dispatch(NavigationActions.back());
    }

    recommendEpisode = () => {
        requestAnimationFrame(() => {
            const recommendTo: RecommendTo[] = [];
            this.state.movieBuddies.forEach((movieBuddy: iMovieBuddyResult) => {
                recommendTo.push({
                    id: movieBuddy.user_id2,
                    recommend: movieBuddy.recommend_to ? 1 : 0
                });
            });
            const payload: RecommendEpisode = {
                token: this.props.loginToken,
                recommend_to: recommendTo,
                tv_tmdb_id: this.props.tv_id,
                tv_episode_tmdb_id: this.props.id,
                tv_season_number: this.props.season_number,
                tv_episode_number: this.props.episode_number,
                spoiler: this.state.spoiler
            };
            this.props.post('recommendTvEpisode', '', JSON.stringify(payload));
        });
        this.props.navigation.dispatch(NavigationActions.back());
    }

    handleOnPress = (movieBuddyResult: iMovieBuddyResult) => {
        const newMovieBuddies = [...this.state.movieBuddies];
        const movieBuddy: iMovieBuddyResult = newMovieBuddies.find((value: iMovieBuddyResult) => movieBuddyResult.user_id2 === value.user_id2);
        movieBuddy.recommend_to = movieBuddyResult.recommend_to;
        this.setState({movieBuddies: newMovieBuddies});
    }

    toggleSelection = () => {
        requestAnimationFrame(() => {
            const newMovieBuddies = [...this.state.movieBuddies];
            const select = newMovieBuddies.find((val: iMovieBuddyResult) => val.recommend_to === null);
            newMovieBuddies.forEach((val: iMovieBuddyResult, idx: number, arr: iMovieBuddyResult[]) => {
                arr[idx] = {...val, recommend_to: select ? val.user_id2 : null};
            });
            this.setState({movieBuddies: newMovieBuddies});
        });
    }

    /**
     * Tries to load the image from the given URL. It determines the width and height which
     * is required in order to show the image. Otherwise it will be 0x0.
     * When all conditions are met the `image` state is set with a JSX Element triggering
     * a re-render.
     */
    loadImage = async (imagePath: string|null|undefined) => {
        console.log('BACKDROP', imagePath);
        const imageUrl = await this.props.getBackdropUrl(imagePath);
        if (imageUrl) {
            Image.getSize(imageUrl, (width: number, height: number) => {
                this.setState({imageUrl});
            }, (e: any) => { console.error(e); });
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

        const title = this.props.title ? this.props.title : this.props.name;
        return (
            <View style={{backgroundColor}}>
                <ScrollView
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                    )}
                    style={{backgroundColor, minHeight: '100%'}}
                >
                    <Text
                        style={{
                            width: 360,
                            height: HEADER_MAX_HEIGHT,
                        }}
                    />
                    <View style={viewStyle.view}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between'}}>
                            <View style={{flex: 1}}>
                                <Button onPress={this.toggleSelection} color={movieSomSecondaryColor} title="Select/Deselect all"/>
                            </View>
                            <View style={{flex: 1}}>
                                <Button onPress={this.props.media_type === 'movie' ? this.recommendMovie : this.recommendEpisode} title="Save"/>
                            </View>
                        </View>
                        <View style={searchScreenStyle.searchBar}>
                            <TextInput
                                style={searchScreenStyle.searchInput}
                                multiline={true}
                                maxLength={1024}
                                numberOfLines={3}
                                onChangeText={(spoiler: string) => this.setState({spoiler})}
                                value={this.state.spoiler}
                                underlineColorAndroid={transparentColor}
                                placeholder="Leave a spoiler i.e.: It was earth all along!"
                            />
                        </View>
                        <FlatList
                            style={[searchScreenStyle.flatList, {backgroundColor}]}
                            data={this.state.movieBuddies}
                            extraData={this.state.movieBuddies}
                            keyExtractor={this.keyExtractor}
                            ListEmptyComponent={<Text style={sectionListStyle.header}>You have no movie buddies!</Text>}
                            ItemSeparatorComponent={(props: any, state: any) => <Text style={{backgroundColor: '#eee', height: 1}}/>}
                            initialNumToRender={10}
                            renderItem={(data: any) => (
                                <MovieBuddyResult
                                    {...data.item}
                                    onPress={this.handleOnPress}
                                    navigation={this.props.navigation}
                                />
                            )}
                        />
                        <View style={searchScreenStyle.searchBar}>
                            <TextInput
                                style={searchScreenStyle.searchInput}
                                multiline={true}
                                maxLength={1024}
                                numberOfLines={3}
                                onChangeText={(spoiler: string) => this.setState({spoiler})}
                                value={this.state.spoiler}
                                underlineColorAndroid={transparentColor}
                                placeholder="Leave a spoiler i.e.: It was earth all along!"
                            />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between'}}>
                            <View style={{flex: 1}}>
                                <Button onPress={this.toggleSelection} color={movieSomSecondaryColor} title="Select/Deselect all"/>
                            </View>
                            <View style={{flex: 1}}>
                                <Button onPress={this.props.media_type === 'movie' ? this.recommendMovie : this.recommendEpisode} title="Save"/>
                            </View>
                        </View>
                    </View>
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
                        defaultSource={require('../../assets/eyecon360x219.png')}
                        resizeMode='cover'
                        source={this.state.imageUrl ? {uri: this.state.imageUrl} : require('../../assets/eyecon360x219.png')}
                    />
                    <View style={animatedHeaderStyle.bar}>
                        <Text style={[animatedHeaderStyle.title, {fontSize: 15}]}>Recommend</Text>
                        <Text style={animatedHeaderStyle.title}>{title}</Text>
                    </View>
                </Animated.View>
            </View>

        );
    }
}
