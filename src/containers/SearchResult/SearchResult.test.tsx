import _cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import { mount } from 'enzyme';
import { Root } from 'containers/Root';
import { SearchResult } from './index';
import { convertPathData } from 'helpers';
import { INITIAL_STATE } from 'reducers';
import { inputs, apiData , paths, trainInformation} from 'tests';

import { ReactWrapper } from 'enzyme';

const { stations, lines } = apiData;

const STATE_OFF_SERVICES = {
    train: _cloneDeep(INITIAL_STATE.train)
};

const STATE_ON_SERVICES = {
    train: {
        updates: 1,
        ...trainInformation,       
    },
    station: {
        ..._cloneDeep(INITIAL_STATE.station),
        stations,
        lines,
    },
    path: {
        ..._cloneDeep(INITIAL_STATE.path),
        from: inputs.start,
        to: inputs.end,
        paths: paths.map(convertPathData),
    }  
};

describe('containers/SearchResult', () => {
    let wrapper: ReactWrapper;

    function assignWrapper(done: jest.DoneCallback, initialState = {}) {
        wrapper = mount(
            <Root initialState={initialState}>
                <SearchResult/>
            </Root>
        );

        setTimeout(() => {
            wrapper.update();
            done();
        }, 1000);
    };

    describe('off-service', () => {
        beforeEach(done => {
            assignWrapper(done, STATE_OFF_SERVICES);
        });

        it('should display message', () => {
            expect(wrapper.find('.off-service').length).toEqual(1);
        });
    });

    describe('on-service', () => {
        beforeEach(done => {
            assignWrapper(done, STATE_ON_SERVICES);
        });

        it('should display 1 SearchResultDestinations component', () => {
            expect(wrapper.find('.SearchResultDestinations').length).toEqual(1);
        });

        it('should display 1 SearchResultOptions component', () => {
            expect(wrapper.find('.SearchResultOptions').length).toEqual(1);
        });

        it('should display 1 SearchResultDetails component', () => {
            expect(wrapper.find('.SearchResultDetails').length).toEqual(1);
        });

        it('should have a switch button', () => {
            expect(wrapper.find('.switch').length).toEqual(1);
            wrapper.find('.switch').simulate('click');
        });

        it('should have a first next route button', () => {
            const button = wrapper.find('.SearchResultOptions').find('button');
            expect(button.length).toEqual(1);
            button.simulate('click');
        });
    });
});