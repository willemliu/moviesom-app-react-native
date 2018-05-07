import FilmographyScreen from './FilmographyScreen';
import { TabNavigator } from 'react-navigation';
import { MovieDetailScreen } from '../redux/TmdbReducer';

const DetailsTabNav = TabNavigator({
    DetailsScreen: {
      screen: MovieDetailScreen
    },
    Crew: {
      screen: FilmographyScreen,
      navigationOptions: {
        title: 'Cast & Crew',
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
