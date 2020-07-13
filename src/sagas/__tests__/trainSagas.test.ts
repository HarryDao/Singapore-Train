import { call, put, take, delay } from 'redux-saga/effects';

import {
    createTrainInformationChannel,
    initTrainInformationListener
} from '../trainSagas';
import * as actions from 'actions';
import { setLoadingTimer } from 'helpers';
import { trainInformation } from 'tests';

describe('sagas/trainSagas', () => {
    describe('initTrainInformationListener', () => {
        let generator: Generator;
        let channel = createTrainInformationChannel();
        it('works', () => {
            generator = initTrainInformationListener();
            
            expect(generator.next().value).toEqual(
                call(setLoadingTimer)
            );

            expect(generator.next(() => 1).value).toEqual(
                call(createTrainInformationChannel)
            );
            
            expect(generator.next(channel).value).toEqual(
                take(channel)
            );

            expect(generator.next(trainInformation).value).toEqual(
                delay(1)
            );

            expect(generator.next().value).toEqual(
                put(actions.updateTrainInformation(trainInformation))
            );

            expect(generator.next().value).toEqual(
                take(channel)
            );

            expect(generator.next(trainInformation).value).toEqual(
                put(actions.updateTrainInformation(trainInformation))
            );
        });
    });
});