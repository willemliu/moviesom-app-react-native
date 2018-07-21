import React from 'react';
import {View, ScrollView, Text, Picker} from 'react-native';
import {viewStyle, searchScreenStyle, backgroundColor, movieSomColor, touchTextButtonStyle} from "../styles/Styles";
import {Filters} from "./CollectionScreen";
import LabeledSwitch from "../components/LabeledSwitch";
import Touchable from "../components/Touchable";

export interface Props {
    navigation: any;
    actions: any;
    collectionActions: any;
    collectionItems: any[any];
    filterConnection: number|'';
    watchedFilter: 'true'|'false';
    bluRayFilter: 'true'|'false';
    dvdFilter: 'true'|'false';
    digitalFilter: 'true'|'false';
    otherFilter: 'true'|'false';
    lendOutFilter: 'true'|'false';
    noteFilter: 'true'|'false';
    spoilerFilter: 'true'|'false';
    sort: 'added'|'updated'|'sort_watched'|'title'|'';
    allFilter: 'true'|'false';
}

export default class CollectionFilterScreen extends React.PureComponent<Props, any> {
    static navigationOptions = {
        title: 'Filters'
    };

    state: any = {};

    constructor(props: Props) {
        super(props);
        this.state = this.props;
    }

    getFilters = () => {
        const filters: Filters = {
            watched_filter: this.state.watchedFilter,
            spoiler_filter: this.state.spoilerFilter,
            sort: this.state.sort,
            lend_out_filter: this.state.lendOutFilter,
            dvd_filter: this.state.dvdFilter,
            blu_ray_filter: this.state.bluRayFilter,
            all_filter: this.state.allFilter,
            filter_connection: this.state.filterConnection,
            digital_filter: this.state.digitalFilter,
            note_filter: this.state.noteFilter,
            other_filter: this.state.otherFilter
        };
        return filters;
    }

    handleFilterPress = () => {
        const filters = this.getFilters();
        this.props.collectionActions.setCollectionFilters(filters);
        this.props.navigation.goBack();
    }

    handleAllPress = (checked: boolean) => {
        this.setState({allFilter: `${checked}`});
        if (checked) {
            this.setState({watchedFilter: `${!checked}`});
        }
    }

    handleWatchedPress = (checked: boolean) => {
        this.setState({watchedFilter: `${checked}`});
        if (checked) {
            this.setState({allFilter: `${!checked}`});
        }
    }

    checkFilter(propertyName: string): boolean {
        if (this.state && this.state.hasOwnProperty(propertyName)) {
            return this.state[propertyName] === 'true';
        }
        return (this.props as any)[propertyName] === 'true';
    }

    render() {
        return (
            <View style={viewStyle.view}>
                <ScrollView style={[searchScreenStyle.flatList, {backgroundColor}]}>
                    <LabeledSwitch onValueChange={this.handleAllPress} value={this.checkFilter('allFilter')}>All</LabeledSwitch>
                    <LabeledSwitch onValueChange={this.handleWatchedPress} value={this.checkFilter('watchedFilter')}>Only show what you've watched</LabeledSwitch>
                    <LabeledSwitch onValueChange={(checked: boolean) => this.setState({bluRayFilter: `${checked}`})} value={this.checkFilter('bluRayFilter')}>Blu-ray</LabeledSwitch>
                    <LabeledSwitch onValueChange={(checked: boolean) => this.setState({dvdFilter: `${checked}`})} value={this.checkFilter('dvdFilter')}>DVD</LabeledSwitch>
                    <LabeledSwitch onValueChange={(checked: boolean) => this.setState({digitalFilter: `${checked}`})} value={this.checkFilter('digitalFilter')}>Digital</LabeledSwitch>
                    <LabeledSwitch onValueChange={(checked: boolean) => this.setState({otherFilter: `${checked}`})} value={this.checkFilter('otherFilter')}>Other</LabeledSwitch>
                    <LabeledSwitch onValueChange={(checked: boolean) => this.setState({lendOutFilter: `${checked}`})} value={this.checkFilter('lendOutFilter')}>Lend out</LabeledSwitch>
                    <LabeledSwitch onValueChange={(checked: boolean) => this.setState({noteFilter: `${checked}`})} value={this.checkFilter('noteFilter')}>Note</LabeledSwitch>
                    <LabeledSwitch onValueChange={(checked: boolean) => this.setState({spoilerFilter: `${checked}`})} value={this.checkFilter('spoilerFilter')}>Spoiler</LabeledSwitch>
                    <Picker
                        selectedValue={this.state ? this.state.sort : 'title'}
                        style={{ height: 50 }}
                        onValueChange={(itemValue: string, itemIndex: number) => this.setState({sort: itemValue})}>
                        <Picker.Item label="Sort by title alphabetically" value="title" />
                        <Picker.Item label="Sort by when added" value="added" />
                        <Picker.Item label="Sort by last updated" value="updated" />
                        <Picker.Item label="Sort by most watched" value="sort_watched" />
                    </Picker>
                </ScrollView>
                <Touchable style={searchScreenStyle.searchBar}>
                    <View style={touchTextButtonStyle.view}><Text style={touchTextButtonStyle.text} onPress={this.handleFilterPress}>Filter</Text></View>
                </Touchable>
            </View>
        );
    }
}