import { all } from 'redux-saga/effects';
import { mapSagas } from './mapSagas';
import { stationSagas } from './stationSagas';
import { pathSagas } from './pathSagas';
import { trainSagas } from './trainSagas';

export const sagas = function* () {
    yield all([
        mapSagas(),
        stationSagas(),
        pathSagas(),
        trainSagas(),
    ]);
}