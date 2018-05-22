import * as LoginActions from './LoginActions';
import { bindActionCreators } from 'redux';
import { LOGIN, LOGOUT } from './LoginActions';
import { AsyncStorage } from 'react-native';

const defaultState = {
    searchItems: new Array()
};

export function loginReducer(state: any = defaultState, action: any) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case LOGIN:
            newState.loggedIn = true;
            AsyncStorage.setItem('loggedIn', '1');
            AsyncStorage.setItem('loginToken', action.loginToken);
            return newState;
        case LOGOUT:
            newState.loggedIn = false;
            AsyncStorage.removeItem('loggedIn');
            AsyncStorage.removeItem('loginToken');
            return newState;
        default:
            return newState;
    }
}

export function mapLoginStateToProps(state: any, ownProps: any) {
    return {
        loggedIn: state.login.loggedIn
    };
}

export function mapLoginDispatchToProps(dispatch: any, ownProps: any) {
    return {
        loginActions: bindActionCreators(LoginActions as any, dispatch)
    };
}
