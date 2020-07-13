import produce from 'immer';

import { ActionTypes, Action } from 'actions';
import { TrainInformationData } from 'apis';

export interface TrainReducer extends TrainInformationData {
    updates: number;
}

export const INITIAL_STATE: TrainReducer = {
    updates: 0,
    firstTrain: 0,
    lastTrain: 0,
    isPeak: false,
    timeSwitchBtw2Lines: 0,
    timeBtw2Stations: 0,
    frequencies: {}
};

export const reducer = (state = INITIAL_STATE, action: Action): TrainReducer => {
    return produce(state, draft => {
        switch(action.type) {
            case ActionTypes.updateTrainInformation:
                draft.updates += 1;
                Object.assign(draft, action.payload);
                break;
            default:
        }
    });
}