import * as DeviceActions from './DeviceActions';
import { bindActionCreators } from 'redux';
import { DEVICE_ONLINE, DEVICE_OFFLINE } from './DeviceActions';

const defaultState = {
    searchItems: new Array()
};

export function deviceReducer(state: any = defaultState, action: any) {
    const newState = {...state};
    switch (action.type) {
        case DEVICE_ONLINE:
            newState.online = true;
            return newState;
        case DEVICE_OFFLINE:
            newState.online = false;
            return newState;
        default:
            return newState;
    }
}

export function mapDeviceStateToProps(state: any, ownProps: any) {
    return {
        online: state.device.online
    };
}

export function mapDeviceDispatchToProps(dispatch: any, ownProps: any) {
    return {
        deviceActions: bindActionCreators(DeviceActions as any, dispatch)
    };
}
