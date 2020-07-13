import React from 'react';
import { mount } from 'enzyme';
import { Root } from 'containers/Root';
import { Map } from './index';

jest.mock('axios');

describe('containers/Map', () => {
    it('should render correctly', async () => {
        const wrapper = mount(
            <Root>
                <Map/>
            </Root>
        );
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        wrapper.update();

        expect(wrapper.find('svg').length).toEqual(1);
    });
});