import React from 'react';
import {Image, Linking, Text, TextInput, View, Modal, TouchableHighlight, FlatList, RefreshControl, TouchableNativeFeedback} from 'react-native';
import {textStyle, viewStyle, searchScreenStyle, movieSomColor, textInputStyle, transparentColor} from "../styles/Styles";
import SearchResult from '../components/SearchResult';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { get } from '../tmdb/TMDb';

export default class SearchScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Search',
        data: []
    };

    state: any = {
        searchTimestamp: new Date().getTime(),
        data: [],
        refreshing: false
    };
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
            // searchTimestamp: new Date().getTime(),
            data: this.state.data.concat(...upcoming.results)
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

    search = async () => {
        if (this.state.searchText) {
            this.getNowPlaying();
        } else {
            this.setState({data: []});
            // this.setState({searchTimestamp: new Date().getTime()});
        }
    }

    keyExtractor = (item: any, index: number) => `${item.id}${index}`;

    handleOnPress = (id: number|null|undefined) => {
        if (id === null || id === undefined) { return ; }
        const result = this.state.data.find((item: any) => item.id === id);
        this.props.navigation.navigate('Details', result);
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
                    renderItem={(data) => (
                        <SearchResult
                            {...data.item}
                            handleOnPress={this.handleOnPress}
                            navigation={this.props.navigation}
                        />
                    )}
                    refreshing={this.state.refreshing}
                    onRefresh={this.search}
                    onEndReached={this.loadNextPage}
                />

                <View style={{flexDirection: 'row', borderColor: '#008CBA', borderWidth: 2, borderTopLeftRadius: 3, borderTopRightRadius: 3, width: '100%'}}>
                    <TextInput
                        accessibilityLabel='Search movie or tv series or person'
                        style={searchScreenStyle.searchInput}
                        onChangeText={(searchText) => { this.setState({searchText}); }}
                        placeholder='Search movie/tv series/person'
                        autoCorrect={false}
                        clearButtonMode='always'
                        keyboardType='web-search'
                        underlineColorAndroid={transparentColor}
                    />
                </View>
                <KeyboardSpacer/>
            </View>
        );
    }
}
