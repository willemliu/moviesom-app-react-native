import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

import React from 'react';
import renderer from 'react-test-renderer';
import TouchTextButton from '../../src/components/TouchTextButton';

Enzyme.configure({ adapter: new Adapter() });

describe('TouchTextButton', () => {
    it('should render the correct TouchTextButton component', () => {
        const spy = jest.fn();
        const rendered = renderer.create(<TouchTextButton onPress={spy}>Touch text button</TouchTextButton>).toJSON();
        expect(rendered).toMatchSnapshot();
    });

    it('should handle onPress event', () => {
        const spy = jest.fn();
        const rendered = shallow(<TouchTextButton onPress={spy}>Touch text button</TouchTextButton>);
        expect(spy).toHaveBeenCalledTimes(0);
        rendered.simulate('press');
        expect(spy).toHaveBeenCalled();
    });
});
