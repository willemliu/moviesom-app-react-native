import * as LoginActions from './LoginActions';
import { bindActionCreators } from 'redux';
import { LOGIN, LOGOUT } from './LoginActions';
import { AsyncStorage } from 'react-native';

const defaultState = {
    searchItems: new Array()
};

export function loginReducer(state: any = defaultState, action: any) {
    const newState = {...state};
    switch (action.type) {
        case LOGIN:
            newState.loggedIn = true;
            newState.loginToken = action.loginToken;
            return newState;
        case LOGOUT:
            newState.loggedIn = false;
            newState.loginToken = null;
            AsyncStorage.removeItem('loggedIn');
            AsyncStorage.removeItem('loginToken');
            return newState;
        default:
            return newState;
    }
}

export function mapLoginStateToProps(state: any, ownProps: any) {
    return {
        loggedIn: state.login.loggedIn,
        loginToken: state.login.loginToken
    };
}

export function mapLoginDispatchToProps(dispatch: any, ownProps: any) {
    return {
        loginActions: bindActionCreators(LoginActions as any, dispatch)
    };
}
