import React from 'react';
import {Text, TextInput, View, FlatList, AsyncStorage} from 'react-native';
import {viewStyle, searchScreenStyle, transparentColor, sectionListStyle} from "../styles/Styles";
import SearchResultTemplate from '../components/SearchResultTemplate';

export default class SearchScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Search'
    };

    state: any = {
        refreshing: true,
        searchText: '',
    };

    private loadingPage: number[] = [];

    constructor(props: any) {
        super(props);
        if (!this.props.searchItems || !this.props.searchItems.length) {
            this.search();
        } else {
            AsyncStorage.getItem('searchText').then((searchText: string) => {
                this.setState({
                    refreshing: false,
                    searchText
                });
            });
        }
    }

    getNowPlaying = async (page: number = 1) => {
        this.loadingPage.push(page);
        const data = await this.props.get('/movie/now_playing', `page=${page}`).then((payload: any) => payload.json());
        data.results.forEach((value: any, idx: number, arr: any[]) => {
            // Set media_type to movie for every item as they come without media_type.
            arr[idx].media_type = 'movie';
        });
        this.loadingPage.splice(this.loadingPage.indexOf(page), 1);
        this.updateStore(data.results, (page === 1), data.page, data.total_pages);
    }

    getSearchMulti = async (page: number = 1) => {
        this.loadingPage.push(page);
        const data = await this.props.get('/search/multi', `page=${page}&query=${encodeURI(this.state.searchText)}`).then((payload: any) => payload.json());
        this.loadingPage.splice(this.loadingPage.indexOf(page), 1);
        this.updateStore(data.results, (page === 1), data.page, data.total_pages);
    }

    /**
     * Make sure the TMDb items in the Store are up-to-date.
     */
    updateStore = (results: any[], replace: boolean = false, page: number, totalPages: number) => {
        if (replace) {
            this.props.searchActions.setSearchItems(results);
        } else {
            // Add/merge to the `search` Redux store when not replacing the search results list.
            this.props.searchActions.addSearchItems(results);
        }
        // Add/merge items to the `tmdb` Redux store.
        this.props.actions.addItems(results);
        this.props.searchActions.setSearchPage(page);
        this.props.searchActions.setSearchTotalPages(totalPages);
    }

    loadNextPage = async () => {
        this.setState({refreshing: true});
        console.log('load next page', this.props.page < this.props.totalPages, this.loadingPage.indexOf(this.props.page) === -1);
        if (this.props.page < this.props.totalPages && this.loadingPage.indexOf(this.props.page) === -1) {
            await this.getNowPlaying(this.props.page + 1);
        }
        this.setState({refreshing: false});
    }

    search = async (searchText: string = this.state.searchText) => {
        this.setState({refreshing: true});
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

    refresh = () => {
        this.props.searchActions.setSearchPage(1);
        this.search();
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
        return (
            <View style={viewStyle.view}>
                <FlatList
                    style={searchScreenStyle.flatList}
                    data={this.props.searchItems}
                    extraData={this.props.searchItems}
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
                    onRefresh={this.refresh}
                    onEndReached={this.loadNextPage}
                />

                <View style={searchScreenStyle.searchBar}>
                    <TextInput
                        accessibilityLabel='Search movie or tv series or person'
                        style={searchScreenStyle.searchInput}
                        onChangeText={(searchText: string) => { this.setState({searchText}); }}
                        placeholder='Search movie/tv series/person'
                        autoCorrect={false}
                        clearButtonMode='always'
                        keyboardType='web-search'
                        selectTextOnFocus={true}
                        underlineColorAndroid={transparentColor}
                        onSubmitEditing={(e: any) => {
                            this.props.searchActions.setSearchPage(1);
                            this.search(e.nativeEvent.text);
                        }}
                        enablesReturnKeyAutomatically={true}
                        value={this.state.searchText}
                    />
                </View>
            </View>
        );
    }
}
