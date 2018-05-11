import React from 'react';
import { Text, View, FlatList, SectionList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {backgroundColor, searchResultStyle, searchScreenStyle, sectionListStyle} from "../styles/Styles";
import { SearchPersonResult } from '../redux/TmdbReducer';

export default class CastAndCrewScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Cast & Crew',
    };

    componentDidMount() {
        console.log('Cast & Crew', this.props.id, this.props.title || this.props.name);
    }

    keyExtractor = (item: any, index: number) => `${item.id}${index}`;

    handlePersonPress = (person: any) => {
        requestAnimationFrame(() => {
            if (person) {
                this.props.navigation.navigate('PersonDetails', person);
            }
        });
    }

    render() {
        const sections = [];
        if (this.props.credits) {
            if (this.props.credits.cast.length) {
                sections.push({title: 'Cast', data: this.props.credits.cast});
            }
            if (this.props.credits.crew.length) {
                sections.push({title: 'Crew', data: this.props.credits.crew});
            }
        }
        return (
            <View style={{flex: 1, backgroundColor}}>
                <SectionList
                    sections={sections}
                    ListEmptyComponent={<Text style={sectionListStyle.header}>No information</Text>}
                    stickySectionHeadersEnabled={true}
                    style={[searchScreenStyle.flatList, {backgroundColor}]}
                    extraData={this.props.credits}
                    keyExtractor={this.keyExtractor}
                    ItemSeparatorComponent={(props: any, state: any) => <Text style={{backgroundColor: '#eee', height: 1}}/>}
                    initialNumToRender={4}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={sectionListStyle.header}>{title}</Text>
                    )}
                    renderItem={(data: any) => {
                        return (
                            <SearchPersonResult
                                {...data.item}
                                media_type='person' // Setting this explicitly
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
