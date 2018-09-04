import React from 'react';
import {View, AsyncStorage, TextInput} from 'react-native';
import {viewStyle, searchScreenStyle, transparentColor} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';
import { MovieSomServices } from '../moviesom/MovieSom';

export interface Props {
    loggedIn: boolean;
    loginToken: string;
    post: (service: MovieSomServices, urlParams: string, payload: string) => Promise<any>;
}

export default class MovieBuddiesScreen extends React.PureComponent<Props, any> {
    static navigationOptions = {
        title: 'Movie Buddies',
    };

    props: any;
    state: any = {
        alias: null
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.getMovieBuddies();
    }

    getMovieBuddies = async () => {
        const response = await this.props.post('getUserConnections', '', JSON.stringify({
            token: this.props.loginToken
        })).then((res: any) => res.json());
        console.log(response);
    }

    save = async () => {
        const response = await this.props.post('setUserConnection', '', JSON.stringify({
            id: '',
            consent: 0,
            token: this.props.loginToken
        }));
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={viewStyle.drawer}>
                <TouchTextButton style={{marginBottom: 10}} onPress={this.save}>Save</TouchTextButton>
            </View>
        );
    }
}
