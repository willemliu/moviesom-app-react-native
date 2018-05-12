export const DEVICE_ONLINE = 'DEVICE_ONLINE';
export const DEVICE_OFFLINE = 'DEVICE_OFFLINE';

export function online() {
    return { type: DEVICE_ONLINE };
}

export function offline() {
    return { type: DEVICE_OFFLINE };
}
