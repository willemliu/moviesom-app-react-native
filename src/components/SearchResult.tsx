import {TouchableOpacity, View, Text, Image} from 'react-native';
import React from 'react';
import { searchResultStyle, movieSomColor } from '../styles/Styles';
import { getPosterUrl } from '../tmdb/TMDb';
import {parse, format} from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';

export interface Props {
    handleOnPress: (id: number|null|undefined) => void;
    poster_path?: string|null;
    adult?: boolean;
    overview?: string;
    release_date?: string;
    genre_ids?: number[];
    id?: number;
    original_title?: string;
    original_language?: string;
    title?: string;
    backdrop_path?: string|null;
    popularity?: number;
    vote_count?: number;
    video?: boolean;
    vote_average?: number;
}

export default class SearchResult extends React.Component<Props, any> {
    state: any = {
        image: (
            <Image
                style={{marginBottom: 10}}
                resizeMode='contain'
                source={require('../../assets/eyecon48x48grey.png')}
            />
        )
    };

    componentDidMount() {
        this.getImage(getPosterUrl(this.props.poster_path));
    }

    handleOnPress = () => {
        if (this.props.handleOnPress) { this.props.handleOnPress(this.props.id); }
    }

    /**
     * Tries to get the image from the given URL. It determines the width and height which
     * is required in order to show the image. Otherwise it will be 0x0.
     * When all conditions are met the `image` state is set with a JSX Element triggering
     * a re-render.
     */
    getImage = (url: string) => {
        if (url) {
            Image.getSize(url, (width: number, height: number) => {
                this.setState({
                    image: (
                        <Image
                            style={{width, height, marginBottom: 10}}
                            resizeMode='contain'
                            source={{uri: url}}
                            loadingIndicatorSource={require('../../assets/eyecon48x48grey.png')}
                        />
                    )
                });
            }, (e) => { console.error(e); });
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handleOnPress} activeOpacity={0.9}>
                <View style={searchResultStyle.view}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            {this.state.image}
                            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center'}}>
                                <TouchableOpacity style={{flex: 0}} onPress={() => alert('test')} activeOpacity={0.9}>
                                    <MaterialIcons name="add-circle-outline" size={32} color={movieSomColor}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex: 0}} onPress={() => alert('test2')} activeOpacity={0.9}>
                                    <MaterialIcons name="remove-circle-outline" size={32} color={movieSomColor}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex: 0}} onPress={() => alert('test3')} activeOpacity={0.9}>
                                    <MaterialIcons name="star-border" size={32} color={movieSomColor}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex: 0}} onPress={() => alert('test4')} activeOpacity={0.9}>
                                    <MaterialIcons name="share" size={32} color={movieSomColor}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex: 3, marginLeft: 10}}>
                            <Text style={searchResultStyle.title}>{this.props.title} ({format(parse(this.props.release_date as string), 'YYYY')})</Text>
                            <Text style={searchResultStyle.overview}>{this.props.overview}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
