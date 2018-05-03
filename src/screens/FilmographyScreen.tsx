import React from 'react';
import { Text, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {textStyle, viewStyle} from "../styles/Styles";

export default class FilmographyScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Filmography',
    };

    filmography = (params: any) => {
        const navigate = NavigationActions.navigate({
            routeName: 'Details',
            params,
            // action: NavigationActions.navigate({ routeName: 'FilmographyScreen', params })
        });
        this.props.navigation.dispatch(navigate);
    }

    render() {
        return (
            <ScrollView style={viewStyle.scrollView}>
                <Text>Filmography</Text>
                <Text>Depth {this.props.navigation.getParam('depth')}.</Text>
                <Text>Filmography {this.props.navigation.getParam('name')}.</Text>
                <Text onPress={() => this.filmography({
                    depth: this.props.navigation.getParam('depth') + 1,
                    name: this.props.navigation.getParam('name')
                    })
                } style={textStyle.button}>Filmography {this.props.navigation.getParam('depth') + 1}</Text>

            </ScrollView>
        );
    }
}
