import React from 'react';
import { StyleSheet, Image, Text, View, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class LoginScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Login',
        drawerIcon: () => (
            <Image
                source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=3`}}
                style={{width: 30, height: 30, borderRadius: 15}}
            />
        ),
    };

    login = async () => {
        await AsyncStorage.setItem('loggedIn', '1');

        console.log('login', await AsyncStorage.getItem('loggedIn'));
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
        });
        this.props.navigation.dispatch(resetAction);

    }

    render() {
        return (
            <View style={styles.container}>
                <Text onPress={this.login} style={styles.textButton}>Login</Text>
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
