import { ActionTypes } from '../types';
import {
    findFirstPaths,
    findFirstPathsError,
    findFirstPathsSuccess,
    switchDestinations,
    changeActivePath,
    changeActiveTrip,
    refreshPaths,
    findNextPath,
    findNextPathSuccess,
    findNextPathError
} from '../pathActions';
import { inputs, paths } from 'tests';
import { convertPathData } from 'helpers';

describe('actions/pathActions', () => {
    const from = inputs.start;
    const to = inputs.end;

    it('findFirstPaths correctly', () => {
        expect(findFirstPaths({
            from,
            to,
        })).toEqual({
            type: ActionTypes.findFirstPaths,
            payload: { from, to },
            forced: false
        });

        expect(findFirstPaths({
            from,
            to,
            forced: true
        })).toEqual({
            type: ActionTypes.findFirstPaths,
            payload: { from, to },
            forced: true
        });
    });

    it('findFirstPathsSuccess correctly', () => {
        expect(findFirstPathsSuccess({
            paths,
            searchable: true
        })).toEqual({
            type: ActionTypes.findFirstPathsSuccess,
            payload: {
                paths: paths.map(convertPathData),
                searchable: true
            }
        });
    });

    it('findFirstPathsError', () => {
        expect(findFirstPathsError()).toEqual({
            type: ActionTypes.findFirstPathsError
        });
    });

    it('switchDestinations correctly', () => {
        expect(switchDestinations()).toEqual({
            type: ActionTypes.switchDestinations
        });
    });

    it('changeActivePath correctly', () => {
        expect(changeActivePath(2)).toEqual({
            type: ActionTypes.changeActivePath,
            payload: 2
        });
    });

    it('changeActiveTrip correctly', () => {
        expect(changeActiveTrip()).toEqual({
            type: ActionTypes.changeActiveTrip
        });
    });

    it("refreshPaths correctly", () => {
        expect(refreshPaths()).toEqual({
            type: ActionTypes.refreshPaths
        });
    });

    it('findNextPath correctly', () => {
        expect(findNextPath()).toEqual({
            type: ActionTypes.findNextPath
        });
    });

    it('findNextPathSuccess correctly', () => {
        expect(findNextPathSuccess(paths)).toEqual({
            type: ActionTypes.findNextPathSuccess,
            payload: paths.map(convertPathData)
        });
    });

    it('findNextPathError correctly', () => {
        expect(findNextPathError()).toEqual({
            type: ActionTypes.findNextPathError
        });
    });
});