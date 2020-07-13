import { reducer, INITIAL_STATE } from '../trainReducers';
import { ActionTypes } from 'actions';
import { trainInformation } from 'tests';

describe('reducers/trainReducers', () => {
    it('should return initial state by default', () => {
        expect(reducer(undefined, {
            type: ActionTypes.testAction
        })).toEqual(INITIAL_STATE);
    });

    it('should return correct state for updateTrainInformation', () => {
        expect(reducer(INITIAL_STATE, {
            type: ActionTypes.updateTrainInformation,
            payload: trainInformation
        })).toEqual({
            ...INITIAL_STATE,
            ...trainInformation,
            updates: INITIAL_STATE.updates + 1
        });
    });
});