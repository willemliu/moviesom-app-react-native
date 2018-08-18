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

export default class ProfileScreen extends React.PureComponent<Props, any> {
    static navigationOptions = {
        title: 'Profile',
    };

    props: any;
    state: any = {
        alias: null
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.getAlias();
    }

    getAlias = async () => {
        const response = await this.props.post('getUserProfile', '', JSON.stringify({
            token: this.props.loginToken
        })).then((res: any) => res.json());
        this.setState({alias: response.getUserProfile.message.alias});
    }

    save = async () => {
        const response = await this.props.post('setUserAlias', '', JSON.stringify({
            alias: this.state.alias,
            token: this.props.loginToken
        }));
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={viewStyle.drawer}>
                <TextInput
                    accessibilityLabel='Alias visible to your movie buddies'
                    style={searchScreenStyle.searchInput}
                    onChangeText={(alias: string) => { this.setState({alias}); }}
                    placeholder='Alias visible to your movie buddies'
                    autoCorrect={false}
                    clearButtonMode='always'
                    keyboardType='web-search'
                    selectTextOnFocus={true}
                    onSubmitEditing={this.save}
                    enablesReturnKeyAutomatically={true}
                    value={this.state.alias}
                />
                <TouchTextButton style={{marginBottom: 10}} onPress={this.save}>Save</TouchTextButton>
            </View>
        );
    }
}
