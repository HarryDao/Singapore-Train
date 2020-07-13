import React from 'react';
import { mount } from 'enzyme';
import SearchInput from './SearchInput';
import { apiData } from 'tests';

import { ReactWrapper } from 'enzyme';

const { stations } = apiData;

describe('components/SearchInput', () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
        wrapper = mount(
            <SearchInput
                value=''
                name=''
                options={{}}
                onSelect={() => {}}
                error={false}
            />
        );
        wrapper.setProps({ exclude: 'test' });
        wrapper.setProps({ value: '123' });
        wrapper.setProps({ value: '' });
        wrapper.setProps({ options: stations });
        wrapper.find('.input-wrapper').simulate('blur');

    });

    it('has 1 input', () => {
        expect(wrapper.find('input').length).toEqual(1);
    });

    it('render options', () => {
        wrapper.find('.choices ul li').at(2).simulate('mousemove');
        wrapper.find('.choices ul li').at(2).simulate('mousemove');
        wrapper.find('.choices ul li').at(2).simulate('mouseout');

        expect(
            wrapper.find('.choices ul li').length
        ).toEqual(Object.keys(stations).length);
    });
});