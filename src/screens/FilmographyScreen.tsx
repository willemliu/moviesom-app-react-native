import React from 'react';
import { Text, View, FlatList, SectionList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {backgroundColor, searchResultStyle, searchScreenStyle, sectionListStyle} from "../styles/Styles";
import SearchResultTemplate from '../components/SearchResultTemplate';

export default class FilmographyScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Filmography',
    };

    componentDidMount() {
        console.log('Filmography', this.props.id, this.props.title || this.props.name);
    }

    keyExtractor = (item: any, index: number) => `${item.id}${index}`;

    handleTvPress = (tmdbItem: any) => {
        requestAnimationFrame(() => {
                this.props.navigation.navigate('TvDetails', tmdbItem);
        });
    }

    handleMoviePress = (tmdbItem: any) => {
        requestAnimationFrame(() => {
            this.props.navigation.navigate('MovieDetails', tmdbItem);
        });
    }

    render() {
        const sections = [];
        if (this.props.combined_credits) {
            if (this.props.combined_credits.cast.length) {
                sections.push({title: 'Cast', data: this.props.combined_credits.cast});
            }
            if (this.props.combined_credits.crew.length) {
                sections.push({title: 'Crew', data: this.props.combined_credits.crew});
            }
        }
        return (
            <View style={{flex: 1, backgroundColor}}>
                <SectionList
                    sections={sections}
                    ListEmptyComponent={<Text style={sectionListStyle.header}>No information</Text>}
                    stickySectionHeadersEnabled={true}
                    style={[searchScreenStyle.flatList, {backgroundColor}]}
                    extraData={this.props.combined_credits}
                    keyExtractor={this.keyExtractor}
                    ItemSeparatorComponent={(props: any, state: any) => <Text style={{backgroundColor: '#eee', height: 1}}/>}
                    initialNumToRender={4}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={sectionListStyle.header}>{title}</Text>
                    )}
                    renderItem={(data: any) => {
                        return (
                            <SearchResultTemplate
                                {...data.item}
                                handleOnTvPress={this.handleTvPress}
                                handleOnMoviePress={this.handleMoviePress}
                                navigation={this.props.navigation}
                            />
                        );
                    }}
                />
            </View>
        );
    }
}
