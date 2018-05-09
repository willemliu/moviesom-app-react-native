import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {backgroundColor, searchResultStyle, searchScreenStyle} from "../styles/Styles";
import { SearchPersonResult } from '../redux/TmdbReducer';

export default class CastAndCrewScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Cast & Crew',
    };

    componentDidMount() {
        console.log('Cast & Crew');
    }

    keyExtractor = (item: any, index: number) => `${item.id}${index}`;

    handlePersonPress = (id: number|null|undefined) => {
        if (id === null || id === undefined) { return ; }
        const result = this.props.tmdbItems.find((item: any) => (item.id === id && item.media_type === 'person'));
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
                        const item  = Object.assign({}, {media_type: 'person'}, data.item);
                        const navigation = {
                            getParam: () => null,
                            navigate: this.props.navigation.navigate
                        };
                        return (
                            <SearchPersonResult
                                style={{
                                    borderBottomColor: '#323232',
                                    borderBottomWidth: 1,
                                }}
                                {...item}
                                navigation={navigation}
                                handleOnPress={this.handlePersonPress}
                            />
                        );
                    }}
                />
            </View>
        );
    }
}
