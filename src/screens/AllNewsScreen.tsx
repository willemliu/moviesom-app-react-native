import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {viewStyle, searchScreenStyle, sectionListStyle} from "../styles/Styles";
import {getNews} from "../moviesom/MovieSom";
import {SearchNewsResult} from "../redux/TmdbReducer";

export default class AllNewsScreen extends React.PureComponent<any, any> {
    static navigationOptions = {
        title: 'News'
    };

    state: any = {
        refreshing: true,
    };

    private loadingOffset: number[] = [];

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.refresh();
    }

    loadNextPage = async () => {
        console.log('load next news by offset', this.props.offset, this.props.totalNews, this.props.offset < this.props.totalNews, this.loadingOffset.indexOf(this.props.offset) === -1);
        if (this.props.offset < this.props.totalNews && this.loadingOffset.indexOf(this.props.offset) === -1) {
            const news = await this.loadNews(this.props.offset + 10);
            this.updateStore(news.getNews.message, news.getNews.offset, news.getNews.totalNews);
        }
    }

    loadNews = async (offset: number = 0) => {
        this.loadingOffset.push(offset);
        this.setState({refreshing: true});
        const news = await getNews(offset);
        this.setState({refreshing: false});
        this.loadingOffset.splice(this.loadingOffset.indexOf(offset), 1);
        return news;
    }

    refresh = async () => {
        this.props.newsActions.setNewsOffset(0);
        const news = await this.loadNews();
        this.updateStore(news.getNews.message, news.getNews.offset, news.getNews.totalNews, true);
    }

    updateStore = (items: any[any], offset: number, totalNews: number, replace: boolean = false) => {
        if (replace) {
            this.props.newsActions.setNewsItems(items);
        } else {
            this.props.newsActions.addNewsItems(items);
        }
        this.props.newsActions.setNewsOffset(offset);
        this.props.newsActions.setNewsTotalNews(totalNews);
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
                    data={this.props.newsItems}
                    extraData={this.props.newsItems}
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
