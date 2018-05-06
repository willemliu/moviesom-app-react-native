import MovieDetailScreen from './MovieDetailScreen';
import FilmographyScreen from './FilmographyScreen';
import { TabNavigator } from 'react-navigation';

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
