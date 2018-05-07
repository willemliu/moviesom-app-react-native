import React from 'react';
import { Share, Text, ScrollView, TouchableNativeFeedback, View, Image } from 'react-native';
import {textStyle, viewStyle, searchResultStyle} from "../styles/Styles";
import TouchTextButton from '../components/TouchTextButton';
import { get, getBackdropUrl } from '../tmdb/TMDb';
import { format, parse } from 'date-fns';

export interface Props {
    id: number;
    title: string;
    overview: string;
    revenue?: number;
    budget?: number;
    runtime?: number;
}

export default class MovieDetailScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Movie Details',
    };

    state: any = {
        image: (
            <Image
                style={{
                    width: 390,
                    height: 219,
                }}
                resizeMode='cover'
                source={require('../../assets/eyecon512x512.png')}
            />
        )
    };

    constructor(props: any) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        this.getDetails();
    }

    getDetails = async () => {
        console.log('Get movie details');
        const movie = await get(`/movie/${this.props.id}`, `append_to_response=${encodeURI('videos,credits,alternative_titles')}`).then((data) => data.json());
        await this.loadImage(movie.backdrop_path);
        this.props.actions.addItem(movie);
    }

    /**
     * Tries to load the image from the given URL. It determines the width and height which
     * is required in order to show the image. Otherwise it will be 0x0.
     * When all conditions are met the `image` state is set with a JSX Element triggering
     * a re-render.
     */
    loadImage = async (backdropPath: string|null|undefined) => {
        const url = await getBackdropUrl(backdropPath);
        if (url) {
            Image.getSize(url, (width: number, height: number) => {
                this.setState({
                    image: (
                        <Image
                            style={{
                                flex: 1,
                                height: 219,
                            }}
                            loadingIndicatorSource={require('../../assets/eyecon512x512.png')}
                            resizeMode='cover'
                            source={{uri: url}}
                        />
                    )
                });
            }, (e) => { console.error(e); });
        } else {
            console.log('backdrop path not found', url);
        }
    }

    updateMovieTest = () => {
        this.props.actions.addItem({
            id: this.props.id,
            title: `${this.props.title}` + 1
        });
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: '#fff'}}>
                <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={{backgroundColor: '#fff'}}>
                        {this.state.image}
                        <Text style={searchResultStyle.title}>{this.props.title}{this.props.release_date ? ` (${format(parse(this.props.release_date as string), 'YYYY')})` : null}</Text>
                        <Text style={searchResultStyle.overview}>{this.props.budget ? `Budget: ${this.props.budget}` : null}</Text>
                        <Text style={searchResultStyle.overview}>{this.props.revenue ? `Revenue: ${this.props.revenue}` : null}</Text>
                        <Text style={searchResultStyle.overview}>{this.props.runtime ? `Runtime: ${this.props.runtime}` : null}</Text>
                        <Text style={searchResultStyle.overview}>{this.props.overview}</Text>
                        <TouchTextButton onPress={this.updateMovieTest}>Show data</TouchTextButton>
                        <TouchTextButton
                            onPress={() => Share.share({
                                title: this.props.title,
                                message: `${this.props.overview} https://www.moviesom.com/moviesom.php?tmdbMovieId=${this.props.ownMovie.id}`,
                                url: `https://www.moviesom.com/moviesom.php?tmdbMovieId=${this.props.id}`
                            }, {
                                dialogTitle: 'MovieSom share'
                            })}
                        >Share</TouchTextButton>
                    </View>
                </TouchableNativeFeedback>
            </ScrollView>
        );
    }
}
