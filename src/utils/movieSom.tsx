import React from 'react';
import { AsyncStorage, Share } from "react-native";

export const watchedHandler = async (props: any) => {
    const loggedIn = await AsyncStorage.getItem('loggedIn');
    if (loggedIn) {
        console.log({
            id: props.id,
            media_type: props.media_type,
            watched: props.watched ? props.watched + 1 : 1
        });
        props.actions.addItem({
            id: props.id,
            media_type: props.media_type,
            watched: props.watched ? props.watched + 1 : 1
        });
    } else {
        props.navigation.navigate('Login');
    }
};

export const unWatchedHandler = async (props: any) => {
    const loggedIn = await AsyncStorage.getItem('loggedIn');
    if (loggedIn) {
        props.actions.addItem({
            id: props.id,
            media_type: props.media_type,
            watched: props.watched ? props.watched - 1 : null
        });
    } else {
        props.navigation.navigate('Login');
    }
};

export const wantToWatchHandler = async (props: any) => {
    const loggedIn = await AsyncStorage.getItem('loggedIn');
    if (loggedIn) {
        alert(`want to watch ${props.id}`);
    } else {
        props.navigation.navigate('Login');
    }
};

export const shareHandler = async (props: any) => {
    const loggedIn = await AsyncStorage.getItem('loggedIn');
    if (loggedIn) {
        let service = 'tmdbMovieId';
        switch (props.media_type) {
            case 'tv':
                service = 'tmdbTvId';
                break;
            case 'episode':
                service = 'tmdbTvEpisodeId';
                break;
            case 'person':
                service = 'tmdbPersonId';
                break;
        }
        const title = props.title ? props.title : props.name;
        const message = `${props.overview ? props.overview : props.biography ? props.biography : title} `;
        Share.share({
            title,
            message: `${message}https://www.moviesom.com/moviesom.php?${service}=${props.id}`,
            url: `https://www.moviesom.com/moviesom.php?${service}=${props.id}`
        }, {
            dialogTitle: 'MovieSom share'
        });
    } else {
        props.navigation.navigate('Login');
    }
};

export const imdbHandler = (props: any) => {
    props.navigation.navigate('Web', {url: `https://www.imdb.com/title/${props.imdb_id}/`});
};

export const homepageHandler = (props: any) => {
    props.navigation.navigate('Web', {url: props.homepage});
};

export const formatDuration = (minutes: number) => {
    const hours = minutes / 60;
    const mins = minutes % 60;
    return `${hours.toFixed(0)}h ${mins.toFixed(0)}m`;
};

export const withMovieSomFunctions = (Component: any) => (
    class extends React.Component <any, any> {
        static navigationOptions = Component.navigationOptions;

        render() {
            return (
                <Component
                    {...this.props}
                    handleOnPress={() => this.props.handleOnPress(this.props)}
                    watchedHandler={() => watchedHandler(this.props)}
                    unWatchedHandler={() => unWatchedHandler(this.props)}
                    wantToWatchHandler={() => wantToWatchHandler(this.props)}
                    shareHandler={() => shareHandler(this.props)}
                    imdbHandler={() => imdbHandler(this.props)}
                    homepageHandler={() => homepageHandler(this.props)}
                    formatDuration={formatDuration}
                />
            );
        }
    }
);
