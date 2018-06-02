import React from 'react';
import {Text, View} from 'react-native';
import { viewStyle, detailStyle, searchScreenStyle, backgroundColor, sectionListStyle, movieSomSecondaryColor} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';
import { FlatList } from 'react-native';
import MovieBuddyResult, {Props as iMovieBuddyResult} from '../components/MovieBuddyResult';
import { Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

export interface UsersMovieRecommendations {
    getUsersMovieRecommendations: {
        status: number;
        message: [iMovieBuddyResult],
        execTime: number;
    };
    execTime: number;
}

export interface UsersEpisodeRecommendations {
    getUsersTvEpisodeRecommendations: {
        status: number;
        message: [iMovieBuddyResult],
        execTime: number;
    };
    execTime: number;
}

export interface Recommend {
    token: string;
    recommend_to: RecommendTo[];
    movie_tmdb_id: number;
}

export interface RecommendEpisode {
    token: string;
    recommend_to: RecommendTo[];
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
        movieBuddies: []
    };

    componentDidMount() {
        if (this.props.media_type === 'movie') {
            this.getMovieBuddies();
        } else if (this.props.media_type === 'episode') {
            this.getEpisodeBuddies();
        }
    }

    getMovieBuddies = async () => {
        const response: UsersMovieRecommendations = await this.props.post('getUsersMovieRecommendations', '', JSON.stringify({
            token: this.props.loginToken,
            movie_tmdb_id: this.props.id
        })).then((data: any) => data.json());
        this.setState({movieBuddies: response.getUsersMovieRecommendations.message});
    }

    getEpisodeBuddies = async () => {
        const response: UsersEpisodeRecommendations = await this.props.post('getUsersTvEpisodeRecommendations', '', JSON.stringify({
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
        const recommendTo: RecommendTo[] = [];
        this.state.movieBuddies.forEach((movieBuddy: iMovieBuddyResult) => {
            recommendTo.push({
                id: movieBuddy.user_id2,
                recommend: movieBuddy.recommend_to ? 1 : 0
            });
        });
        const payload: Recommend = {
            token: this.props.loginToken,
            recommend_to: recommendTo,
            movie_tmdb_id: this.props.id
        };
        this.props.post('recommendMovie', '', JSON.stringify(payload));
        this.props.navigation.dispatch(NavigationActions.back());
    }

    recommendEpisode = () => {
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
        };
        this.props.post('recommendTvEpisode', '', JSON.stringify(payload));
        this.props.navigation.dispatch(NavigationActions.back());
    }

    handleOnPress = (movieBuddyResult: iMovieBuddyResult) => {
        const newMovieBuddies = [...this.state.movieBuddies];
        const movieBuddy: iMovieBuddyResult = newMovieBuddies.find((value: iMovieBuddyResult) => movieBuddyResult.user_id2 === value.user_id2);
        movieBuddy.recommend_to = movieBuddyResult.recommend_to;
        this.setState({movieBuddies: newMovieBuddies});
    }

    toggleSelection = () => {
        const newMovieBuddies = [...this.state.movieBuddies];
        const select = newMovieBuddies.find((val: iMovieBuddyResult) => val.recommend_to === null);
        newMovieBuddies.forEach((val: iMovieBuddyResult, idx: number, arr: iMovieBuddyResult[]) => {
            arr[idx] = {...val, recommend_to: select ? val.user_id2 : null};
        });
        this.setState({movieBuddies: newMovieBuddies});
    }

    render() {
        const title = this.props.title ? this.props.title : this.props.name;
        return (
            <View style={viewStyle.view}>
                <Text style={detailStyle.title}>{title}</Text>
                <Text>Recommend your movie buddies.</Text>
                <FlatList
                    style={[searchScreenStyle.flatList, {backgroundColor}]}
                    data={this.state.movieBuddies}
                    extraData={this.state.movieBuddies}
                    keyExtractor={this.keyExtractor}
                    ListEmptyComponent={<Text style={sectionListStyle.header}>You have no movie buddies!</Text>}
                    ItemSeparatorComponent={(props: any, state: any) => <Text style={{backgroundColor: '#eee', height: 1}}/>}
                    initialNumToRender={4}
                    renderItem={(data: any) => (
                        <MovieBuddyResult
                            {...data.item}
                            onPress={this.handleOnPress}
                            navigation={this.props.navigation}
                        />
                    )}
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between'}}>
                    <View style={{flex: 1}}>
                        <Button onPress={this.toggleSelection} color={movieSomSecondaryColor} title="Select/Deselect all"/>
                    </View>
                    <View style={{flex: 1}}>
                        <Button onPress={this.props.media_type === 'movie' ? this.recommendMovie : this.recommendEpisode} title="Save"/>
                    </View>
                </View>
            </View>
        );
    }
}
