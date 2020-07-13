import React from 'react';
import { shallow } from 'enzyme';
import { Root } from './index';
import { StoreState } from 'reducers';
import { Provider } from 'react-redux';

const TestComponent: React.SFC = function () {
    return <div>testing testing</div>
}

describe('container/Root', () => {
    const defaultState = Root.getStore().getState() as StoreState;
    const key = Object.keys(defaultState)[0] as keyof StoreState;
    const initialState = { [key]: 'just a test' };

    it('should render child components', () => {
        const wrapper = shallow(
            <Root>
                <TestComponent/>
            </Root>
        );

        expect(wrapper.find(Provider)).toHaveLength(1);
        expect(wrapper.find(TestComponent)).toHaveLength(1);
    });

    it('should load initial state', () => {
        shallow(
            <Root initialState={initialState}>
                <TestComponent/>
            </Root>
        );
        
        const state = Root.getStore().getState() as StoreState;

        expect(initialState[key]).toEqual(state[key]);
    });
});