import { AsyncStorage } from 'react-native';
import {apiKey, baseUri, imagesUri} from './credentials';

const fetchGetConfig: RequestInit = {
    credentials: 'include',
    method: 'get',
};

export async function get(route: string, uriParam: string = '') {
    // Make sure route starts with /
    if (route.indexOf('/') !== 0) {
        route = `/${route}`;
    }
    console.log('Get TMDb', route, `${baseUri}${route}?api_key=${apiKey}&${uriParam}`);
    return await fetch(`${baseUri}${route}?api_key=${apiKey}&${uriParam}`, fetchGetConfig);
}

export async function getConfig() {
    // console.log('Get TMDb configuration');
    const configDate = await AsyncStorage.getItem('tmdbConfigDate');
    // Only fetch new config when no previous config or is older than 24hrs.
    if (!configDate || (configDate && (new Date().getTime() - parseInt(configDate, 10)) > 86400000)) {
        const configuration = await get(`/configuration`)
        .then((data: any) => data.json());
        AsyncStorage.setItem('tmdbConfig', JSON.stringify(configuration));
        AsyncStorage.setItem('tmdbConfigDate', `${new Date().getTime()}`);
        // console.log('Configuration loaded from TMDb', configuration);
        return configuration;
    } else {
        const configuration = JSON.parse(await AsyncStorage.getItem('tmdbConfig'));
        // console.log('Configuration loaded from cache', configuration);
        return configuration;
    }
}

async function clearLocalConfiguration() {
    await AsyncStorage.removeItem('tmdbConfigDate');
    await AsyncStorage.removeItem('tmdbConfig');
}

export async function getPosterUrl(posterPath: string|null|undefined) {
    // console.log('Get poster url', posterPath);
    if (!posterPath) { return null; }
    const configuration = await getConfig();
    return `${configuration.images.secure_base_url}${configuration.images.poster_sizes[0]}${posterPath}`;
}

export async function getProfileUrl(profilePath: string|null|undefined, quality: number = 0) {
    // console.log('Get poster url', posterPath);
    if (!profilePath) { return null; }
    const configuration = await getConfig();
    return `${configuration.images.secure_base_url}${configuration.images.poster_sizes[quality]}${profilePath}`;
}

export async function getBackdropUrl(backdropPath: string|null|undefined) {
    console.log('Get backdrop url', backdropPath);
    if (!backdropPath) { return null; }
    const configuration = await getConfig();
    return `${configuration.images.secure_base_url}${configuration.images.backdrop_sizes[1]}${backdropPath}`;
}
