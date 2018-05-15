import React from 'react';
import {Text} from 'react-native';
import renderer from 'react-test-renderer';
import Touchable from '../../src/components/Touchable';

const onPressHandler = () => {
    console.log('Pressed');
};

it('should render the correct Touchable component', () => {
    const rendered = renderer.create(<Touchable onPress={onPressHandler}><Text>Touchable component</Text></Touchable>).toJSON();
    expect(rendered).toMatchSnapshot();
});
