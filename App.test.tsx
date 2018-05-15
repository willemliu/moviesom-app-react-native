import './test/mock';
import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

describe('App', () => {
    it('should render correctly', () => {
        const rendered = renderer.create(<App />).toJSON();
        expect(rendered).toMatchSnapshot();
    });
});
