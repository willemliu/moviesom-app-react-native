console.log('Mock drawer layout android');
jest.mock('react-native', () => {
    const reactNative = require.requireActual('react-native');
    reactNative.UIManager.AndroidDrawerLayout = {
      Constants: {
        DrawerPosition: {
          Left: 3,
          Right: 5
        }
      }
    };
    return reactNative;
});