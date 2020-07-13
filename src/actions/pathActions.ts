import { ActionTypes } from './types';
import { convertPathData } from 'helpers';
import { Path, ConvertedPath } from 'helpers';

export interface FindFirstPathsAction {
    type: ActionTypes.findFirstPaths,
    payload: {
        from: string;
        to: string;
    },
    forced?: boolean;
}
export const findFirstPaths = (
    { from, to, forced }: { from: string, to: string, forced?: boolean }
): FindFirstPathsAction => ({
    type: ActionTypes.findFirstPaths,
    payload: { from, to },
    forced: !!forced
});


export interface FindFirstPathSuccessAction {
    type: ActionTypes.findFirstPathsSuccess,
    payload: { paths: ConvertedPath[], searchable: boolean }
}
export const findFirstPathsSuccess = (
    { paths, searchable }: { paths: Path[], searchable: boolean }
): FindFirstPathSuccessAction => ({
    type: ActionTypes.findFirstPathsSuccess,
    payload: {
        paths: paths.map(convertPathData),
        searchable
    }
});


export interface FindFirstPathsErrorAction {
    type: ActionTypes.findFirstPathsError;
};
export const findFirstPathsError = (): FindFirstPathsErrorAction => ({
    type: ActionTypes.findFirstPathsError
});


export interface SwitchDestinationsAction {
    type: ActionTypes.switchDestinations
};
export const switchDestinations = (): SwitchDestinationsAction => ({
    type: ActionTypes.switchDestinations
});


export interface ChangeActivePathAction {
    type: ActionTypes.changeActivePath;
    payload: number;
}
export const changeActivePath = (nextIndex: number): ChangeActivePathAction => ({
    type: ActionTypes.changeActivePath,
    payload: nextIndex
});


export interface ChangeActiveTripAction {
    type: ActionTypes.changeActiveTrip
};
export const changeActiveTrip = (): ChangeActiveTripAction => ({
    type: ActionTypes.changeActiveTrip
});


export interface RefreshPathsAction {
    type: ActionTypes.refreshPaths
}
export const refreshPaths = (): RefreshPathsAction => ({
    type: ActionTypes.refreshPaths
});


export interface FindNextPathAction {
    type: ActionTypes.findNextPath
};
export const findNextPath = (): FindNextPathAction => ({
    type: ActionTypes.findNextPath
});


export interface FindNextPathSuccessAction {
    type: ActionTypes.findNextPathSuccess,
    payload: ConvertedPath[]
}
export const findNextPathSuccess = (data: Path[]): FindNextPathSuccessAction => ({
    type: ActionTypes.findNextPathSuccess,
    payload: data.map(convertPathData)
});


export interface FindNextPathErrorAction {
    type: ActionTypes.findNextPathError
}
export const findNextPathError = (): FindNextPathErrorAction => ({
    type: ActionTypes.findNextPathError,
});