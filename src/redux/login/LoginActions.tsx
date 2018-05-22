export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(loginToken: string) {
    return { type: LOGIN, loginToken };
}

export function logout() {
    return { type: LOGOUT };
}
