import React from 'react';
import { Share, Text, ScrollView } from 'react-native';
import {textStyle, viewStyle} from "../styles/Styles";

export default class DetailsScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Details',
    };

    render() {
        return (
            <ScrollView contentContainerStyle={viewStyle.scrollView}>
                <Text>Details</Text>
                <Text>Depth {this.props.navigation.getParam('depth')}.</Text>
                <Text>Details {this.props.navigation.getParam('name')}.</Text>

                <Text onPress={() => this.props.navigation.navigate('Details', {
                    depth: this.props.navigation.getParam('depth') + 1,
                    name: this.props.navigation.getParam('name')
                })} style={textStyle.button}>Details {this.props.navigation.getParam('depth') + 1}</Text>

                <Text onPress={() => Share.share({
                    title: 'Share this',
                    message: `Awesome message to share
https://www.moviesom.com/moviesom.php?tmdbMovieId=500`,
                    url: 'https://www.moviesom.com/?tmdbMovieId=500'
                }, {
                    dialogTitle: 'MovieSom share'
                })} style={textStyle.button}>Share</Text>

                <Text>1Open up App.ts to start working on your app!</Text>
                <Text>2Changes you make will automatically reload.</Text>
                <Text>3Shake your phone to open the developer menu.</Text>
                <Text>4Open up App.ts to start working on your app!</Text>
                <Text>5Changes you make will automatically reload.</Text>
                <Text>6Shake your phone to open the developer menu.</Text>
                <Text>7Open up App.ts to start working on your app!</Text>
                <Text>8Changes you make will automatically reload.</Text>
                <Text>9Shake your phone to open the developer menu.</Text>
                <Text>10Open up App.ts to start working on your app!</Text>
                <Text>11Changes you make will automatically reload.</Text>
                <Text>12Shake your phone to open the developer menu.</Text>
                <Text>13Open up App.ts to start working on your app!</Text>
                <Text>14Changes you make will automatically reload.</Text>
                <Text>15Shake your phone to open the developer menu.</Text>
                <Text>16Open up App.ts to start working on your app!</Text>
                <Text>17Changes you make will automatically reload.</Text>
                <Text>18Shake your phone to open the developer menu.</Text>
                <Text>19Open up App.ts to start working on your app!</Text>
                <Text>20Changes you make will automatically reload.</Text>
                <Text>21Shake your phone to open the developer menu.</Text>
                <Text>22Open up App.ts to start working on your app!</Text>
                <Text>23Changes you make will automatically reload.</Text>
                <Text>24Shake your phone to open the developer menu.</Text>
                <Text>25Open up App.ts to start working on your app!</Text>
                <Text>26Changes you make will automatically reload.</Text>
                <Text>27Shake your phone to open the developer menu.</Text>
                <Text>28Open up App.ts to start working on your app!</Text>
                <Text>29Changes you make will automatically reload.</Text>
                <Text>30Shake your phone to open the developer menu.</Text>
            </ScrollView>
        );
    }
}
