import { reducer, INITIAL_STATE } from '../pathReducers';
import { ActionTypes } from 'actions';
import { paths } from 'tests';
import { convertPathData } from 'helpers';

const convertedPaths = paths.map(convertPathData);

describe('reducers/pathReducers', () => {
    it('should return initial state by default', () => {
        expect(reducer(undefined, {
            type: ActionTypes.testAction
        })).toEqual(INITIAL_STATE);
    });

    it('should return correct state for switchDestinations', () => {
        expect(reducer(INITIAL_STATE, {
           type: ActionTypes.switchDestinations
        })).toEqual({
            ...INITIAL_STATE,
            switchLoading: true
        });
    });

    it('should return correct state for findFirstPaths', () => {
        expect(reducer(INITIAL_STATE, {
            type: ActionTypes.findFirstPaths,
            payload: {
                from: 'A',
                to: 'B'
            }
        })).toEqual({
            ...INITIAL_STATE,
            from: 'A',
            to: 'B',
            loading: true
        });
    });

    it('should return correct state for findFirstPathsSuccess', () => {
        expect(reducer(INITIAL_STATE, {
            type: ActionTypes.findFirstPathsSuccess,
            payload: {
                paths: convertedPaths,
                searchable: true
            }
        })).toEqual({
            ...INITIAL_STATE,
            loading: false,
            switchLoading: false,
            paths: convertedPaths,
            searchable: true
        });
    });

    it('should return correct state for findFirstPathsError', () => {
        expect(reducer(INITIAL_STATE, {
            type: ActionTypes.findFirstPathsError,
        })).toEqual({
            ...INITIAL_STATE,
            loading: false,
            switchLoading: false,
            error: true,
        });
    });

    it("should return correct state for findNextPath", () => {
        expect(reducer(INITIAL_STATE, {
            type: ActionTypes.findNextPath,
        })).toEqual({
            ...INITIAL_STATE,
            nextLoading: true,
            nextError: false
        });
    });

    it('should return correct state for findNextPathSuccess', () => {
        expect(reducer(INITIAL_STATE, {
            type: ActionTypes.findNextPathSuccess,
            payload: convertedPaths
        })).toEqual({
            ...INITIAL_STATE,
            nextLoading: false,
            nextError: false,
            paths: convertedPaths,
            activePath: 1,
            activeTrip: INITIAL_STATE.activeTrip,
            searchable: true
        });

        expect(reducer(INITIAL_STATE, {
            type: ActionTypes.findNextPathSuccess,
            payload: []
        })).toEqual({
            ...INITIAL_STATE,
            nextLoading: false,
            nextError: false,
            searchable: false
        });
    });

    it('should return correct state for findNextPathError', () => {
        expect(reducer(INITIAL_STATE, {
            type: ActionTypes.findNextPathError
        })).toEqual({
            ...INITIAL_STATE,
            nextLoading: false,
            nextError: true
        });
    });

    it('should return correct state for changeActivePath', () => {
        expect(reducer(INITIAL_STATE, {
            type: ActionTypes.changeActivePath,
            payload: 4
        })).toEqual({
            ...INITIAL_STATE,
            activePath: 4,
            activeTrip: INITIAL_STATE.activeTrip
        });
    });

    it('should return correct state for changeActiveTrip', () => {
        expect(reducer(INITIAL_STATE, {
            type: ActionTypes.changeActiveTrip
        })).toEqual({
            ...INITIAL_STATE,
            activeTrip: 1 - INITIAL_STATE.activeTrip
        });
    }); 
});