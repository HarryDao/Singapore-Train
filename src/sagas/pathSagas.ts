import { all, takeEvery, select, call, delay, put } from 'redux-saga/effects';
import * as helpers from 'helpers';
import * as actions from 'actions';
import { NUMBER_OF_SEARCH_RESULTS } from 'configs';
import {
    ActionTypes,
    FindFirstPathsAction
} from 'actions';
import { StoreState } from 'reducers';
import { Graph } from 'helpers';

export const pathSagas = function* () {
    yield all([
        takeEvery(ActionTypes.findFirstPaths, findFirstPaths),
        takeEvery(ActionTypes.findNextPath, findNextPath),
        takeEvery(ActionTypes.refreshPaths, refreshPaths),
        takeEvery(ActionTypes.switchDestinations, switchDestinations),
    ]);
}

export function* findFirstPaths ({
    payload: { from, to }, forced
}: FindFirstPathsAction) {
    const { train } : StoreState = yield select();
    const {
        timeBtw2Stations,
        timeSwitchBtw2Lines,
        frequencies,
    } = train;
    const timer: () => number = yield call(helpers.setLoadingTimer);

    try {
        const graph: Graph = yield call(helpers.MrtGraph.getGraph);

        if (forced || graph.start !== from || graph.end !== to) {
            for (let i = 1; i <= NUMBER_OF_SEARCH_RESULTS; i++) {
                yield call(
                    {
                        context: graph,
                        fn: graph.findNextShortestPath
                    },
                    from,
                    to,
                    timeBtw2Stations,
                    timeSwitchBtw2Lines,
                    frequencies
                );
            }
        }

        const paths = graph.shortestPaths.slice();
        const searchable = paths.length >= NUMBER_OF_SEARCH_RESULTS;

        yield delay(timer());

        yield put(actions.findFirstPathsSuccess({ paths, searchable }));
    } catch(error) {
        yield delay(timer());
        yield put(actions.findFirstPathsError());
    }
}

export function* findNextPath() {
    const timer: () => number = yield call(helpers.setLoadingTimer);
    try {
        const { path } : StoreState  = yield select();

        if (!path.searchable) return;
        
        const graph: Graph = yield call(helpers.MrtGraph.getGraph);

        yield call({
            context: graph,
            fn: graph.findNextShortestPath
        });

        yield delay(timer());
        yield put(actions.findNextPathSuccess(graph.shortestPaths));
    } catch(error) {
        yield delay(timer());
        yield put(actions.findNextPathError());
    }
}

export function* refreshPaths() {
    const { path } : StoreState = yield select();
    const { from, to } = path;

    if (from && to) {
        yield put(actions.findFirstPaths({
            from,
            to,
            forced: true
        }));
    }
}

export function* switchDestinations() {
    const { path } : StoreState = yield select();
    const { from, to } = path;

    if (from && to) {
        yield put(actions.findFirstPaths({
            from: to,
            to: from
        }));
    }
}