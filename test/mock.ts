console.log('Mock drawer layout android');
jest.mock('DrawerLayoutAndroid', () => {
    const RealComponent = require.requireActual('DrawerLayoutAndroid');
    const React = require('react');
    class DrawerLayoutAndroid extends React.Component {
        render() {
        return React.createElement('DrawerLayoutAndroid', this.props, this.props.children);
        }
    }
    (DrawerLayoutAndroid as any).propTypes = RealComponent.propTypes;
    (DrawerLayoutAndroid as any).positions = { Left: 3, Right: 5 };
    return DrawerLayoutAndroid;
});
