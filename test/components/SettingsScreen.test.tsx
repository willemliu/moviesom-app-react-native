import React from 'react';
import {Text} from 'react-native';
import renderer from 'react-test-renderer';
import SettingsScreen from "../../src/screens/SettingsScreen";

describe('SettingsScreen', () => {
    it('should render correctly', () => {
        const rendered = renderer.create(<SettingsScreen onPress={jest.fn()}><Text>Touchable component</Text></SettingsScreen>).toJSON();
        expect(rendered).toMatchSnapshot();
    });
});
