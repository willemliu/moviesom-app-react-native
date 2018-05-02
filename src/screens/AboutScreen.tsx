import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

export default class AboutScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'About',
        drawerIcon: () => (
            <Image
                source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=2`}}
                style={{width: 30, height: 30, borderRadius: 15}}
            />
        ),
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>About {this.props.navigation.getParam('name')}.</Text>
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
});
