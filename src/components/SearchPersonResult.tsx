import {View, Text, Image, AsyncStorage, TouchableNativeFeedback, TextStyle, StyleProp} from 'react-native';
import React from 'react';
import { searchResultStyle, movieSomColor } from '../styles/Styles';
import { getProfileUrl } from '../tmdb/TMDb';
import {parse, format} from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationRoute, NavigationScreenProp } from 'react-navigation';

export interface Props {
    handleOnPress: (props: any) => void;
    profile_path?: string|null;
    adult?: boolean;
    id?: number;
    media_type?: string;
    known_for?: any; // TODO type
    title?: string;
    name?: string;
    biography?: string;
    popularity?: number;
    navigation: NavigationScreenProp<NavigationRoute>;
    style?: StyleProp<TextStyle>;
    test?: string;
}

export default class SearchPersonResult extends React.PureComponent<Props, any> {
    state: any = {
        image: (
            <Image
                style={{
                    width: 46,
                    height: 68,
                }}
                resizeMode='cover'
                source={require('../../assets/eyecon256x256.png')}
            />
        ),
    };

    componentDidMount() {
        this.loadImage(this.props.profile_path);
    }

    /**
     * Tries to load the image from the given URL. It determines the width and height which
     * is required in order to show the image. Otherwise it will be 0x0.
     * When all conditions are met the `image` state is set with a JSX Element triggering
     * a re-render.
     */
    loadImage = async (profilePath: string|null|undefined) => {
        const url = await getProfileUrl(profilePath);
        if (url) {
            Image.getSize(url, (width: number, height: number) => {
                this.setState({
                    image: (
                        <Image
                            style={{
                                width: Math.min(width / 2, 46),
                                height: Math.min(height / 2, 68),
                            }}
                            resizeMode='cover'
                            source={{uri: url}}
                        />
                    )
                });
            }, (e) => { console.error(e); });
        }
    }

    share = async () => {
        const loggedIn = await AsyncStorage.getItem('loggedIn');
        if (loggedIn) {
            alert(`share ${this.props.id}`);
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.props.handleOnPress}
                background={TouchableNativeFeedback.SelectableBackground()}
            >
                <View style={[searchResultStyle.view, this.props.style]}>
                    <View style={{flex: 0, flexDirection: 'row'}}>
                        <View style={{flex: 2}}>
                            {this.state.image}
                        </View>
                        <View style={{flex: 10}}>
                            <Text style={searchResultStyle.title}><MaterialIcons name="person" size={16}/> {this.props.name}</Text>
                            <Text style={searchResultStyle.overview} numberOfLines={2}>{this.props.biography}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <TouchableNativeFeedback
                            style={{flex: 0}}
                            onPress={this.share}
                            background={TouchableNativeFeedback.SelectableBackground()}
                        >
                            <View style={{paddingTop: 5, paddingLeft: 5, paddingRight: 5}}><MaterialIcons name="share" size={32} color={movieSomColor}/></View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}
