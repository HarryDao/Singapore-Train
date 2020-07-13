import React from 'react';
import { shallow } from 'enzyme';
import { SpinnerLoader } from './';

jest.mock('utils/loadable', () => {
    const SpinnerLoader = jest.requireActual('./SpinnerLoader');

    return {
        loadable: (fn: Function) => {
            fn();
            return SpinnerLoader.default;
        }
    };
});

jest.mock('components/Fade', () => {
    const Fade = jest.requireActual('components/Fade/Fade');

    return { Fade: Fade.default };
});

describe('components/SpinnerLoader', () => {
    it('should render correctly when loader only covers parent component', () => {
        const wrapper = shallow(
            <SpinnerLoader show/>
        );
        
        expect(
            wrapper.find('.SpinnerLoader.cover-screen')
        ).toHaveLength(0);
    });

    it('should render correctly when loader covers the whole screen', () => {
        const wrapper = shallow(
            <SpinnerLoader show coverScreen/>
        );
        expect(
            wrapper.find('.SpinnerLoader.cover-screen')
        ).toHaveLength(1);
    });

    it('should render correctly when loader has transparent background', () => {
        const wrapper = shallow(
            <SpinnerLoader show transparent/>
        );

        expect(
            wrapper.find('.SpinnerLoader.transparent')
        ).toHaveLength(1);
    })
    
    it('should position loader to top if required', () => {
        const wrapper = shallow(
            <SpinnerLoader show position='top'/>
        );

        expect(
            wrapper.find('.SpinnerLoader.top')
        ).toHaveLength(1);
    });

    it('should position loader to bottom if required', () => {
        const wrapper = shallow(
            <SpinnerLoader show position='bottom' type='circle'/>
        );

        expect(
            wrapper.find('.SpinnerLoader.bottom')
        ).toHaveLength(1);
    });
});