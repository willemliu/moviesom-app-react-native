import React from 'react';
import {View, ScrollView, Text, Picker} from 'react-native';
import {viewStyle, searchScreenStyle, backgroundColor, movieSomColor, touchTextButtonStyle, filterStyle} from "../styles/Styles";
import {Filters} from "./CollectionScreen";
import LabeledSwitch from "../components/LabeledSwitch";
import Touchable from "../components/Touchable";
import { MovieSomServices } from '../moviesom/MovieSom';

export interface Props {
    navigation: any;
    actions: any;
    collectionActions: any;
    collectionItems: any[any];
    filterConnection: number|'';
    watchedFilter: 'true'|'false';
    wantToWatchFilter: 'true'|'false';
    bluRayFilter: 'true'|'false';
    dvdFilter: 'true'|'false';
    digitalFilter: 'true'|'false';
    otherFilter: 'true'|'false';
    lendOutFilter: 'true'|'false';
    noteFilter: 'true'|'false';
    spoilerFilter: 'true'|'false';
    sort: 'added'|'updated'|'sort_watched'|'title'|'';
    allFilter: 'true'|'false';
    loggedIn: boolean;
    loginToken: string;
    post: (service: MovieSomServices, urlParams: string, payload: string) => Promise<any>;
}

export interface FilterConnection {alias: string, user_id: number, username: string}

export default class CollectionFilterScreen extends React.PureComponent<Props, any> {
    static navigationOptions = {
        title: 'Filters'
    };

    state: any = {};

    constructor(props: Props) {
        super(props);
        this.state = {
            filterConnections: [],
            ...this.props
        };
    }

    componentDidMount() {
        this.getConnections();
    }

    getConnections = async () => {
        const response = await this.props.post('getUserFilterConnections', '', JSON.stringify({
            token: this.props.loginToken
        })).then((data: any) => data.json());
        this.setState({
            filterConnections: response.getUserFilterConnections.message
        });
    }

    getFilters = () => {
        const filters: Filters = {
            watched_filter: this.state.watchedFilter,
            want_to_watch_filter: this.state.wantToWatchFilter,
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

    getExplanation = () => {
        const explanation: string[] = ['Show'];
        let user = 'you';
        const foundUser: FilterConnection = this.state.filterConnections.find((el: FilterConnection) => el.user_id === this.state.filterConnection );
        if (foundUser) {
            user = foundUser.alias ? foundUser.alias : foundUser.username;
        }

        if (this.state.allFilter === 'true') {
            explanation.push(`everything ${user} have seen or not`);
        } else if (this.state.watchedFilter === 'true') {
            explanation.push(`everything ${user} have seen`);
        } else {
            explanation.push(`everything ${user} haven't seen`);
        }
        if (this.state.wantToWatchFilter === 'true') {
            explanation.push(`and want to watch`);
        }
        if (this.state.bluRayFilter === 'true'
            || this.state.dvdFilter === 'true'
            || this.state.digitalFilter === 'true'
            || this.state.otherFilter === 'true'
        ) {
            explanation.push('and own on');
            const own: string[] = [];
            if (this.state.bluRayFilter === 'true') {
                own.push('Blu-ray');
            }
            if (this.state.dvdFilter === 'true') {
                own.push('DVD');
            }
            if (this.state.digitalFilter === 'true') {
                own.push('digital');
            }
            if (this.state.otherFilter === 'true') {
                own.push('other');
            }
            explanation.push(own.join(', '));
            explanation.push('media');
        }
        if (this.state.lendOutFilter === 'true') {
            explanation.push(`and have lent out`);
        }
        if (this.state.noteFilter === 'true') {
            explanation.push(`and you've written a note for`);
        }
        if (this.state.spoilerFilter === 'true') {
            explanation.push(`and contains a spoiler left by a movie buddy`);
        }
        switch (this.state.sort) {
            case 'added':
                explanation.push(`ordered by last added`);
                break;
            case 'updated':
                explanation.push(`ordered by last updated`);
                break;
            case 'sort_watched':
                explanation.push(`ordered by most watched`);
                break;
            case 'title':
            default:
                explanation.push(`ordered by title alphabetically`);
                break;
        }
        return explanation.join(' ');
    }

    render() {
        const connections: JSX.Element[] = [];
        this.state.filterConnections.forEach((connection: FilterConnection) => {
            connections.push(<Picker.Item key={connection.user_id} label={connection.alias ? connection.alias : connection.username} value={connection.user_id}/>);
        });

        return (
            <View style={viewStyle.view}>
                <ScrollView style={[searchScreenStyle.flatList, {backgroundColor}]}>
                    <LabeledSwitch onValueChange={this.handleAllPress} value={this.checkFilter('allFilter')}>All</LabeledSwitch>
                    <LabeledSwitch onValueChange={this.handleWatchedPress} value={this.checkFilter('watchedFilter')}>Only show what you've watched</LabeledSwitch>
                    <LabeledSwitch onValueChange={(checked: boolean) => this.setState({wantToWatchFilter: `${checked}`})} value={this.checkFilter('wantToWatchFilter')}>Watchlist</LabeledSwitch>
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
                    <Picker selectedValue={this.state.filterConnection}
                        style={{ height: 50 }}
                        onValueChange={(itemValue: string, itemIndex: number) => this.setState({filterConnection: itemValue})}>
                        <Picker.Item label='Yourself' value=''/>
                        {connections}
                    </Picker>
                    <Touchable style={searchScreenStyle.searchBar}>
                        <View style={touchTextButtonStyle.view}><Text style={touchTextButtonStyle.text} onPress={this.handleFilterPress}>Filter</Text></View>
                    </Touchable>
                </ScrollView>
                <Text style={filterStyle.explanation}>{this.getExplanation()}</Text>
            </View>
        );
    }
}
