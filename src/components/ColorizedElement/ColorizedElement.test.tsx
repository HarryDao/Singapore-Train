import React from 'react';
import { shallow } from 'enzyme';
import { _ColorizedElement as ColorizedElement } from './ColorizedElement';

describe('components/ColorizedElement', () => {
    const Child = () => (<div></div>);

    
    it('render correctly with customized tag', () => {
        const wrapper = shallow(
            <ColorizedElement
                line='CC'
                tag='li'
            ><Child/></ColorizedElement>
        );

        expect(wrapper.find('li').length).toEqual(1);
        expect(wrapper.find(Child).length).toEqual(1);
    });

    it('render correctly with default tag', () => {
        const wrapper = shallow(
            <ColorizedElement
                line='CC'
            ><Child/></ColorizedElement>
        );

        expect(wrapper.find('div').length).toEqual(1);       
    });
});