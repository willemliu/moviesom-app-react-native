import React from 'react';
import {Button, Text, TextInput, View, FlatList, AsyncStorage} from 'react-native';
import {
    viewStyle,
    searchScreenStyle,
    transparentColor,
    sectionListStyle,
    movieSomColor,
    backgroundColor,
    textStyle
} from "../styles/Styles";
import SearchResultTemplate from '../components/SearchResultTemplate';
import { MovieSomServices } from '../moviesom/MovieSom';
import { Feather } from '@expo/vector-icons';
import Touchable from '../components/Touchable';

export interface GetUsersMoviesList extends Filters {
    token: string;
    query: string;
    page: number;
}

export interface Filters {
    filter_connection: number|'';
    all_filter: 'true'|'false';
    watched_filter: 'true'|'false';
    want_to_watch_filter: 'true'|'false';
    blu_ray_filter: 'true'|'false';
    dvd_filter: 'true'|'false';
    digital_filter: 'true'|'false';
    other_filter: 'true'|'false';
    lend_out_filter: 'true'|'false';
    note_filter: 'true'|'false';
    spoiler_filter: 'true'|'false';
    sort: 'added'|'updated'|'sort_watched'|'title'|'';
}

export interface GetUsersMoviesListResponse {
    getUsersMoviesList: {
        status: number,
        page: number,
        total_results: number,
        total_pages: number,
        results: GetUsersMoviesListResult[],
        execTime: number
    };
    execTime: number;
}

export interface GetUsersMoviesListResult {
    id: number;
    title: string;
    name: string;
    overview: string;
    description: string;
    biography: string;
    runtime: number;
    number_of_episodes: number;
    number_of_seasons: number;
    first_air_date: string;
    release_date: string;
    last_air_date: string;
    backdrop_path: string;
    poster_path: string;
    episode_title: string;
    season_number: number;
    episode_number: number;
    air_date: string;
    tmdb_id: number;
    rating: number;
    votes: number;
    updated: string;
    imdb_id: string;
    watched: number;
    want_to_watch: number;
    blu_ray: number;
    dvd: number;
    digital: number;
    other: number;
    lend_out: number;
    recommend: number;
    added: string;
    user_updated: string;
    recommend_date: string;
    spoiler: string;
    media_type: 'movie'|'tv'|'episode';
    adult: any;
    original_title: string;
    popularity: any;
    video: boolean;
    vote_average: number;
    vote_count: number;
    owned: number;
}

export interface Props {
    page: number;
    totalPages: number;
    loginToken: string;
    loggedIn: boolean;
    navigation: any;
    actions: any;
    collectionActions: any;
    collectionItems: any[any];
    filterConnection: number|'';
    watchedFilter: 'true'|'false';
    wantToWatchFilter: 'true'|'false';
    bluRayFilter: 'true'|'false';
    dvdFilter: 'true'|'false';
    digitalFilter: 'true'|'false';
    otherFilter: 'true'|'false';
    lendOutFilter: 'true'|'false';
    noteFilter: 'true'|'false';
    spoilerFilter: 'true'|'false';
    sort: 'added'|'updated'|'sort_watched'|'title'|'';
    allFilter: 'true'|'false';
    refreshView: boolean;
    post: (service: MovieSomServices, urlParams: string, payload: string) => Promise<any>;
}

export default class CollectionScreen extends React.PureComponent<Props, any> {
    static navigationOptions = {
        title: 'Collection'
    };

    static getDerivedStateFromProps(props: Props, state: any) {
        if (props.loggedIn !== state.loggedIn) {
            return {loggedIn: props.loggedIn};
        }
        return null;
    }

    state: any = {
        refreshing: true,
        collectionSearchText: '',
    };

    private loadingPage: number[] = [];

    componentDidMount() {
        if (!this.props.collectionItems || !this.props.collectionItems.length) {
            this.searchCollection();
        } else {
            AsyncStorage.getItem('collectionSearchText').then((collectionSearchText: string) => {
                this.setState({
                    refreshing: false,
                    collectionSearchText
                });
            });
        }
    }

    componentDidUpdate(prevProps: Props, prevState: any) {
        // If login state changed or any of the filter settings
        if (this.state.loggedIn !== prevState.loggedIn
            || this.props.filterConnection !== prevProps.filterConnection
            || this.props.watchedFilter !== prevProps.watchedFilter
            || this.props.wantToWatchFilter !== prevProps.wantToWatchFilter
            || this.props.bluRayFilter !== prevProps.bluRayFilter
            || this.props.dvdFilter !== prevProps.dvdFilter
            || this.props.digitalFilter !== prevProps.digitalFilter
            || this.props.otherFilter !== prevProps.otherFilter
            || this.props.lendOutFilter !== prevProps.lendOutFilter
            || this.props.noteFilter !== prevProps.noteFilter
            || this.props.spoilerFilter !== prevProps.spoilerFilter
            || this.props.allFilter !== prevProps.allFilter
            || this.props.sort !== prevProps.sort
        ) {
            this.searchCollection();
        }
    }

    /**
     * Our backend returns all values as Strings even though some should be numbers.
     * We keep the backend as-is so it keeps working with legacy products.
     * So we have to sanitize the data ourselves here.
     */
    sanitize = (results: GetUsersMoviesListResult[]): GetUsersMoviesListResult[] => {
        const newResults = [...results];
        newResults.forEach((item: GetUsersMoviesListResult, idx: number, arr: GetUsersMoviesListResult[]) => {
            const newItem: GetUsersMoviesListResult = {
                ...item,
                id: parseInt(`${item.id}`, 10),
                want_to_watch: parseInt(`${item.want_to_watch}`, 10) || 0,
                first_air_date: item.release_date,
                name: item.title
            };
            arr[idx] = newItem;
        });
        return newResults;
    }

