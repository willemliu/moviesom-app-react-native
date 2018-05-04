import DetailsScreen from './DetailsScreen';
import FilmographyScreen from './FilmographyScreen';
import { TabNavigator } from 'react-navigation';

const DetailsTabNav = TabNavigator({
    DetailsScreen: {
      screen: DetailsScreen
    },
    FilmographyScreen: {
      screen: FilmographyScreen,
      navigationOptions: {
        title: 'Filmography',
      }
    },
    FilmographyScreen2: {
      screen: FilmographyScreen,
      navigationOptions: {
        title: 'Filmography2',
      }
    },
    FilmographyScreen3: {
      screen: FilmographyScreen,
      navigationOptions: {
        title: 'Filmography3',
      }
    }
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
