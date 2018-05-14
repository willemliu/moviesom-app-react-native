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
        console.log('Pictures', this.props.id, this.props.title || this.props.name);
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
