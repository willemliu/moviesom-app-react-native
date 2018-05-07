import { PersonDetailScreen } from '../redux/TmdbReducer';
import FilmographyScreen from './FilmographyScreen';
import { TabNavigator } from 'react-navigation';

const MovieDetailsTabNav = TabNavigator({
    DetailsScreen: {
      screen: PersonDetailScreen
    },
    FilmographyScreen: {
      screen: FilmographyScreen,
      navigationOptions: {
        title: 'Filmography',
      }
    },
    Pictures: {
      screen: FilmographyScreen,
      navigationOptions: {
        title: 'Pictures',
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

export default MovieDetailsTabNav;
