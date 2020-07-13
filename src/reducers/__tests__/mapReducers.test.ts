import { reducer, INITIAL_STATE } from '../mapReducers';
import { ActionTypes } from 'actions';
import { apiData } from 'tests';

const { border, park, water } = apiData;

describe('reducers/mapReducers', () => {
    it('return initial state by default', () => {
        expect(reducer(undefined, {
            type: ActionTypes.testAction
        })).toEqual(INITIAL_STATE);
    });

    it('return correct state for fetchMapData', () => {
        expect(reducer(INITIAL_STATE, {
            type: ActionTypes.fetchMapData
        })).toEqual({
            ...INITIAL_STATE,
            loading: true,
            error: false
        });
    });

    it('return correct state for fetchMapDataSuccess', () => {
        expect(reducer(INITIAL_STATE, {
            type: ActionTypes.fetchMapDataSuccess,
            payload: {
                border,
                park,
                water
            }
        })).toEqual({
            ...INITIAL_STATE,
            border,
            park,
            water
        });
    });

    it('return correct state for fetchMapDataError', () => {
        expect(reducer(INITIAL_STATE, {
            type: ActionTypes.fetchMapDataError,
        })).toEqual({
            ...INITIAL_STATE,
            loading: false,
            error: true
        });
    });
});