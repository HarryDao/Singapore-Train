import { takeEvery, all, call, put } from 'redux-saga/effects';
import * as apis from 'apis';
import {
    FetchStationsData,
    FetchMRTLinesData,
} from 'apis';
import * as actions from 'actions';
import { ActionTypes } from 'actions';
import { MrtGraph } from 'helpers';

export const stationSagas = function* () {
    yield all([
        takeEvery(ActionTypes.fetchStations, fetchStations)
    ]);
}

export function* fetchStations() {
    try {
        const [stations, lines]: [
            FetchStationsData,
            FetchMRTLinesData
        ] = yield all([
            call(apis.fetchStations),
            call(apis.fetchMRTLines) 
        ]);

        yield call(MrtGraph.getGraph, stations);

        yield put(actions.fetchStationsSuccess(stations, lines));
    } catch(error) {
        yield put(actions.fetchStationsError());
    }
}