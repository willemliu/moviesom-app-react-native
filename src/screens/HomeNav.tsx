import React from 'react';
import { TabNavigatorConfig, createBottomTabNavigator, createMaterialTopTabNavigator, NavigationRouteConfigMap } from 'react-navigation';
import {SettingsScreen, SearchScreen, NewsScreen} from '../redux/TmdbReducer';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { movieSomColor, movieSomSecondaryColor } from '../styles/Styles';
import { Platform } from 'react-native';

const navigationRouteConfigMap: NavigationRouteConfigMap = {
    Search: {
        screen: SearchScreen,
        navigationOptions: {
            title: 'Search',
            tabBarIcon: <MaterialIcons name="search" size={32} color='#fff'/>,
        }
    },
    // Personal: {
    //     screen: SearchScreen,
    //     navigationOptions: {
    //         title: 'Personal',
    //         tabBarIcon: <MaterialIcons name="person-outline" size={32} color='#fff'/>,
    //     }
    // },
    // Watchlist: {
    //     screen: SearchScreen,
    //     navigationOptions: {
    //         title: 'Watchlist',
    //         tabBarIcon: <MaterialIcons name="playlist-add" size={32} color='#fff'/>,
    //     }
    // },
    News: {
        screen: NewsScreen,
        navigationOptions: {
            title: 'News',
            tabBarIcon: <FontAwesome name="newspaper-o" size={32} color='#fff'/>,
        }
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            title: 'Settings',
            tabBarIcon: <Ionicons name="ios-settings-outline" size={32} color='#fff'/>,
        }
    },
};

const tabNavigatorConfig: TabNavigatorConfig = {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        style: {
            backgroundColor: movieSomColor,
        },
        activeTintColor: '#fff',
        inactiveTintColor: movieSomSecondaryColor,
        activeBackgroundColor: movieSomColor,
        inactiveBackgroundColor: movieSomColor,
        indicatorStyle: {
            backgroundColor: '#fff'
        },
    },
};

let HomeTabNav;
if (Platform.OS === 'android') {
    HomeTabNav = createMaterialTopTabNavigator(navigationRouteConfigMap, tabNavigatorConfig);
} else {
    HomeTabNav = createBottomTabNavigator(navigationRouteConfigMap, tabNavigatorConfig);
}

export default HomeTabNav;
