import { ActionTypes } from '../types';
import {
    initTrainInformationListener,
    updateTrainInformation
} from '../trainActions';
import { trainInformation } from 'tests';

describe('actions/trainActions', () => {
    it('initTrainInformationListener correctly', () => {
        expect(initTrainInformationListener()).toEqual({
            type: ActionTypes.initTrainInformationListener
        });
    });

    it('updateTrainInformation correctly', () => {
        expect(updateTrainInformation(trainInformation)).toEqual({
            type: ActionTypes.updateTrainInformation,
            payload: trainInformation
        });
    });
});