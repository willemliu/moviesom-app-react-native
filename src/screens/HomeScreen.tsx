import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

export default class HomeScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Home',
        drawerIcon: () => (
            <Image
            source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=1`}}
            style={{width: 30, height: 30, borderRadius: 15}}
            />
        ),
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.ts to start working on your app!</Text>
                <Text>Changes you make will automatically reload.</Text>
                <Text>Shake your phone to open the developer menu.</Text>
                <Text onPress={() => this.props.navigation.navigate('About', {name: 'Willem Liu'})} style={styles.textButton}>About</Text>
                <Text onPress={() => this.props.navigation.navigate('Details', {depth: 0, name: 'Willem Liu'})} style={styles.textButton}>Details</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#008CBA',
        padding: 15,
        margin: 5,
        borderRadius: 2,
        borderColor: '#008CBA',
        borderWidth: 1,
        textAlign: 'center'
    }
});
