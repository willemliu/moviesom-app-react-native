import React from 'react';
import {Text} from 'react-native';
import renderer from 'react-test-renderer';
import TouchTextButton from '../../src/components/TouchTextButton';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure( { adapter: new Adapter() } );

it('should render the correct TouchTextButton component', () => {
    const spy = jest.fn();
    const component = shallow(<TouchTextButton onPress={spy}>Touch text button</TouchTextButton>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.simulate('press');
    expect(spy).toHaveBeenCalled();
});
