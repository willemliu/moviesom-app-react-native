import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {backgroundColor, searchResultStyle, searchScreenStyle, sectionListStyle, detailStyle} from "../styles/Styles";
import { SearchPersonResult, SearchPictureResult } from '../redux/TmdbReducer';

export default class PicturesScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Pictures',
    };

    state: any = {
        refreshing: false,
        items: [],
        loadingPage: [],
    };

    private loadingPage: number[] = [];

    componentDidMount() {
        this.refresh();
    }

    refresh = () => {
        this.setState({refreshing: true});
        if (this.props.images) {
            if (this.props.images.profiles.length) {
                this.setState({
                    page: 1,
                    items: [...this.props.images.profiles]
                });
            }
        }
        this.setState({refreshing: false});
    }

    keyExtractor = (item: any, index: number) => `${item.id}${index}`;

    render() {
        return (
            <View style={{flex: 1, backgroundColor}}>
                <FlatList
                    data={this.state.items}
                    ListEmptyComponent={<Text style={sectionListStyle.header}>No pictures</Text>}
                    style={[searchScreenStyle.flatList, {backgroundColor: 'black'}]}
                    extraData={this.state.items}
                    keyExtractor={this.keyExtractor}
                    initialNumToRender={4}
                    renderItem={(data: any) => {
                        return (
                            <SearchPictureResult style={{marginTop: 50, marginBottom: 50}} {...data.item}/>
                        );
                    }}
                    refreshing={this.state.refreshing}
                    onRefresh={this.refresh}
                />
            </View>
        );
    }
}
