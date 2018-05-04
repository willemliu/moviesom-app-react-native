import React from 'react';
import {Image, Linking, Text, TextInput, View, Modal, TouchableHighlight, FlatList} from 'react-native';
import {textStyle, viewStyle, searchScreenStyle, movieSomColor, textInputStyle} from "../styles/Styles";
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

    keyExtractor = (item: any, index: number) => `${item.id}`;

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
                    style={searchScreenStyle.flatList}
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor}
                    renderItem={(data) => <SearchResult {...data.item} handleOnPress={this.handleOnPress}/>}
                />

                <View style={{flexDirection: 'row', borderColor: '#008CBA', borderWidth: 2, borderTopLeftRadius: 3, borderTopRightRadius: 3, width: '100%'}}>
                    <TextInput
                        accessibilityLabel='Search movie or tv series or person'
                        style={textInputStyle.textInput}
                        onChangeText={(searchText) => { this.setState({searchText}); }}
                        placeholder='Search movie/tv series/person'
                        autoCorrect={false}
                        clearButtonMode='always'
                        keyboardType='web-search'
                        underlineColorAndroid={movieSomColor}
                    />
                </View>
                <KeyboardSpacer/>
            </View>
        );
    }
}
