import React from 'react';
import {Image, Linking, Text, TextInput, View, Modal, TouchableHighlight, FlatList} from 'react-native';
import {textStyle, viewStyle} from "../styles/Styles";
import SearchResult from '../components/SearchResult';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class SearchScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Search',
    };

    state: any;

    data: any[] = [];

    constructor(props: any) {
        super(props);
        for (let i = 0; i < 100; ++i) {
            this.data.push({
                id: i,
                title: `title${i}`,
                description: `Description${i} Description Description Description Description Description Description Description Description Description Description`
            });
        }
        this.state = {
            selected: new Map<string, boolean>(),
            data: this.data
        };
    }

    keyExtractor = (item: any, index: number) => item.id;

    handleOnPress = (id: number) => {
        this.setState((state: any) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return {selected};
        });

        this.props.navigation.navigate('Details', {depth: 0, id, name: id});
    }

    render() {
        return (
            <View style={viewStyle.view}>
                <FlatList
                    style={{flex: 1, width: '100%'}}
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor}
                    renderItem={(data) => <SearchResult {...data.item} handleOnPress={this.handleOnPress}/>}
                />

                <Text onPress={() => Linking.openURL('exp://exp.host/@willem_liu/react-native-ts?tmdbMovieId=500')} style={textStyle.button}>Linking</Text>
                <Text onPress={() => this.props.navigation.navigate('Donate', {url: 'https://app.moviesom.com'})} style={textStyle.button}>MovieSom</Text>
                <TextInput
                    style={{height: 40, width: '100%', paddingLeft: 5, paddingRight: 5, fontSize: 18, borderBottomColor: '#e1e1e1'}}
                    onChangeText={(searchText) => { this.setState({searchText}); }}
                    placeholder='Search movie/tv series/person'
                    autoCorrect={false}
                    clearButtonMode='while-editing'
                    keyboardType='web-search'
                />
                <KeyboardSpacer/>
            </View>
        );
    }
}
