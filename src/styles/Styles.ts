import { StyleSheet, Platform } from 'react-native';

export const movieSomColor = '#008CBA';

export const viewStyle = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    drawer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingHorizontal: 15,
    },
    scrollView: {
        backgroundColor: '#fff',
    },
});

export const headerStyle = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: movieSomColor,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        flex: 1,
    },
});

export const textStyle = StyleSheet.create({
    button: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: movieSomColor,
        color: '#fff',
        paddingTop: 10,
        paddingRight: 15,
        paddingBottom: 10,
        paddingLeft: 15,
        margin: 5,
        borderRadius: 3,
        borderColor: movieSomColor,
        borderWidth: 1,
        textAlign: 'center',
    },
    smallLink: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 12,
        color: movieSomColor,
    }
});

export const textInputStyle = StyleSheet.create({
    textInput: {
        height: 50,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
        marginBottom: 5,
        fontSize: 18,
        width: '100%',
    },
    passwordsDontMatch: {
        height: 50,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
        marginBottom: 5,
        fontSize: 18,
    }
});

export const webViewStyle = StyleSheet.create({
    webView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: (Platform.OS) === 'ios' ? 20 : 0,
    },
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export const searchScreenStyle = StyleSheet.create({
    flatList: {
        flex: 1,
        width: '100%',
        backgroundColor: '#323232',
    }
});

export const searchResultStyle = StyleSheet.create({
    view: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 3,
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
    },
    image: {
        width: 75,
        marginRight: 10,
    },
});
