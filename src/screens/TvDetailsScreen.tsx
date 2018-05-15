import React from 'react';
import { TvDetailScreen, CastAndCrewScreen } from '../redux/TmdbReducer';
import FilmographyScreen from './FilmographyScreen';
import { TabNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

const TvDetailsTabNav = TabNavigator({
    DetailsScreen: {
      screen: TvDetailScreen,
      navigationOptions: {
        title: 'TV details',
        tabBarIcon: <MaterialIcons name="info-outline" size={32} color='#fff'/>,
      }
    },
    CastAndCrew: {
      screen: CastAndCrewScreen,
      navigationOptions: {
        title: 'Cast & Crew',
        tabBarIcon: <MaterialIcons name="people-outline" size={32} color='#fff'/>,
      }
    },
    Seasons: {
      screen: CastAndCrewScreen,
      navigationOptions: {
        title: 'Seasons',
        tabBarIcon: <MaterialIcons name="format-list-numbered" size={32} color='#fff'/>,
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
  backBehavior: 'none',
  navigationOptions: ({navigation}) => ({
    tabBarVisible: (navigation.state.params && navigation.state.params.hideTabBar) !== true,
    animationEnabled: true
  }),
});

export default TvDetailsTabNav;
