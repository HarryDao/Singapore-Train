import { all, takeEvery, take, call, put, delay } from 'redux-saga/effects';
import { eventChannel, EventChannel } from 'redux-saga';
import * as actions from 'actions';
import { SocketIO } from 'services';
import * as helpers from 'helpers';
import { TrainInformationData } from 'apis';
import { ActionTypes } from 'actions';

import { END } from 'redux-saga';

export const trainSagas = function* () {
    yield all([
        takeEvery(
            ActionTypes.initTrainInformationListener,
            initTrainInformationListener
        )
    ]);
}

export function* initTrainInformationListener() {
    let firstTimeTimer: (
        (() => number) | null
    ) = yield call(helpers.setLoadingTimer);

    const channel = yield call(createTrainInformationChannel);
    
    while(true) {
        const data: TrainInformationData = yield take(channel);

        if (firstTimeTimer) {
            yield delay(firstTimeTimer());
            firstTimeTimer = null;    
        }

        yield put(actions.updateTrainInformation(data));
    }
}

export type TrainInformationEmitter = (input: TrainInformationData | END) => void

export function createTrainInformationChannel (): EventChannel<TrainInformationData> {
    return eventChannel<TrainInformationData>((
        emitter: TrainInformationEmitter
    ) => {
        SocketIO.socket?.catchTrainInformation<TrainInformationData>(emitter);
        return () => {};
    });
}
