import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

export default class PasswordResetScreen extends React.Component<any> {
    static navigationOptions = {
        title: 'Reset password',
        drawerIcon: () => (
            <Image
                source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=5`}}
                style={{width: 30, height: 30, borderRadius: 15}}
            />
        ),
    };

    render() {
        return (
            <View style={styles.container}>
                <Text onPress={this.props.navigation.back()} style={styles.textButton}>Reset password</Text>
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
