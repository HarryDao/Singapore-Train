import produce from 'immer';

import { ActionTypes, Action } from 'actions';
import {
    FetchStationsData,
    FetchMRTLinesData,
} from 'apis';

export interface StationReducer {
    loading: boolean;
    stations: FetchStationsData;
    lines: FetchMRTLinesData;
    error: boolean;
}

export const INITIAL_STATE: StationReducer =  {
    loading: false,
    stations: {},
    lines: {},
    error: false
};

export const reducer = (state = INITIAL_STATE, action: Action): StationReducer => {
    return produce(state, draft => {
        switch(action.type) {
            case ActionTypes.fetchStations:
                draft.loading = true;
                draft.error = false;
                break;
            case ActionTypes.fetchStationsSuccess:
                draft.loading = false;
                draft.error = false;
                draft.stations = action.payload.stations;
                draft.lines = action.payload.lines;
                break;
            case ActionTypes.fetchStationsError:
                draft.loading = false;
                draft.error = true;
                break;
            default:
        }
    });
}