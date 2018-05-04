import React from 'react';
import { TabNavigator } from 'react-navigation';
import SearchScreen from './SearchScreen';

const HomeTabNav = TabNavigator({
    Search: {
        screen: SearchScreen,
        navigationOptions: {
            title: 'Search',
        }
    },
    Personal: {
        screen: SearchScreen,
        navigationOptions: {
            title: 'Personal',
        }
    },
    Watchlist: {
        screen: SearchScreen,
        navigationOptions: {
            title: 'Watchlist',
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
