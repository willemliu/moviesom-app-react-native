import React from 'react';
import {Image, Linking, Text, TextInput, View, Modal, TouchableHighlight, FlatList, RefreshControl, TouchableNativeFeedback, AsyncStorage} from 'react-native';
import {textStyle, viewStyle, searchScreenStyle, movieSomColor, textInputStyle, transparentColor} from "../styles/Styles";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { get } from '../tmdb/TMDb';
import { SearchMovieResult, SearchTvResult, SearchPersonResult } from '../redux/TmdbReducer';

export default class SearchScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Search'
    };

    state: any = {
        refreshing: true,
        searchText: '',
    };
    private page = 1;
    private totalPages = 2;
    private loadingPage: number[] = [];

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.searchItems || !this.props.searchItems.length) {
            this.search();
        } else {
            AsyncStorage.getItem('searchText').then((searchText) => {
                this.setState({
                    refreshing: false,
                    searchText
                });
            });
        }
    }

    getNowPlaying = async (page: number = 1) => {
        this.loadingPage.push(page);
        const data = await get('/movie/now_playing', `page=${page}`).then((payload) => payload.json());
        data.results.forEach((value: any, idx: number, arr: any[]) => {
            // Set media_type to movie for every item as they come without media_type.
            arr[idx].media_type = 'movie';
        });
        this.loadingPage.splice(this.loadingPage.indexOf(page), 1);
        this.updateStore(data.results, (page === 1));
        this.page = parseInt(data.page, 10);
        this.totalPages = parseInt(data.total_pages, 10);
    }

    getSearchMulti = async (page: number = 1) => {
        this.loadingPage.push(page);
        const data = await get('/search/multi', `page=${page}&query=${encodeURI(this.state.searchText)}`).then((payload) => payload.json());
        this.loadingPage.splice(this.loadingPage.indexOf(page), 1);
        this.updateStore(data.results, (page === 1));
        this.page = parseInt(data.page, 10);
        this.totalPages = parseInt(data.total_pages, 10);
    }

    /**
     * Make sure the TMDb items in the Store are up-to-date.
     */
    updateStore = (results: any[], replace: boolean = false) => {
        if (replace) {
            this.props.searchActions.setSearchItems(results);
            results.forEach((value: any) => {
                this.props.actions.addItem(value);
            });
        }
        (results as any[]).forEach((value: any) => {
            // Always add items to the `tmdb` Redux store.
            this.props.actions.addItem(value);
            // Add to the `search` Redux store when not replacing the search results list.
            if (!replace) {
                this.props.searchActions.addSearchItem(value);
            }
        });
    }

    loadNextPage = async () => {
        console.log('load next page', this.loadingPage.indexOf(this.page) === -1);
        if (this.page < this.totalPages && this.loadingPage.indexOf(this.page) === -1) {
            await this.getNowPlaying(this.page + 1);
        }
    }

    search = async (searchText: string = this.state.searchText) => {
        if (searchText) {
            // Store searchText in storage for next sessions.
            AsyncStorage.setItem('searchText', searchText);
            await this.getSearchMulti();
        } else {
            AsyncStorage.removeItem('searchText');
            await this.getNowPlaying();
        }
        this.setState({refreshing: false});
    }

    refresh = async () => {
        this.page = 1;
        this.search();
    }

    keyExtractor = (item: any, index: number) => `${item.id}${index}`;

    handleMoviePress = (props: any) => {
        const result = this.props.tmdbItems.find((item: any) => (item.id === props.id && item.media_type === 'movie')) || props;
        console.log('Load Movie Details', result.id, props.id);
        this.props.navigation.navigate('MovieDetails', result);
    }

    handleTvPress = (props: any) => {
        const result = this.props.tmdbItems.find((item: any) => (item.id === props.id && item.media_type === 'tv')) || props;
        console.log('Load TV Details', result.id, props.id);
        this.props.navigation.navigate('TvDetails', result);
    }

    handlePersonPress = (props: any) => {
        const result = this.props.tmdbItems.find((item: any) => (item.id === props.id && item.media_type === 'person')) || props;
        console.log('Load Person Details', result.id, props.id);
        this.props.navigation.navigate('PersonDetails', result);
    }

    getSearchResultTemplate = (data: any): JSX.Element|null => {
        // Make sure item has media_type when that's not set.
        const item  = Object.assign({}, {media_type: 'movie'}, data.item);
        let result = null;
        switch (item.media_type) {
            case 'tv':
                result = (
                    <SearchTvResult
                        {...item}
                        handleOnPress={this.handleTvPress}
                        navigation={this.props.navigation}
                    />
                );
                break;
            case 'person':
                result = (
                    <SearchPersonResult
                        {...item}
                        handleOnPress={this.handlePersonPress}
                        navigation={this.props.navigation}
                    />
                );
                break;
            default:
            case 'movie':
                result = (
                    <SearchMovieResult
                        id={item.id}
                        handleOnPress={this.handleMoviePress}
                        navigation={this.props.navigation}
                    />
                );
                break;
        }
        return result;
    }

    render() {
        return (
            <View style={viewStyle.view}>
                <FlatList
                    style={searchScreenStyle.flatList}
                    data={this.props.searchItems}
                    extraData={this.props.searchItems}
                    keyExtractor={this.keyExtractor}
                    initialNumToRender={4}
                    renderItem={this.getSearchResultTemplate}
                    refreshing={this.state.refreshing}
                    onRefresh={this.refresh}
                    onEndReached={this.loadNextPage}
                />

                <View style={searchScreenStyle.searchBar}>
                    <TextInput
                        accessibilityLabel='Search movie or tv series or person'
                        style={searchScreenStyle.searchInput}
                        onChangeText={(searchText) => { this.setState({searchText}); }}
                        placeholder='Search movie/tv series/person'
                        autoCorrect={false}
                        clearButtonMode='always'
                        keyboardType='web-search'
                        underlineColorAndroid={transparentColor}
                        onSubmitEditing={(e) => { this.page = 1; this.search(e.nativeEvent.text); }}
                        enablesReturnKeyAutomatically={true}
                        value={this.state.searchText}
                    />
                </View>
                <KeyboardSpacer/>
            </View>
        );
    }
}
