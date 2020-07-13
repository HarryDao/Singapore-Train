
import { FetchMapData } from 'apis';
import { processBorderData } from 'helpers';

import { ActionTypes } from './types';

export interface FetchMapDataAction {
    type: ActionTypes.fetchMapData;
};
export const fetchMapData = (): FetchMapDataAction => ({
    type: ActionTypes.fetchMapData,
});


export interface FetchMapDataSuccessAction {
    type: ActionTypes.fetchMapDataSuccess,
    payload: FetchMapData
};
export const fetchMapDataSuccess = (
    data: FetchMapData
): FetchMapDataSuccessAction => {
    processBorderData(data.border);

    return {
        type: ActionTypes.fetchMapDataSuccess,
        payload: data
    };
};


export interface FetchMapDataErrorAction { type: ActionTypes.fetchMapDataError };
export const fetchMapDataError = () => ({ type: ActionTypes.fetchMapDataError });

