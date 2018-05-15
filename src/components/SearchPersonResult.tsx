import {View, Text, Image} from 'react-native';
import React from 'react';
import { searchResultStyle } from '../styles/Styles';
import { MaterialIcons } from '@expo/vector-icons';
import MovieIcons from './MovieIcons';
import Touchable from './Touchable';

export default class SearchPersonResult extends React.PureComponent<any, any> {
    state: any = {
        image: (
            <Image
                style={{
                    width: 56,
                    height: 83,
                    flex: 1,
                }}
                resizeMode='cover'
                loadingIndicatorSource={require('../../assets/eyecon256x256.png')}
                defaultSource={require('../../assets/eyecon56x56.png')}
                source={require('../../assets/eyecon56x56.png')}
            />
        ),
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            this.loadImage(this.props.profile_path);
        });
    }

    /**
     * Tries to load the image from the given URL. It determines the width and height which
     * is required in order to show the image. Otherwise it will be 0x0.
     * When all conditions are met the `image` state is set with a JSX Element triggering
     * a re-render.
     */
    loadImage = async (profilePath: string|null|undefined) => {
        const url = await this.props.getProfileUrl(profilePath);
        if (url) {
            Image.getSize(url, (width: number, height: number) => {
                this.setState({
                    image: (
                        <Image
                            style={{
                                width: 56,
                                height: 83,
                            }}
                            loadingIndicatorSource={require('../../assets/eyecon256x256.png')}
                            resizeMode='cover'
                            defaultSource={require('../../assets/eyecon56x56.png')}
                            source={{uri: url}}
                        />
                    )
                });
            }, (e) => { console.error(e); });
        }
    }

    render() {
        return (
            <Touchable onPress={this.props.handleOnPress}>
                <View style={[searchResultStyle.view, this.props.style]}>
                    <View style={{flex: 0, flexDirection: 'row'}}>
                        <View style={{flex: 2}}>
                            {this.state.image}
                        </View>
                        <View style={{flex: 10}}>
                            <Text style={searchResultStyle.title}><MaterialIcons name="person" size={15}/> {this.props.name}</Text>
                            <Text style={searchResultStyle.overview} numberOfLines={2}>{this.props.biography}</Text>
                        </View>
                    </View>
                    <MovieIcons {...this.props as any}/>
                </View>
            </Touchable>
        );
    }
}
