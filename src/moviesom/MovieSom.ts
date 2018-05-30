import {AsyncStorage, Platform} from 'react-native';
import { MovieProps, MovieNewsResponseType } from '../interfaces/Movie';

interface LoginResponseType {
    login: {
        status: number,
        message?: string,
        loginToken?: string,
        execTime: number
    };
    execTime: number;
}
interface NewsResponseType {
    getNews: {
        status: number,
        message?: [{
            id: number,
            title: string,
            type: string,
            image: string,
            url: string,
            description: string,
            url_hash: string,
            visible: number
        }],
        execTime: number,
        offset: number,
        totalNews: number,
        pages: number
    };
    execTime: number;
}

const BASE_URL = 'https://www.moviesom.com/wsmoviesom.php';
const HTML_2_XPATH_BASE_URL = 'https://html2xpath.moviesom.com';
const API_VERSION = 'v1';

/**
 * Get from MovieSom WEB API.
 * @param service
 * @param uriParam
 * @param baseUrl
 * @param apiVersion
 */
export async function post(service: string, uriParam: string = '', body: string = '{}', baseUrl: string = BASE_URL, apiVersion: string = API_VERSION) {
    console.log('Get MovieSom', `${baseUrl}?v=${apiVersion}&service=${service}&${uriParam}`);
    return await fetch(`${baseUrl}?v=${apiVersion}&service=${service}&${uriParam}`, {
        method: 'post',
        body
    });
}

/**
 * Get MovieSom configuration.
 */
export async function getConfig() {
    // console.log('Get TMDb configuration');
    const configDate = await AsyncStorage.getItem('movieSomConfigDate');
    // Only fetch new config when no previous config or is older than 24hrs.
    if (!configDate || (configDate && (new Date().getTime() - parseInt(configDate, 10)) > 86400000)) {
        const configuration = await post('getConfig').then((data) => data.json());
        AsyncStorage.setItem('movieSomConfig', JSON.stringify(configuration));
        AsyncStorage.setItem('movieSomConfigDate', `${new Date().getTime()}`);
        // console.log('Configuration loaded from MovieSom', configuration);
        return configuration;
    } else {
        const configuration = JSON.parse(await AsyncStorage.getItem('movieSomConfig'));
        // console.log('MovieSom Configuration loaded from cache', configuration);
        return configuration;
    }
}

export async function login(username: string, password: string): Promise<LoginResponseType> {
    console.info('Login with credentials');
    const appType = `${Platform.OS} ${Platform.Version}`;
    const response = post('login', '', JSON.stringify({
        username,
        password,
        user_agent: appType,
        app: 1
    }));
    const jsonResult: LoginResponseType = await response.then((data) => data.json());
    if (jsonResult.login.status === 200 && jsonResult.login.loginToken) {
        AsyncStorage.setItem('loggedIn', '1');
        AsyncStorage.setItem('loginToken', jsonResult.login.loginToken);
    }
    response.catch((e) => {
        console.error('Could not login. Please try again. Note that the password is case-sensitive.', e);
    });
    return jsonResult;
}

export async function loginWithToken(token: string): Promise<LoginResponseType> {
    console.info('Login with token');
    const appType = `${Platform.OS} ${Platform.Version}`;
    const response = post('login', '', JSON.stringify({
        token,
        user_agent: appType,
        app: 'React Native'
    }));
    const jsonResult: LoginResponseType = await response.then((data) => data.json());
    if (jsonResult.login.status === 200 && jsonResult.login.loginToken) {
        AsyncStorage.setItem('loggedIn', '1');
        AsyncStorage.setItem('loginToken', jsonResult.login.loginToken);
    }

    response.catch((e) => {
        console.error('Could not login. Login with token failed. Either the token is invalid or has expired.', e);
    });
    return jsonResult;
}

export async function getNews(offset: number = 0): Promise<NewsResponseType> {
    const response = post('getNews', '', JSON.stringify({ offset }));
    const jsonResult: NewsResponseType = await response.then((data) => data.json());
    return jsonResult;
}

export async function getMovieNews(item: MovieProps, offset: number = 0): Promise<MovieNewsResponseType> {
    const response = post('getMovieNews', '', JSON.stringify({ offset, movie_tmdb_ids: [{id: item.id}]}));
    const jsonResult: MovieNewsResponseType = await response.then((data) => data.json());
    return jsonResult;
}
