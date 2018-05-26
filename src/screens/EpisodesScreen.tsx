import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {backgroundColor, searchScreenStyle, sectionListStyle} from "../styles/Styles";
import {SearchEpisodeResult} from "../redux/TmdbReducer";

export default class EpisodesScreen extends React.PureComponent<any, any> {
    static navigationOptions = {
        title: 'Episodes',
    };

    componentDidMount() {
        console.log('Episodes', this.props.id, this.props.title || this.props.name, this.props.tv_id);
    }

    keyExtractor = (item: any, index: number) => `${item.id}${index}`;

    handleEpisodePress = (episode: any) => {
        requestAnimationFrame(() => {
            if (episode) {
                this.props.navigation.push('EpisodeDetails', episode);
            }
        });
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor}}>
                <FlatList
                    data={this.props.episodes}
                    ListEmptyComponent={<Text style={sectionListStyle.header}>No episodes</Text>}
                    style={[searchScreenStyle.flatList, {backgroundColor}]}
                    extraData={this.props.seasons}
                    keyExtractor={this.keyExtractor}
                    ItemSeparatorComponent={(props: any, state: any) => <Text style={{backgroundColor: '#eee', height: 1}}/>}
                    initialNumToRender={4}
                    renderItem={(data: any) => {
                        return (
                            <SearchEpisodeResult
                                {...data.item}
                                navigation={this.props.navigation}
                                tv_id={this.props.tv_id}
                                media_type='episode' // Setting this explicitly
                                handleOnPress={this.handleEpisodePress}
                            />
                        );
                    }}
                />
            </View>
        );
    }
}
