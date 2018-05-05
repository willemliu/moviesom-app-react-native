import React from 'react';
import { Share, Text, ScrollView } from 'react-native';
import {textStyle, viewStyle, searchResultStyle} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';

export default class DetailsScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Details',
    };

    render() {
        const {navigation} = this.props;
        return (
            <ScrollView contentContainerStyle={viewStyle.scrollView}>
                <Text style={searchResultStyle.title}>{navigation.getParam('title')}</Text>
                <Text style={searchResultStyle.overview}>{navigation.getParam('overview')}</Text>
                <TouchTextButton
                    style={textStyle.button}
                    onPress={() => Share.share({
                        title: navigation.getParam('title'),
                        message: `${navigation.getParam('overview')} https://www.moviesom.com/moviesom.php?tmdbMovieId=${navigation.getParam('id')}`,
                        url: `https://www.moviesom.com/?tmdbMovieId=${navigation.getParam('id')}`
                    }, {
                        dialogTitle: 'MovieSom share'
                    })}
                >Share</TouchTextButton>
            </ScrollView>
        );
    }
}
