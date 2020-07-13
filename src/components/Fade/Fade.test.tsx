import React from 'react';
import { mount } from 'enzyme';
import { Fade } from './index';

jest.mock('utils/loadable', () => {
    const Fade = jest.requireActual('./Fade');

    return {
        loadable: (fn: Function) => {
            fn();
            return Fade.default;
        }
    };
});

describe('components/Fade', () => {
    it('shoud work when active', () => {
        const wrapper = mount(<Fade show/>);
        expect(wrapper.find('.Fade').prop('style')?.opacity).toEqual(1);
    });

    it('should work when inactive', () => {
        const wrapper = mount(
            <Fade show={false}/>
        );

        expect(wrapper.find('.Fade').prop('style')?.opacity).toEqual(0);
    });
});