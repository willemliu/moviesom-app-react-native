import React from 'react';
import {Text, Platform} from 'react-native';
import renderer from 'react-test-renderer';
import Touchable from '../../src/components/Touchable';

const onPressHandler = () => {
    console.log('Pressed');
};

it('should render the Android Touchable component', () => {
    Platform.OS = 'android';
    const rendered = renderer.create(<Touchable onPress={onPressHandler}><Text>Touchable component</Text></Touchable>).toJSON();
    expect(rendered).toMatchSnapshot();
});

it('should render the iOS Touchable component', () => {
    Platform.OS = 'ios';
    const rendered = renderer.create(<Touchable onPress={onPressHandler}><Text>Touchable component</Text></Touchable>).toJSON();
    expect(rendered).toMatchSnapshot();
});
