import React from 'react';
import { mount } from 'enzyme';
import { Slide } from './index';

jest.mock('utils/loadable', () => {
    const Slide = jest.requireActual('./Slide');

    return {
        loadable: (fn: Function) => {
            fn();
            return Slide.default;
        }
    };
});

describe('components/Slide', () => {
    it('should work', async () => {        
        const wrapper = mount(
            <Slide show={false}/>
        );

        expect(wrapper.find('.Slide').prop('style')?.opacity).toEqual(0);

        wrapper.setProps({ show: true });
        wrapper.setState({ test: true });

        expect(wrapper.find('.Slide').prop('style')?.opacity).toEqual(1);
    });
});