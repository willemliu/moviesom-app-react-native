import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {backgroundColor, searchResultStyle, searchScreenStyle} from "../styles/Styles";
import { SearchPersonResult } from '../redux/TmdbReducer';

export default class CastAndCrewScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Cast & Crew',
    };

    componentDidMount() {
        console.log('Cast & Crew');
    }

    keyExtractor = (item: any, index: number) => `${item.id}${index}`;

    handlePersonPress = (person: any) => {
        if (person === null || person === undefined) { return ; }
        const result = this.props.tmdbItems.find((item: any) => (item.id === person.id && item.media_type === 'person')) || person;
        this.props.navigation.navigate('PersonDetails', result);
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor}}>
                <Text style={searchResultStyle.title}>Cast</Text>
                <FlatList
                    style={[searchScreenStyle.flatList, {backgroundColor}]}
                    data={this.props.credits.cast}
                    extraData={this.props.credits.cast}
                    keyExtractor={this.keyExtractor}
                    initialNumToRender={4}
                    renderItem={(data: any) => {
                        return (
                            <SearchPersonResult
                                style={{
                                    borderBottomColor: '#323232',
                                    borderBottomWidth: 1,
                                }}
                                {...data.item}
                                media_type='person'
                                navigation={this.props.navigation}
                                handleOnPress={this.handlePersonPress}
                            />
                        );
                    }}
                />
            </View>
        );
    }
}
