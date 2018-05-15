import React from 'react';
import {Text} from 'react-native';
import renderer from 'react-test-renderer';
import DrawerContainer from "../../src/components/DrawerContainer";

describe('DrawerContainer', () => {
    it('should render correctly', () => {
        const rendered = renderer.create(<DrawerContainer onPress={jest.fn()}><Text>Touchable component</Text></DrawerContainer>).toJSON();
        expect(rendered).toMatchSnapshot();
    });
});
