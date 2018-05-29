import {View, Text, Image} from 'react-native';
import React from 'react';
import {detailStyle, searchResultStyle} from '../styles/Styles';
import Touchable from './Touchable';
import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native';
import {SeasonProps} from "../interfaces/Season";
import {format} from "date-fns";

export interface Props extends SeasonProps {
    getPosterUrl: (posterPath: string|null|undefined, quality?: number) => Promise<any>;
    handleOnPress: (props: any) => void;
    style?: StyleProp<ViewStyle>;
}

export default class SearchSeasonResult extends React.PureComponent<Props, any> {
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
                defaultSource={require('../../assets/eyecon256x256.png')}
                source={require('../../assets/eyecon256x256.png')}
            />
        ),
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            this.loadImage(this.props.poster_path);
        });
    }

    /**
     * Tries to load the image from the given URL. It determines the width and height which
     * is required in order to show the image. Otherwise it will be 0x0.
     * When all conditions are met the `image` state is set with a JSX Element triggering
     * a re-render.
     */
    loadImage = async (posterPath: string|null|undefined) => {
        const url = await this.props.getPosterUrl(posterPath);
        if (url) {
            Image.getSize(url, (width: number, height: number) => {
                this.setState({
                    image: (
                        <Image
                            style={{
                                width: 56,
                                height: 83,
                            }}
                            loadingIndicatorSource={require('../../assets/eyecon56x56.png')}
                            resizeMode='cover'
                            defaultSource={require('../../assets/eyecon56x56.png')}
                            source={{uri: url}}
                        />
                    )
                });
            }, (e: any) => { console.error(e); });
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
                            <Text style={searchResultStyle.title}>Season {this.props.season_number}</Text>
                            <View style={[detailStyle.metaView, {margin: 5}]}>
                                <Text style={detailStyle.metaText}>{format(this.props.air_date as string, 'DD-MM-YYYY')}</Text>
                                <Text style={detailStyle.metaText}>Episodes: {this.props.episode_count}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Touchable>
        );
    }
}
