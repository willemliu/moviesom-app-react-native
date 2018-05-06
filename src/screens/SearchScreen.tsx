import React from 'react';
import {Image, Linking, Text, TextInput, View, Modal, TouchableHighlight, FlatList, RefreshControl, TouchableNativeFeedback} from 'react-native';
import {textStyle, viewStyle, searchScreenStyle, movieSomColor, textInputStyle, transparentColor} from "../styles/Styles";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { get } from '../tmdb/TMDb';
import SearchMovieResult from '../components/SearchMovieResult';
import SearchTvResult from '../components/SearchTvResult';
import SearchPersonResult from '../components/SearchPersonResult';

export default class SearchScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Search',
        data: []
    };

    state: any = {
        data: [],
        refreshing: false
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
        this.getNowPlaying();
    }

    getNowPlaying = async (page: number = 1) => {
        this.loadingPage.push(page);
        const upcoming = await get('/movie/now_playing', `page=${page}`).then((data) => data.json());
        this.loadingPage.splice(this.loadingPage.indexOf(page), 1);
        this.setState({
            data: (page === 1) ? upcoming.results : this.state.data.concat(...upcoming.results)
        });
        this.page = parseInt(upcoming.page, 10);
        this.totalPages = parseInt(upcoming.total_pages, 10);
        this.totalResults = parseInt(upcoming.total_results, 10);
    }

    getSearchMulti = async (page: number = 1) => {
        this.loadingPage.push(page);
        const upcoming = await get('/search/multi', `page=${page}&query=${encodeURI(this.searchText)}`).then((data) => data.json());
        this.loadingPage.splice(this.loadingPage.indexOf(page), 1);
        this.setState({
            data: (page === 1) ? upcoming.results : this.state.data.concat(...upcoming.results)
        });
        this.page = parseInt(upcoming.page, 10);
        this.totalPages = parseInt(upcoming.total_pages, 10);
        this.totalResults = parseInt(upcoming.total_results, 10);
    }

    loadNextPage = async () => {
        if (this.page < this.totalPages && this.loadingPage.indexOf(this.page) === -1) {
            await this.getNowPlaying(this.page + 1);
        }
    }

    search = async (searchText: string = this.searchText) => {
        console.log('search text', searchText);
        if (searchText) {
            await this.getSearchMulti();
        } else {
            await this.getNowPlaying();
        }
        this.state.refreshing = false;
    }

    refresh = async () => {
        this.page = 1;
        this.search();
    }

    keyExtractor = (item: any, index: number) => `${item.id}${index}`;

    handleMoviePress = (id: number|null|undefined) => {
        if (id === null || id === undefined) { return ; }
        const result = this.state.data.find((item: any) => item.id === id);
        this.props.navigation.navigate('MovieDetails', result);
    }

    handleTvPress = (id: number|null|undefined) => {
        if (id === null || id === undefined) { return ; }
        const result = this.state.data.find((item: any) => item.id === id);
        this.props.navigation.navigate('TvDetails', result);
    }

    handlePersonPress = (id: number|null|undefined) => {
        if (id === null || id === undefined) { return ; }
        const result = this.state.data.find((item: any) => item.id === id);
        this.props.navigation.navigate('PersonDetails', result);
    }

    getSearchResultTemplate = (data: any): JSX.Element|null => {
        const item  = Object.assign({}, {media_type: 'movie'}, data.item, );
        console.log(item.media_type);
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
                        {...item}
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
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor}
                    initialNumToRender={4}
                    renderItem={this.getSearchResultTemplate}
                    refreshing={this.state.refreshing}
                    onRefresh={this.refresh}
                    onEndReached={this.loadNextPage}
                />

                <View style={{flexDirection: 'row', borderColor: '#008CBA', borderWidth: 2, borderTopLeftRadius: 3, borderTopRightRadius: 3, width: '100%'}}>
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
