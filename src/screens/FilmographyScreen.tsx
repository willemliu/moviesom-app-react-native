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

    getReleaseDate = (item: any): string => {
        let result = '';
        switch (item.media_type) {
            case 'movie':
                result = item.release_date;
                break;
            case 'tv':
                result = item.first_air_date;
                break;
        }
        return result;
    }

    /**
     * Sorts the given array by release date/first air date in descending order.
     */
    sortFilmography = (a: any, b: any) => {
        return +new Date(this.getReleaseDate(a)) > +new Date(this.getReleaseDate(b)) ? -1 : 1;
    }

    render() {
        const sections = [];
        if (this.props.combined_credits) {
            const cast = [...this.props.combined_credits.cast];
            const crew = [...this.props.combined_credits.crew];
            if (cast.length) {
                cast.sort(this.sortFilmography);
                sections.push({title: 'As cast', data: cast});
            }
            if (this.props.combined_credits.crew.length) {
                crew.sort(this.sortFilmography);
                sections.push({title: 'As crew', data: this.props.combined_credits.crew});
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
