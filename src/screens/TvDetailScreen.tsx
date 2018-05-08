import React from 'react';
import { Share, Text, ScrollView, TouchableNativeFeedback, View } from 'react-native';
import {textStyle, viewStyle, detailStyle} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';

export default class TvDetailScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'TV Details',
    };

    render() {
        const {navigation} = this.props;
        return (
            <ScrollView style={{backgroundColor: '#fff'}}>
                <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={{backgroundColor: '#fff'}}>
                        <Text style={detailStyle.title}>{navigation.getParam('name')}</Text>
                        <Text style={detailStyle.overview}>{navigation.getParam('overview')}</Text>
                        <TouchTextButton
                            onPress={() => Share.share({
                                title: navigation.getParam('name'),
                                message: `${navigation.getParam('overview')} https://www.moviesom.com/moviesom.php?tmdbTvId=${navigation.getParam('id')}`,
                                url: `https://www.moviesom.com/moviesom.php?tmdbTvId=${navigation.getParam('id')}`
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
