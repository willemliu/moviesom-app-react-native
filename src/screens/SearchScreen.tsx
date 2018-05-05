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

    data: any[] = [];
    state: any = {
        data: this.data,
        refreshing: false
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.getInitialData();
    }

    getInitialData = async () => {
        const upcoming = await get('/movie/now_playing').then((data) => data.json());
        this.setState({
            data: upcoming.results
        });
    }

    keyExtractor = (item: any, index: number) => `${item.id}`;

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
                    renderItem={(data) => (
                        <SearchResult
                            {...data.item}
                            handleOnPress={this.handleOnPress}
                            navigation={this.props.navigation}
                        />
                    )}
                    refreshControl={(
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {setTimeout(() => { this.setState({refreshing: false}); }, 1000); }}
                        />
                    )}
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
