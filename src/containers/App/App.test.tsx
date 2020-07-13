import React from 'react';
import { mount } from 'enzyme';

import { Root } from 'containers/Root';
import { App } from './index';

import { ReactWrapper } from 'enzyme';

jest.mock('axios');

describe('containers/App', () => {
    let wrapper: ReactWrapper;

    beforeEach(async () => {
        wrapper = mount(
            <Root>
                <App/>
            </Root>
        );
        await new Promise(resolve => setTimeout(resolve, 1000));
        wrapper.update();
    });

    it('should have 2 SearchInput components', () => {
        expect(wrapper.find('.SearchInput').length).toEqual(2);
    });

    it('should have 1 submit button', () => {
        expect(wrapper.find('button[type="submit"]').length).toEqual(1);
    });

    it('should have 1 SearchResult component', () => {
        expect(wrapper.find('.SearchResult').length).toEqual(1);
    });

    it('should have 1 Map component', () => {
        expect(wrapper.find('.Map').length).toEqual(1);
    });
});