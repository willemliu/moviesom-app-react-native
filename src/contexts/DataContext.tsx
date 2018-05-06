import React from 'react';

export const dataStore = {
    movies: new Array(),
    tvs: new Array(),
    persons: new Array(),
    listeners: new Array<(data: any) => void>(),
    addMovies,
    addListener,
    updateListeners
};

function addListener(func: (data: any) => void) {
    console.log('addListener');
    dataStore.listeners.push(func);
}

function addMovies(movies: any[]) {
    console.log('addMovies', movies.length);
    for (const movie of movies) {
        const result = dataStore.movies.find((value: any, index: number) => {
            return movie.id === value.id;
        });
        if (result) {
            Object.assign(result, movie);
            if (result !== movie) {
                dataStore.updateListeners(movie);
            }
        } else {
            dataStore.movies.push(movie);
            dataStore.updateListeners(movie);
        }
    }
}

function updateListeners(data: any) {
    for (const listener of dataStore.listeners) {
        listener.apply(null, [data]);
    }
}

export const DataContext = React.createContext(dataStore);

export const withData = (Component: any) => class extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <DataContext.Consumer>{(data) => {
                return (<Component
                    {...this.props}
                    movies={data.movies}
                    tvs={data.tvs}
                    persons={data.persons}
                    addListener={data.addListener}
                    addMovies={data.addMovies}
                    updateListeners={data.updateListeners}
                />);
            }}</DataContext.Consumer>
        );
    }
};
