import React from 'react';
import { Text, View, FlatList } from 'react-native';
import {backgroundColor, searchScreenStyle, sectionListStyle} from "../styles/Styles";
import { SearchPictureResult } from '../redux/TmdbReducer';

export default class PicturesScreen extends React.PureComponent<any, any> {
    static navigationOptions = {
        title: 'Images',
    };

    keyExtractor = (item: any, index: number) => `${item.id}${index}`;

    render() {
        let items: any[] = [];
        if (this.props.images) {
            if (this.props.images.profiles.length) {
                items = [...this.props.images.profiles];
            }
        }
        return (
            <View style={{flex: 1, backgroundColor}}>
                <FlatList
                    data={items}
                    ListEmptyComponent={<Text style={sectionListStyle.header}>No pictures</Text>}
                    style={[searchScreenStyle.flatList, {backgroundColor: 'black'}]}
                    extraData={this.props.images}
                    keyExtractor={this.keyExtractor}
                    initialNumToRender={4}
                    renderItem={(data: any) => {
                        return (
                            <SearchPictureResult style={{marginTop: 50, marginBottom: 50}} {...data.item}/>
                        );
                    }}
                />
            </View>
        );
    }
}