    /**
     * Make sure the TMDb items in the Store are up-to-date.
     */
    updateStore = (results: GetUsersMoviesListResult[], replace: boolean = false, page: number, totalPages: number) => {
        if (!results) { return; }
        const sanitizedResults = this.sanitize(results);
        if (replace) {
            this.props.collectionActions.setCollectionItems(sanitizedResults);
        } else {
            // Add/merge to the `collection` Redux store when not replacing the collection results list.
            this.props.collectionActions.addCollectionItems(sanitizedResults);
        }
        // Add/merge items to the `tmdb` Redux store.
        this.props.actions.addItems(sanitizedResults);
        this.props.collectionActions.setCollectionPage(page);
        this.props.collectionActions.setCollectionTotalPages(totalPages);
    }

    loadNextPage = async () => {
        this.setState({refreshing: true});
        if (this.props.page < this.props.totalPages && this.loadingPage.indexOf(this.props.page) === -1) {
            await this.searchCollection(this.state.collectionSearchText, this.props.page + 1);
        }
        this.setState({refreshing: false});
    }

    searchCollection = async (query: string = '', page: number = 1) => {
        try {
            this.setState({refreshing: true});
            AsyncStorage.setItem('collectionSearchText', query);
            const payload: GetUsersMoviesList = {
                token: this.props.loginToken,
                query,
                filter_connection: this.props.filterConnection,
                watched_filter: this.props.watchedFilter,
                want_to_watch_filter: this.props.wantToWatchFilter,
                blu_ray_filter: this.props.bluRayFilter,
                dvd_filter: this.props.dvdFilter,
                digital_filter: this.props.digitalFilter,
                other_filter: this.props.otherFilter,
                lend_out_filter: this.props.lendOutFilter,
                note_filter: this.props.noteFilter,
                spoiler_filter: this.props.spoilerFilter,
                sort: this.props.sort,
                all_filter: this.props.allFilter,
                page
            };
            const response: GetUsersMoviesListResponse = await this.props.post('getUsersMoviesList', '', JSON.stringify(payload)).then((data: any) => data.json());
            if (page > 1) {
                this.updateStore(response.getUsersMoviesList.results, false, response.getUsersMoviesList.page, response.getUsersMoviesList.total_pages);
            } else {
                this.updateStore(response.getUsersMoviesList.results, true, response.getUsersMoviesList.page, response.getUsersMoviesList.total_pages);
            }
            this.setState({refreshing: false});
        } catch {
            this.setState({refreshing: false});
        }
    }

    keyExtractor = (item: any, index: number) => `${item.id}${index}`;

    handleMoviePress = (movie: any) => {
        requestAnimationFrame(() => {
            this.props.navigation.push('MovieDetails', movie);
        });
    }

    handleTvPress = (tv: any) => {
        requestAnimationFrame(() => {
            this.props.navigation.push('TvDetails', tv);
        });
    }

    handlePersonPress = (person: any) => {
        requestAnimationFrame(() => {
            this.props.navigation.push('PersonDetails', person);
        });
    }

    render() {
        return this.props.loggedIn ? (
            <View style={viewStyle.view}>
                <FlatList
                    style={searchScreenStyle.flatList}
                    data={this.props.collectionItems}
                    extraData={this.props.collectionItems}
                    keyExtractor={this.keyExtractor}
                    ListEmptyComponent={<Text style={sectionListStyle.header}>Nothing found</Text>}
                    initialNumToRender={4}
                    renderItem={(data: any) => (
                        <SearchResultTemplate
                            {...data.item}
                            handleOnTvPress={this.handleTvPress}
                            handleOnMoviePress={this.handleMoviePress}
                            handleOnPersonPress={this.handlePersonPress}
                            navigation={this.props.navigation}
                        />
                    )}
                    refreshing={this.state.refreshing}
                    onRefresh={this.searchCollection}
                    onEndReached={this.loadNextPage}
                />
                <View style={searchScreenStyle.searchBar}>
                    <Touchable
                        style={{flex: 0}}
                        onPress={() => this.props.navigation.push('CollectionFilter')}
                    >
                        <View style={{backgroundColor: movieSomColor,
                            width: 44,
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <Feather name="filter" size={32} color={backgroundColor}/>
                        </View>
                    </Touchable>
                    <TextInput
                        accessibilityLabel='Search movie or tv series in your collection'
                        style={searchScreenStyle.searchInput}
                        onChangeText={(collectionSearchText: string) => { this.setState({collectionSearchText}); }}
                        placeholder='Search movie/tv series in your collection'
                        autoCorrect={false}
                        clearButtonMode='always'
                        keyboardType='web-search'
                        selectTextOnFocus={true}
                        underlineColorAndroid={transparentColor}
                        onSubmitEditing={(e: any) => {
                            this.props.collectionActions.setCollectionPage(1);
                            this.searchCollection(e.nativeEvent.text);
                        }}
                        enablesReturnKeyAutomatically={true}
                        value={this.state.collectionSearchText}
                    />
                </View>
            </View>
        ) :
        (
            <View style={viewStyle.view}>
                <Text style={textStyle.loginReason}>Log in to keep track of your personal collection.</Text>
                <Button title="Login" onPress={() => this.props.navigation.push('Login', {
                    loginReason: 'Log in to keep track of your personal collection.'
                })}/>
            </View>
        );
    }
}
