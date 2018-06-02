import React from 'react';
import {Text, View} from 'react-native';
import { viewStyle, detailStyle, searchScreenStyle, backgroundColor, sectionListStyle} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';
import { FlatList } from 'react-native';
import MovieBuddyResult, {Props as iMovieBuddyResult} from '../components/MovieBuddyResult';

export interface UsersMovieRecommendations {
    getUsersMovieRecommendations: {
        status: number;
        message: [iMovieBuddyResult],
        execTime: number;
    };
    execTime: number;
}

export default class AboutScreen extends React.PureComponent<any, any> {
    static navigationOptions = {
        title: 'Recommend',
    };

    state: any = {
        movieBuddies: []
    };

    componentDidMount() {
        this.getMovieBuddies();
    }

    getMovieBuddies = async () => {
        const response: UsersMovieRecommendations = await this.props.post('getUsersMovieRecommendations', '', JSON.stringify({
            token: this.props.loginToken,
            movie_tmdb_id: this.props.id
        })).then((data: any) => data.json());
        this.setState({movieBuddies: response.getUsersMovieRecommendations.message});
    }

    keyExtractor = (item: any, index: number) => `${item.user_id2}`;

    recommend() {
        // const payload: RecommendMovieProps = {
        //     token: this.props.loginToken,
        //     recommend_to: [{}],
        //     movie_tmdb_id: this.props.id
        // };
        // this.props.post('recommend', '', JSON.stringify(payload));
    }

    handleOnPress = (movieBuddyResult: iMovieBuddyResult) => {
        const newMovieBuddies = [...this.state.movieBuddies];
        const movieBuddy: iMovieBuddyResult = newMovieBuddies.find((value: iMovieBuddyResult) => movieBuddyResult.user_id2 === value.user_id2);
        movieBuddy.recommend_to = movieBuddyResult.recommend_to;
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
                    initialNumToRender={4}
                    renderItem={(data: any) => (
                        <MovieBuddyResult
                            {...data.item}
                            onPress={this.handleOnPress}
                            navigation={this.props.navigation}
                        />
                    )}
                />

            </View>
        );
    }
}
