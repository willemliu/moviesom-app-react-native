import { PersonDetailScreen, FilmographyScreen, PicturesScreen } from '../redux/TmdbReducer';
import { TabNavigator } from 'react-navigation';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const PersonDetailsTabNav = TabNavigator({
    DetailsScreen: {
      screen: PersonDetailScreen,
      navigationOptions: {
        title: 'Person Details',
        tabBarIcon: <MaterialIcons name="info-outline" size={32} color='#fff'/>,
      }
    },
    FilmographyScreen: {
      screen: FilmographyScreen,
      navigationOptions: {
        title: 'Filmography',
        tabBarIcon: <Entypo name="folder-video" size={32} color='#fff'/>,
      }
    },
    Pictures: {
      screen: PicturesScreen,
      navigationOptions: {
        title: 'Images',
        tabBarIcon: <Entypo name="folder-images" size={32} color='#fff'/>,
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

export default PersonDetailsTabNav;
