import React from 'react';
import {Text} from 'react-native';
import renderer from 'react-test-renderer';
import TouchTextButton from '../../src/components/TouchTextButton';

const onPressHandler = () => {
    console.log('Touch text button pressed');
};

it('should render the correct TouchTextButton component', () => {
    const rendered = renderer.create(<TouchTextButton onPress={onPressHandler}>Touch text button</TouchTextButton>).toJSON();
    expect(rendered).toMatchSnapshot();
});
