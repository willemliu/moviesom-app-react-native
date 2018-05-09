import React from 'react';
import { Text, ScrollView, TouchableNativeFeedback, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {textStyle, viewStyle, backgroundColor} from "../styles/Styles";

export default class FilmographyScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Filmography',
    };

    filmography = (params: any) => {
        const navigate = NavigationActions.navigate({
            routeName: 'MovieDetails',
            params,
            // action: NavigationActions.navigate({ routeName: 'FilmographyScreen', params })
        });
        this.props.navigation.dispatch(navigate);
    }

    render() {
        return (
            <ScrollView style={{backgroundColor}}>
                <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={{backgroundColor, margin: 10}}>
                        <Text>Filmography</Text>
                    </View>
                </TouchableNativeFeedback>
            </ScrollView>
        );
    }
}
