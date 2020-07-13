import { ActionTypes } from './types';
import { TrainInformationData } from 'apis';

export interface InitTrainInformationListenerAction {
    type: ActionTypes.initTrainInformationListener;
}
export const initTrainInformationListener = (): InitTrainInformationListenerAction => ({
    type: ActionTypes.initTrainInformationListener
});


export interface UpdateTrainInformationAction {
    type: ActionTypes.updateTrainInformation,
    payload: TrainInformationData
};
export const updateTrainInformation = (
    data: TrainInformationData
): UpdateTrainInformationAction => ({
    type: ActionTypes.updateTrainInformation,
    payload: data
});