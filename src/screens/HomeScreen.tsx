import React from 'react';
import { TabNavigator } from 'react-navigation';
import SearchScreen from './SearchScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { withData } from '../contexts/DataContext';

const HomeTabNav = TabNavigator({
    Search: {
        screen: withData(SearchScreen),
        navigationOptions: {
            title: 'Search',
            tabBarIcon: <MaterialIcons name="search" size={32} color='#fff'/>
        }
    },
    Personal: {
        screen: SearchScreen,
        navigationOptions: {
            title: 'Personal',
            tabBarIcon: <MaterialIcons name="person" size={32} color='#fff'/>
        }
    },
    Watchlist: {
        screen: SearchScreen,
        navigationOptions: {
            title: 'Watchlist',
            tabBarIcon: <MaterialIcons name="playlist-add" size={32} color='#fff'/>
        }
    },
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        style: {
            backgroundColor: '#008CBA',
        },
        activeTintColor: '#fff',
        activeBackgroundColor: '#008CBA',
        inactiveBackgroundColor: '#008CBA',
        indicatorStyle: {
            backgroundColor: '#fff'
        },
    },
});

export default HomeTabNav;
