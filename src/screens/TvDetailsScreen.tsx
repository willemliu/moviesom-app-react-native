import { TvDetailScreen, CastAndCrewScreen } from '../redux/TmdbReducer';
import FilmographyScreen from './FilmographyScreen';
import { TabNavigator } from 'react-navigation';

const TvDetailsTabNav = TabNavigator({
    DetailsScreen: {
      screen: TvDetailScreen,
    },
    CastAndCrew: {
      screen: CastAndCrewScreen,
    },
    Seasons: {
      screen: CastAndCrewScreen,
      navigationOptions: {
        title: 'Seasons',
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
