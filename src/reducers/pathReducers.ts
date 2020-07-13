import produce from 'immer';

import { ConvertedPath } from 'helpers';
import { ActionTypes, Action } from 'actions';

export interface PathReducer {
    loading: boolean;
    from: string;
    to: string;
    paths: ConvertedPath[],
    error: boolean;
    searchable: boolean;
    nextLoading: boolean;
    nextError: boolean;
    switchLoading: boolean;
    activePath: number;
    activeTrip: number;
}

export const INITIAL_STATE: PathReducer = {
    loading: false,
    nextLoading: false,
    switchLoading: false,
    from: '',
    to: '',
    paths: [],
    error: false,
    nextError: false,
    searchable: true,
    activePath: 0,
    activeTrip: 0,
}

export const reducer = (state = INITIAL_STATE, action: Action): PathReducer => {
    return produce(state, draft => {
        switch(action.type) {
            case ActionTypes.switchDestinations:
                draft.switchLoading = true;
                break;
            
            case ActionTypes.findFirstPaths:
                draft.loading = true;
                draft.from = action.payload.from;
                draft.to = action.payload.to;
                break;
            case ActionTypes.findFirstPathsSuccess:
                draft.loading = false;
                draft.switchLoading = false;
                draft.paths = action.payload.paths;
                draft.searchable = action.payload.searchable;
                draft.activePath = INITIAL_STATE.activePath;
                draft.activeTrip = INITIAL_STATE.activeTrip;
                break;
            case ActionTypes.findFirstPathsError:
                draft.loading = false;
                draft.switchLoading = false;
                draft.error = true;
                break;

            case ActionTypes.findNextPath:
                draft.nextLoading = true;
                draft.nextError = false;
                break;
            case ActionTypes.findNextPathSuccess:
                draft.nextLoading = false;
                draft.nextError = false;
                if (action.payload.length > draft.paths.length) {
                    draft.paths = action.payload;
                    draft.activePath = draft.paths.length - 1;
                    draft.activeTrip = INITIAL_STATE.activeTrip;
                    draft.searchable = true;
                } else {
                    draft.searchable = false;
                }
                break;
            case ActionTypes.findNextPathError:
                draft.nextLoading = false;
                draft.nextError = true;
                break;

            case ActionTypes.changeActivePath:
                draft.activePath = action.payload;
                draft.activeTrip = INITIAL_STATE.activeTrip;
                break;

            case ActionTypes.changeActiveTrip:
                draft.activeTrip = 1 - draft.activeTrip;
                break;
                
            default:
        }
    });
}