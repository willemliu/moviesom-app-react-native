import React from 'react';
import {Text} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import DrawerContainer from '../components/DrawerContainer';
import { AsyncStorage } from 'react-native';

const DrawerNav = DrawerNavigator({
    Home: {
      screen: HomeScreen,
    },
}, {
contentComponent: DrawerContainer,
    navigationOptions: ({navigation}) => ({
        headerStyle: {
        backgroundColor: '#008CBA',
        },
        headerLeft: (
            <Text onPress={async () => {
                navigation.navigate('DrawerToggle', {
                    loggedIn: await AsyncStorage.getItem('loggedIn')
                });
                console.log('drawer loggedIn', await AsyncStorage.getItem('loggedIn') === '1');
            }}>Menu</Text>
        ),
        headerRight: (
            <Text onPress={async () => {
                navigation.navigate('DrawerToggle', {
                    loggedIn: await AsyncStorage.getItem('loggedIn')
                });
                console.log('drawer loggedIn', await AsyncStorage.getItem('loggedIn') === '1');
            }} style={{
                display: 'none',
            }}>Menu</Text>
        )
    })
});

export default DrawerNav;
