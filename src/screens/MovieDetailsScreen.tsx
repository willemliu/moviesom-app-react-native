import { TabNavigator } from 'react-navigation';
import { CastAndCrewScreen, MovieDetailScreen } from '../redux/TmdbReducer';
import { MaterialIcons } from '@expo/vector-icons';

const DetailsTabNav = TabNavigator({
    DetailsScreen: {
      screen: MovieDetailScreen,
      navigationOptions: {
        title: 'Movie details',
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
    })
});

export default DetailsTabNav;
