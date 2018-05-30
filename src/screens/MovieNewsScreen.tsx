import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {viewStyle, searchScreenStyle, sectionListStyle} from "../styles/Styles";
import {SearchNewsResult} from "../redux/TmdbReducer";
import { getMovieNews } from '../moviesom/MovieSom';
import { MovieProps } from '../interfaces/Movie';

export interface Props extends MovieProps {
    offset: number;
    totalNews: number;
    navigation: any;
}

export default class MovieNewsScreen extends React.PureComponent<Props, any> {
    static navigationOptions = {
        title: 'News'
    };

    state: any = {
        refreshing: true,
        newsItems: []
    };

    private loadingOffset: number[] = [];
    private offset = 0;

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.refresh();
    }

    loadNextPage = async () => {
        console.log('load next movie news by offset', this.offset + 5, this.loadingOffset.indexOf(this.offset) === -1);
        if (this.loadingOffset.indexOf(this.offset) === -1) {
            const news = await this.loadNews(this.offset + 5);
            this.updateStore(news.getMovieNews.message, news.getMovieNews.offset);
        }
    }

    loadNews = async (offset: number = 0) => {
        this.loadingOffset.push(offset);
        requestAnimationFrame(() => {
            this.setState({refreshing: true});
        });
        const news = await getMovieNews(this.props, offset);
        requestAnimationFrame(() => {
            this.setState({refreshing: false});
        });
        this.offset = offset;
        this.loadingOffset.splice(this.loadingOffset.indexOf(offset), 1);
        return news;
    }

    refresh = async () => {
        // this.props.newsActions.setNewsOffset(0);
        this.offset = 0;
        const news = await this.loadNews();
        this.updateStore(news.getMovieNews.message, this.offset, true);
    }

    updateStore = (items: any[any], offset: number, replace: boolean = false) => {
        if (replace) {
            this.setState({newsItems: items});
            // this.props.newsActions.setNewsItems(items);
        } else {
            const tempState: any[] = [...this.state.newsItems];
            const tempArr: any[] = [];
            // Merge found items.
            tempState.forEach((stateValue: any, idx: number, arr: any[]) => {
                const foundItem = items.find((newValue: any) => stateValue.id === newValue.id);
                if (foundItem) {
                    arr[idx] = {...stateValue, ...foundItem};
                }
            });
            // Append not found items.
            items.forEach((newValue: any, newIdx: number) => {
                const foundItem = tempState.find((stateValue: any) => stateValue.id === newValue.id);
                if (!foundItem) {
                    tempArr.push(newValue);
                }
            });

            if (tempArr.length > 0) {
                this.setState({newsItems: [...tempState, ...tempArr]});
            }
            // this.props.newsActions.addNewsItems(items);
        }
        /*this.props.newsActions.setNewsOffset(offset);
        this.props.newsActions.setNewsTotalNews(totalNews);*/
    }

    keyExtractor = (item: any, index: number) => `${item.id}${index}`;

    handleNewsPress = (news: any) => {
        requestAnimationFrame(() => {
            this.props.navigation.push('Web', {
                url: news.url,
                canGoBack: true
            });
        });
    }

    render() {
        return (
            <View style={viewStyle.view}>
                <FlatList
                    style={searchScreenStyle.flatList}
                    data={this.state.newsItems}
                    extraData={this.state.newsItems}
                    keyExtractor={this.keyExtractor}
                    ListEmptyComponent={<Text style={sectionListStyle.header}>No news</Text>}
                    initialNumToRender={4}
                    renderItem={(data: any) => (
                        <SearchNewsResult
                            {...data.item}
                            handleOnPress={this.handleNewsPress}
                            navigation={this.props.navigation}
                        />
                    )}
                    refreshing={this.state.refreshing}
                    onRefresh={this.refresh}
                    onEndReached={this.loadNextPage}
                />
            </View>
        );
    }
}
