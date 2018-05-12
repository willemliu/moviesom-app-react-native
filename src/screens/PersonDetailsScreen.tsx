import { PersonDetailScreen, FilmographyScreen, PicturesScreen } from '../redux/TmdbReducer';
import { TabNavigator } from 'react-navigation';

const PersonDetailsTabNav = TabNavigator({
    DetailsScreen: {
      screen: PersonDetailScreen
    },
    FilmographyScreen: {
      screen: FilmographyScreen,
    },
    Pictures: {
      screen: PicturesScreen,
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

export default PersonDetailsTabNav;
