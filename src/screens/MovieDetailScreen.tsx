import React from 'react';
import { Share, Text, ScrollView, TouchableNativeFeedback, View } from 'react-native';
import {textStyle, viewStyle, searchResultStyle} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';

export interface Props {
    ownMovie: {
        id: string,
        title: string,
        overview: string,
    };
}

export default class MovieDetailScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Movie Details',
    };

    updateMovieTest = () => {
        this.props.actions.addMovie({
            id: this.props.ownMovie.id,
            title: `${this.props.ownMovie.title}` + 1
        });
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: '#fff'}}>
                <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={{backgroundColor: '#fff'}}>
                        <Text style={searchResultStyle.title}>{this.props.ownMovie.title}</Text>
                        <Text style={searchResultStyle.overview}>{this.props.ownMovie.overview}</Text>
                        <TouchTextButton onPress={this.updateMovieTest}>Show data</TouchTextButton>
                        <TouchTextButton
                            onPress={() => Share.share({
                                title: this.props.ownMovie.title,
                                message: `${this.props.ownMovie.overview} https://www.moviesom.com/moviesom.php?tmdbMovieId=${this.props.ownMovie.id}`,
                                url: `https://www.moviesom.com/moviesom.php?tmdbMovieId=${this.props.ownMovie.id}`
                            }, {
                                dialogTitle: 'MovieSom share'
                            })}
                        >Share</TouchTextButton>
                    </View>
                </TouchableNativeFeedback>
            </ScrollView>
        );
    }
}
