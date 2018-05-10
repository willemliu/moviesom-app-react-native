import React from 'react';
import { AsyncStorage, Share } from "react-native";

export const watchedHandler = async (props: any) => {
    const loggedIn = await AsyncStorage.getItem('loggedIn');
    if (loggedIn) {
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
        Share.share({
            title: props.title ? props.title : props.name,
            message: `${props.overview} https://www.moviesom.com/moviesom.php?${service}=${props.id}`,
            url: `https://www.moviesom.com/moviesom.php?${service}=${props.id}`
        }, {
            dialogTitle: 'MovieSom share'
        });
    } else {
        props.navigation.navigate('Login');
    }
};

export const homepageHandler = (props: any) => {
    props.navigation.navigate('Web', {url: props.homepage});
};

export const withOnPressHandler = (Component: any) => (props: any, state: any) => {
    return (
        <Component {...props} handleOnPress={() => props.handleOnPress(props)}/>
    );
};
