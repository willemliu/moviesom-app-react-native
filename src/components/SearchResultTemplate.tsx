import React from 'react';
import { SearchTvResult, SearchPersonResult, SearchMovieResult2 as SearchMovieResult } from '../redux/TmdbReducer';

export interface Props {
    media_type: string;
    handleOnTvPress?: (props: any) => void;
    handleOnPersonPress?: (props: any) => void;
    handleOnMoviePress?: (props: any) => void;
    navigation: any;
}

export default class SearchResultTemplate extends React.Component<Props, any> {
    render() {
        let template;
        switch (this.props.media_type) {
            case 'tv':
                template = (
                    <SearchTvResult
                        {...this.props}
                        media_type='tv'
                        handleOnPress={this.props.handleOnTvPress}
                        navigation={this.props.navigation}
                    />
                );
                break;
            case 'person':
                template = (
                    <SearchPersonResult
                        {...this.props}
                        media_type='person'
                        handleOnPress={this.props.handleOnPersonPress}
                        navigation={this.props.navigation}
                    />
                );
                break;
            default:
            case 'movie':
                template = (
                    <SearchMovieResult
                        {...this.props}
                        media_type='movie'
                        handleOnPress={this.props.handleOnMoviePress}
                        navigation={this.props.navigation}
                    />
                );
                break;
        }
        return template;
    }
}
