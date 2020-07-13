import { call, put } from 'redux-saga/effects';

import { fetchMapData } from '../mapSagas';
import * as apis from 'apis';
import * as actions from 'actions';
import { apiData } from 'tests';

const { border, water, park } = apiData;

describe('sagas/mapSagas', () => {
    let generator: Generator;

    describe('fetchMapData', () => {
        beforeEach(() => {
            generator = fetchMapData();
            expect(generator.next().value).toEqual(call(apis.fetchMapData));
        });
    
        it('should work when no error', () => {
            const data = { border, water, park };
    
            expect(generator.next(data).value).toEqual(
                put(actions.fetchMapDataSuccess(data))
            );
        });
    
        it('should handle error correctly', () => {
            expect(generator.throw(1).value).toEqual(
                put(actions.fetchMapDataError())
            );
        });
    })
});