import { TabNavigator } from 'react-navigation';
import { CastAndCrewScreen, MovieDetailScreen } from '../redux/TmdbReducer';

const DetailsTabNav = TabNavigator({
    DetailsScreen: {
      screen: MovieDetailScreen,
    },
    CastAndCrew: {
      screen: CastAndCrewScreen,
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
