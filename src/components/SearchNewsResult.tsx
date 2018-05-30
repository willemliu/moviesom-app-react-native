import {View, Text, Image, Share} from 'react-native';
import React from 'react';
import {iconsStyle, movieSomColor, searchResultStyle} from '../styles/Styles';
import Touchable from './Touchable';
import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";

export interface Props  {
    id: number;
    title: string;
    type: string;
    image: string;
    url: string;
    description: string;
    url_hash: string;
    added: string;
    handleOnPress: (props: any) => void;
    style?: StyleProp<ViewStyle>;
}

export default class SearchNewsResult extends React.PureComponent<Props, any> {
    shareHandler = () => {
        requestAnimationFrame(async () => {
            const title = this.props.title;
            const message = `${this.props.description ? this.props.description : title}`;
            Share.share({
                title,
                message: `${message} ${this.props.url}`,
                url: this.props.url
            }, {
                dialogTitle: 'MovieSom news share'
            });
        });
    }

    render() {
        return (
            <Touchable onPress={this.props.handleOnPress}>
                <View style={[searchResultStyle.view, this.props.style]}>
                    <View style={{flex: 0, flexDirection: 'row'}}>
                        <View style={{flex: 2}}>
                            <Image
                                style={{
                                    width: 56,
                                    height: 83,
                                    flex: 1,
                                }}
                                resizeMode='cover'
                                loadingIndicatorSource={require('../../assets/eyecon256x256.png')}
                                defaultSource={require('../../assets/eyecon256x256.png')}
                                source={{uri: this.props.image}}
                            />
                        </View>
                        <View style={{flex: 10}}>
                            <Text style={searchResultStyle.title}>{this.props.title}</Text>
                            <Text style={searchResultStyle.overview} numberOfLines={2}>{this.props.description}</Text>
                        </View>
                    </View>
                    <View style={iconsStyle.icons}>
                        <Touchable
                            style={{flex: 0}}
                            onPress={this.shareHandler}
                        >
                            <View style={{padding: 5}}><MaterialIcons name="share" size={32} color={movieSomColor}/></View>
                        </Touchable>
                    </View>
                </View>
            </Touchable>
        );
    }
}
