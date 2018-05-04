import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import DrawerContainer from '../components/DrawerContainer';
import { AsyncStorage } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
            <TouchableOpacity style={{padding: 10}} onPress={async () => {
                navigation.navigate('DrawerToggle', {
                    loggedIn: await AsyncStorage.getItem('loggedIn')
                });
                console.log('drawer loggedIn', await AsyncStorage.getItem('loggedIn') === '1');
            }}><MaterialIcons name="menu" size={32} color='#fff'/></TouchableOpacity>
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
