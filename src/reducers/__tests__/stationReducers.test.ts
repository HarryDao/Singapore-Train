import { reducer, INITIAL_STATE } from '../stationReducers';
import { ActionTypes } from 'actions';
import { apiData } from 'tests';

const { stations, lines } = apiData;

describe('reducers/stationReducers', () => {
    it('should return initial state by default', () => {
        expect(reducer(undefined, {
            type: ActionTypes.testAction
        })).toEqual(INITIAL_STATE);
    });

    it('should return correct state for fetchStations', () => {
        expect(reducer(INITIAL_STATE, {
            type: ActionTypes.fetchStations
        })).toEqual({
            ...INITIAL_STATE,
            loading: true,
            error: false
        });
    });

    it('should return correct state for fetchStationsSuccess', () => {
        expect(reducer(INITIAL_STATE, {
            type: ActionTypes.fetchStationsSuccess,
            payload: {
                stations,
                lines
            }
        })).toEqual({
            ...INITIAL_STATE,
            loading: false,
            error: false,
            stations,
            lines
        });
    });

    it('should return correct state for fetchStationsError', () => {
        expect(reducer(INITIAL_STATE, {
            type: ActionTypes.fetchStationsError
        })).toEqual({
            ...INITIAL_STATE,
            loading: false,
            error: true
        });
    });
});