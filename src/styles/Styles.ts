import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

export const viewStyle = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
    },
    drawer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingHorizontal: 20
    },
    scrollView: {
        backgroundColor: '#fff',
    },
});

export const headerStyle = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#008CBA',
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
        color: '#008CBA',
        padding: 15,
        margin: 5,
        borderRadius: 2,
        borderColor: '#008CBA',
        borderWidth: 1,
        textAlign: 'center'
    },
});
