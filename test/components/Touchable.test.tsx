import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

import React from 'react';
import {Text, Platform} from 'react-native';
import renderer from 'react-test-renderer';
import Touchable from '../../src/components/Touchable';

Enzyme.configure({ adapter: new Adapter() });

describe('Touchable', () => {
    it('should render the Android component', () => {
        Platform.OS = 'android';
        const rendered = renderer.create(<Touchable onPress={jest.fn()}><Text>Touchable component</Text></Touchable>).toJSON();
        expect(rendered).toMatchSnapshot();
    });

    it('should render the iOS component', () => {
        Platform.OS = 'ios';
        const rendered = renderer.create(<Touchable onPress={jest.fn()}><Text>Touchable component</Text></Touchable>).toJSON();
        expect(rendered).toMatchSnapshot();
    });

    it('should handle onPress event', () => {
        const spy = jest.fn();
        const rendered = shallow(<Touchable onPress={spy}>Touch text button</Touchable>);
        expect(spy).toHaveBeenCalledTimes(0);
        rendered.simulate('press');
        expect(spy).toHaveBeenCalled();
    });

});
