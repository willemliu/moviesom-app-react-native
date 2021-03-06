import { StyleSheet, Platform } from 'react-native';

export const movieSomColor = '#008CBA';
export const movieSomSecondaryColor = '#31C3E7';
export const movieSomTertiaryColor = '#666666';
export const watchlistColor = '#f08a24';
export const transparentColor = 'transparent';
export const backgroundColor = '#fff';

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
    formView: {
        flex: 1,
        flexDirection: 'column',
        width: '80%',
        maxWidth: 400,
        justifyContent: 'center'
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

export const headerStyle = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: movieSomColor,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        height: 20
    },
});

export const textStyle = StyleSheet.create({
    loginReason: {
        margin: 10,
        marginBottom: 20,
        fontSize: 15,
        textAlign: 'center',
        color: movieSomTertiaryColor,
    },
    smallLink: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 12,
        color: movieSomColor,
    },
});

export const textInputStyle = StyleSheet.create({
    textInput: {
        height: 40,
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
    },
    searchInput: {
        height: 40,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
        marginTop: 7,
        fontSize: 18,
        width: '100%',
    },
    searchBar: {
        flexDirection: 'row',
        borderColor: '#008CBA',
        borderWidth: 2,
        width: '100%',
    },
});

export const searchResultStyle = StyleSheet.create({
    view: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 3,
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    overview: {
        marginLeft: 5,
        marginRight: 5,
    },
    credit: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
    },
    image: {
        flex: 0,
        width: 92,
        height: 168,
        backgroundColor: '#f00',
    },
});

export const detailStyle = StyleSheet.create({
    title: {
        fontSize: 20,
    },
    metaView: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 10,
    },
    metaText: {
        fontSize: 13,
        marginRight: 10,
    },
    overview: {
        fontSize: 15,
    },
});

export const touchTextButtonStyle = StyleSheet.create({
    view: {
        backgroundColor: movieSomColor,
        paddingTop: 10,
        paddingRight: 15,
        paddingBottom: 10,
        paddingLeft: 15,
        borderRadius: 3,
        borderColor: movieSomColor,
        borderWidth: 1,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});

export const HEADER_MAX_HEIGHT = 219;
export const HEADER_MIN_HEIGHT = 0;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
export const animatedHeaderStyle = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    bar: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
        textShadowRadius: 10,
        textShadowColor: '#000',
        shadowOpacity: 1.0,
        textShadowOffset: {
            width: 1,
            height: 1,
        }
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flex: 1,
        width: '100%',
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'contain',
    },
});

export const iconsStyle = StyleSheet.create({
    icons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export const sectionListStyle = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: movieSomSecondaryColor,
        color: '#fff',
        padding: 10,
    }
});

export const filterStyle = StyleSheet.create({
    explanation: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }, 
});