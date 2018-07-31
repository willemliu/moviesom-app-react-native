import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {viewStyle, searchScreenStyle, sectionListStyle} from "../styles/Styles";
import {SearchNewsResult} from "../redux/TmdbReducer";
import { MovieProps, MovieNewsResponseType } from '../interfaces/Movie';
import { TvProps, TvNewsResponseType } from '../interfaces/Tv';
import { PersonProps, PersonNewsResponseType } from '../interfaces/Person';

export interface Props extends PersonProps, TvProps, MovieProps {
    actions: any;
    newsItems: any[];
    offset: number;
    navigation: any;
    getNews: (item: any, offset: number) => Promise<MovieNewsResponseType&TvNewsResponseType&PersonNewsResponseType>;
}

export default class NewsScreen extends React.PureComponent<Props, any> {
    static navigationOptions = {
        title: 'News'
    };

    state: any = {
        refreshing: true
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
        if (this.loadingOffset.indexOf(this.offset) === -1) {
            const news = await this.loadNews(this.offset + 5);
            this.updateStore(news);
        }
    }

    loadNews = async (offset: number = 0) => {
        this.loadingOffset.push(offset);
        requestAnimationFrame(() => {
            this.setState({refreshing: true});
        });
        const news = await this.props.getNews(this.props, offset);
        requestAnimationFrame(() => {
            this.setState({refreshing: false});
        });
        this.offset = offset;
        this.loadingOffset.splice(this.loadingOffset.indexOf(offset), 1);
        return news;
    }

    refresh = async () => {
        try {
            this.offset = 0;
            const news = await this.loadNews();
            this.updateStore(news, true);
        } catch {
            this.setState({refreshing: false});
        }
    }

    updateStore = (news: MovieNewsResponseType&TvNewsResponseType&PersonNewsResponseType, replace: boolean = false) => {
        let items: any[any];
        if (news.getMovieNews) {
            items = news.getMovieNews.message;
        } else if (news.getPersonNews) {
            items = news.getPersonNews.message;
        } else if (news.getTvNews) {
            items = news.getTvNews.message;
        }

        if (replace) {
            this.props.actions.setItemNews(this.props, items);
        } else {
            this.props.actions.addItemNews(this.props, items);
        }
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
