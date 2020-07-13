import produce from 'immer';

import { ActionTypes, Action } from 'actions';
import { GeoJsonData } from 'apis';

export interface MapReducer {
    loading: boolean;
    border: GeoJsonData | null,
    park: GeoJsonData | null,
    water: GeoJsonData | null,
    error: boolean
};

export const INITIAL_STATE: MapReducer = {
    loading: false,
    border: null,
    park: null,
    water: null,
    error: false
};

export const reducer = (state = INITIAL_STATE, action: Action): MapReducer => {
    return produce(state, draft => {
        switch(action.type) {
            case ActionTypes.fetchMapData:
                draft.loading = true;
                draft.error = false;
                break;
            case ActionTypes.fetchMapDataSuccess:
                draft.loading = false;
                draft.error = false;
                draft.border = action.payload.border;
                draft.park = action.payload.park;
                draft.water = action.payload.water;
                break;
            case ActionTypes.fetchMapDataError:
                draft.loading = false;
                draft.error = true
                break;
            default:
        }
    });
}