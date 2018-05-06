import React from 'react';
import { Share, Text, ScrollView, TouchableNativeFeedback, View } from 'react-native';
import {textStyle, viewStyle, searchResultStyle} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';

export default class MovieDetailScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Movie Details',
    };

    render() {
        const {navigation} = this.props;
        return (
            <ScrollView style={{backgroundColor: '#fff'}}>
                <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={{backgroundColor: '#fff'}}>
                        <Text style={searchResultStyle.title}>{navigation.getParam('title')}</Text>
                        <Text style={searchResultStyle.overview}>{navigation.getParam('overview')}</Text>
                        <TouchTextButton
                            onPress={() => Share.share({
                                title: navigation.getParam('title'),
                                message: `${navigation.getParam('overview')} https://www.moviesom.com/moviesom.php?tmdbMovieId=${navigation.getParam('id')}`,
                                url: `https://www.moviesom.com/moviesom.php?tmdbMovieId=${navigation.getParam('id')}`
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
