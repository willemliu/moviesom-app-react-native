import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {backgroundColor, searchScreenStyle, sectionListStyle} from "../styles/Styles";
import {SearchSeasonResult} from "../redux/TmdbReducer";

export default class SeasonsScreen extends React.PureComponent<any, any> {
    static navigationOptions = {
        title: 'Seasons',
    };

    componentDidMount() {
        console.log('Seasons', this.props.id, this.props.title || this.props.name);
    }

    keyExtractor = (item: any, index: number) => `${item.id}${index}`;

    handleSeasonPress = (season: any) => {
        requestAnimationFrame(() => {
            if (season) {
                console.log(season);
                this.props.navigation.push('SeasonDetails', season);
            }
        });
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor}}>
                <FlatList
                    data={this.props.seasons}
                    ListEmptyComponent={<Text style={sectionListStyle.header}>No seasons</Text>}
                    style={[searchScreenStyle.flatList, {backgroundColor}]}
                    extraData={this.props.seasons}
                    keyExtractor={this.keyExtractor}
                    ItemSeparatorComponent={(props: any, state: any) => <Text style={{backgroundColor: '#eee', height: 1}}/>}
                    initialNumToRender={4}
                    renderItem={(data: any) => {
                        return (
                            <SearchSeasonResult
                                {...data.item}
                                media_type='season' // Setting this explicitly
                                handleOnPress={this.handleSeasonPress}
                            />
                        );
                    }}
                />
            </View>
        );
    }
}
