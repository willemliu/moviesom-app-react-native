import React from 'react';
import renderer from 'react-test-renderer';
import InlineWebView from "../../src/components/InlineWebView";

describe('InlineWebView', () => {
    it('should render correctly', () => {
        const rendered = renderer.create(<InlineWebView url="https://www.google.com" />).toJSON();
        expect(rendered).toMatchSnapshot();
    });
});
