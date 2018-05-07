import React from 'react';
import {Image, Linking, Text, TextInput, View, Modal, TouchableHighlight, FlatList, RefreshControl, TouchableNativeFeedback} from 'react-native';
import {textStyle, viewStyle, searchScreenStyle, movieSomColor, textInputStyle, transparentColor} from "../styles/Styles";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { get } from '../tmdb/TMDb';
import { SearchMovieResult } from '../redux/TmdbReducer';
import SearchTvResult from '../components/SearchTvResult';
import SearchPersonResult from '../components/SearchPersonResult';

export default class SearchScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Search'
    };

    state: any = {
        refreshing: true
    };
    private searchText: string = '';
    private page = 1;
    private totalPages = 1;
    private totalResults = 1;
    private loadingPage: number[] = [];

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.search();
    }

    getNowPlaying = async (page: number = 1) => {
        this.loadingPage.push(page);
        const data = await get('/movie/now_playing', `page=${page}`).then((payload) => payload.json());
        this.loadingPage.splice(this.loadingPage.indexOf(page), 1);
        this.updateStore(data.results, (page === 1));
        this.page = parseInt(data.page, 10);
        this.totalPages = parseInt(data.total_pages, 10);
        this.totalResults = parseInt(data.total_results, 10);
    }

    getSearchMulti = async (page: number = 1) => {
        this.loadingPage.push(page);
        const data = await get('/search/multi', `page=${page}&query=${encodeURI(this.searchText)}`).then((payload) => payload.json());
        this.loadingPage.splice(this.loadingPage.indexOf(page), 1);
        this.updateStore(data.results, (page === 1));
        this.page = parseInt(data.page, 10);
        this.totalPages = parseInt(data.total_pages, 10);
        this.totalResults = parseInt(data.total_results, 10);
    }

    updateStore = (results: any[], replace: boolean = false) => {
        if (replace) {
            this.props.searchActions.setSearchItems(results);
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
        if (this.page < this.totalPages && this.loadingPage.indexOf(this.page) === -1) {
            await this.getNowPlaying(this.page + 1);
        }
    }

    search = async (searchText: string = this.searchText) => {
        if (searchText) {
            this.searchText = this.searchText;
            await this.getSearchMulti();
        } else {
            await this.getNowPlaying();
        }
        this.setState({refreshing: false});
    }

    refresh = async () => {
        this.page = 1;
        this.search();
    }

    keyExtractor = (item: any, index: number) => `${item.id}${index}`;

    handleMoviePress = (id: number|null|undefined) => {
        if (id === null || id === undefined) { return ; }
        const result = this.props.items.find((item: any) => item.id === id);
        this.props.navigation.navigate('MovieDetails', result);
    }

    handleTvPress = (id: number|null|undefined) => {
        if (id === null || id === undefined) { return ; }
        const result = this.props.items.find((item: any) => item.id === id);
        this.props.navigation.navigate('TvDetails', result);
    }

    handlePersonPress = (id: number|null|undefined) => {
        if (id === null || id === undefined) { return ; }
        const result = this.props.items.find((item: any) => item.id === id);
        this.props.navigation.navigate('PersonDetails', result);
    }

    getSearchResultTemplate = (data: any): JSX.Element|null => {
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
                        media_type={'movie'}
                        ownMovie={item}
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
                    extraData={this.props}
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
                        onChangeText={(searchText) => { this.searchText = searchText; }}
                        placeholder='Search movie/tv series/person'
                        autoCorrect={false}
                        clearButtonMode='always'
                        keyboardType='web-search'
                        underlineColorAndroid={transparentColor}
                        onSubmitEditing={(e) => { this.page = 1; this.search(e.nativeEvent.text); }}
                        enablesReturnKeyAutomatically={true}
                    />
                </View>
                <KeyboardSpacer/>
            </View>
        );
    }
}
