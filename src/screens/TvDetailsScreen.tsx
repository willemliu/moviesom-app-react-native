import { TvDetailScreen } from '../redux/TmdbReducer';
import FilmographyScreen from './FilmographyScreen';
import { TabNavigator } from 'react-navigation';

const DetailsTabNav = TabNavigator({
    DetailsScreen: {
      screen: TvDetailScreen
    },
    Crew: {
      screen: FilmographyScreen,
      navigationOptions: {
        title: 'Cast & Crew',
      }
    },
    Seasons: {
      screen: FilmographyScreen,
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
});

export default DetailsTabNav;
