import React from 'react';
import { Text, View, FlatList, SectionList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {backgroundColor, searchResultStyle, searchScreenStyle, sectionListStyle, detailStyle} from "../styles/Styles";
import { SearchPersonResult, SearchPictureResult } from '../redux/TmdbReducer';

export default class PicturesScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Pictures',
    };

    componentDidMount() {
        console.log('Pictures', this.props.id, this.props.title || this.props.name);
    }

    keyExtractor = (item: any, index: number) => `${item.id}${index}`;

    handlePress = (props: any) => {
        switch (props.media_type) {
            case 'movie':
                console.log('Open movie details', JSON.stringify(props));
                requestAnimationFrame(() => {
                    this.props.navigation.navigate('MovieDetails', props);
                });
                break;
            case 'tv':
                this.props.navigation.navigate('TvDetails', props);
                break;
        }
    }

    render() {
        const sections: any[] = [];
        if (this.props.tagged_images) {
            if (this.props.tagged_images.results.length) {
                this.props.tagged_images.results.forEach((taggedImage: any) => {
                    sections.push({title: [taggedImage], data: [taggedImage]});
                });
            }
        }
        if (this.props.images) {
            if (this.props.images.profiles.length) {
                this.props.images.profiles.forEach((image: any) => {
                    sections.push({title: [image], data: [image]});
                });
            }
        }
        return (
            <View style={{flex: 1, backgroundColor}}>
                <SectionList
                    sections={sections}
                    ListEmptyComponent={<Text style={sectionListStyle.header}>No pictures</Text>}
                    stickySectionHeadersEnabled={true}
                    style={[searchScreenStyle.flatList, {backgroundColor}]}
                    extraData={this.props}
                    keyExtractor={this.keyExtractor}
                    ItemSeparatorComponent={(props: any, state: any) => <Text style={{backgroundColor: '#eee', height: 1}}/>}
                    initialNumToRender={4}
                    renderSectionHeader={({section: {title}}) => {
                        return (<SearchPictureResult {...title[0]} {...title[0].media} handleOnPress={this.handlePress}/>);
                    }}
                    renderItem={(data: any) => {
                        if (!data.item.media) {
                            return (
                                <View style={{height: 100}}/>
                            );
                        }
                        return (
                            <View style={[detailStyle.overview, {margin: 10}]}>
                                <Text style={{fontSize: 13}} numberOfLines={2}>
                                    <Text style={{fontWeight: 'bold'}}>{data.item.media.title ? data.item.media.title : data.item.media.name}</Text>
                                    {` - `}{data.item.media.overview}
                                </Text>
                            </View>
                        );
                    }}
                />
            </View>
        );
    }
}
