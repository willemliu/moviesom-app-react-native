import React from 'react';
import { Text, View, FlatList, SectionList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {backgroundColor, searchResultStyle, searchScreenStyle, sectionListStyle} from "../styles/Styles";
import { SearchPersonResult } from '../redux/TmdbReducer';
import SearchPictureResult from '../components/SearchPictureResult';

export default class PicturesScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Pictures',
    };

    componentDidMount() {
        console.log('Pictures', this.props.id, this.props.title || this.props.name);
    }

    keyExtractor = (item: any, index: number) => `${item.id}${index}`;

    handlePress = () => {
        console.log('Picture pressed');
    }

    render() {
        const sections = [];
        if (this.props.tagged_images) {
            if (this.props.tagged_images.results.length) {
                sections.push({title: 'Tagged', data: this.props.tagged_images.results});
            }
        }
        return (
            <View style={{flex: 1, backgroundColor}}>
                <SectionList
                    sections={sections}
                    ListEmptyComponent={<Text style={sectionListStyle.header}>No pictures</Text>}
                    stickySectionHeadersEnabled={true}
                    style={[searchScreenStyle.flatList, {backgroundColor}]}
                    extraData={this.props.tagged_images.results}
                    keyExtractor={this.keyExtractor}
                    ItemSeparatorComponent={(props: any, state: any) => <Text style={{backgroundColor: '#eee', height: 1}}/>}
                    initialNumToRender={4}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={sectionListStyle.header}>{title}</Text>
                    )}
                    renderItem={(data: any) => {
                        return (
                            <SearchPictureResult {...data.item}/>
                        );
                    }}
                />
            </View>
        );
    }
}
