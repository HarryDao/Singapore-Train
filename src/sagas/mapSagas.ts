import { all, takeEvery, call, put } from 'redux-saga/effects';
import * as actions from 'actions';
import * as apis from 'apis';

const { ActionTypes } = actions;

export const mapSagas = function* () {
    yield all([
        takeEvery(ActionTypes.fetchMapData, fetchMapData)
    ]);
};

export function* fetchMapData() {
    try {
        const data = yield call(apis.fetchMapData);

        yield put(actions.fetchMapDataSuccess(data));
    } catch(error) {
        yield put(actions.fetchMapDataError());
    }    
}