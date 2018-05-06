import React from 'react';
import { Share, Text, ScrollView, TouchableNativeFeedback, View } from 'react-native';
import {textStyle, viewStyle, searchResultStyle} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';

export default class DetailsScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Person Details',
    };

    render() {
        const {navigation} = this.props;
        return (
            <ScrollView style={{backgroundColor: '#fff'}}>
                <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={{backgroundColor: '#fff'}}>
                        <Text style={searchResultStyle.title}>{navigation.getParam('name')}</Text>
                        <TouchTextButton
                            onPress={() => Share.share({
                                title: navigation.getParam('name'),
                                message: `${navigation.getParam('overview')} https://www.moviesom.com/moviesom.php?tmdbPersonId=${navigation.getParam('id')}`,
                                url: `https://www.moviesom.com/moviesom.php?tmdbPersonId=${navigation.getParam('id')}`
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
