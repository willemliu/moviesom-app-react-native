import * as LoginActions from './LoginActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LOGIN, LOGOUT } from './LoginActions';
import LoginScreen from '../../screens/LoginScreen';
import DrawerContainer from '../../components/DrawerContainer';
import { AsyncStorage } from 'react-native';
import SignUpScreen from '../../screens/SignUpScreen';

const defaultState = {
    searchItems: new Array()
};

export function loginReducer(state: any = defaultState, action: any) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case LOGIN:
            newState.loggedIn = true;
            AsyncStorage.setItem('loggedIn', '1');
            return newState;
        case LOGOUT:
            newState.loggedIn = false;
            AsyncStorage.removeItem('loggedIn');
            return newState;
        default:
            return newState;
    }
}

function mapLoginStateToProps(state: any, ownProps: any) {
    return {
        loggedIn: state.login.loggedIn
    };
}

function mapLoginDispatchToProps(dispatch: any, ownProps: any) {
    return {
        actions: bindActionCreators(LoginActions as any, dispatch)
    };
}

const loginScreen = connect(mapLoginStateToProps, mapLoginDispatchToProps)(LoginScreen);
export {loginScreen as LoginScreen};

const signUpScreen = connect(mapLoginStateToProps, mapLoginDispatchToProps)(SignUpScreen);
export {signUpScreen as SignUpScreen};

const drawerContainer = connect(mapLoginStateToProps, mapLoginDispatchToProps)(DrawerContainer);
export {drawerContainer as DrawerContainer};
