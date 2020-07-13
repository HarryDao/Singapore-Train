import { cloneDeep } from 'lodash';
import { call, put, select, delay } from 'redux-saga/effects';

import {
    findFirstPaths,
    findNextPath,
    refreshPaths,
    switchDestinations
} from '../pathSagas';
import * as helpers from 'helpers';
import {
    ActionTypes,
    findFirstPathsSuccess,
    findFirstPathsError,
    findNextPathSuccess,
    findNextPathError,
    findFirstPaths as findFirstPathsAction,
} from 'actions';
import { inputs, paths } from 'tests';
import { INITIAL_STATE, StoreState } from 'reducers';
import { NUMBER_OF_SEARCH_RESULTS } from 'configs';

const { start, end } = inputs;

describe('sagas/pathSagas', () => {
    let generator: Generator;
    let state: StoreState;
    const graphFake = {
        shortestPaths: paths,
        findNextShortestPath: jest.fn()
    }

    beforeEach(() => {
        state = cloneDeep(INITIAL_STATE);
    });

    describe('findFirstPaths', () => {
        beforeEach(() => {
            generator = findFirstPaths({
                type: ActionTypes.findFirstPaths,
                payload: {
                    from: start,
                    to: end
                }
            });

            expect(generator.next().value).toEqual(select());
            
            expect(generator.next({
                train: state.train
            }).value).toEqual(call(helpers.setLoadingTimer));
            expect(generator.next(() => 1).value).toEqual(
                call(helpers.MrtGraph.getGraph)
            );
        });

        it('should work when no error', () => {
            for (let i = 1; i <= NUMBER_OF_SEARCH_RESULTS; i++) {
                expect(generator.next(graphFake).value).toEqual(call(
                    {
                        context: graphFake,
                        fn: graphFake.findNextShortestPath
                    },
                    start,
                    end,
                    state.train.timeBtw2Stations,
                    state.train.timeSwitchBtw2Lines,
                    state.train.frequencies
                ));
            }

            expect(generator.next().value).toEqual(
                delay(1)
            );
            expect(generator.next().value).toEqual(
                put(findFirstPathsSuccess({ paths, searchable: true }))
            )
        });

        it('should not search if inputs are unchanged', () => {
            expect(generator.next({
                ...graphFake,
                start,
                end,
            }).value).toEqual(delay(1));
        });

        it('should handle error correctly', () => {
            expect(generator.throw(1).value).toEqual(delay(1));
            expect(generator.next().value).toEqual(
                put(findFirstPathsError())
            );
        });
    });

    describe('findNextPath', () => {
        let generator: Generator;

        beforeEach(() => {
            generator = findNextPath();
            expect(generator.next().value).toEqual(
                call(helpers.setLoadingTimer)
            );
            expect(generator.next(() => 1).value).toEqual(
                select()
            );
        });

        it('do nothing if NOT searchable', () => {
            expect(generator.next({
                path: { searchable: false }
            }).done).toBeTruthy();
        });

        it('should work when no error', () => {
            expect(generator.next({
                path: { searchable: true }
            }).value).toEqual(
                call(helpers.MrtGraph.getGraph)
            );

            expect(generator.next(graphFake).value).toEqual(
                call({
                    context: graphFake,
                    fn: graphFake.findNextShortestPath
                })
            );

            expect(generator.next().value).toEqual(delay(1));
            expect(generator.next().value).toEqual(
                put(findNextPathSuccess(graphFake.shortestPaths))
            );
        });

        it('should handle error correctly', () => {
            expect(generator.throw(1).value).toEqual(delay(1));
            expect(generator.next().value).toEqual(
                put(findNextPathError())
            );
        });
    });

    describe('refreshPaths', () => {
        let generator: Generator;

        beforeEach(() => {
            generator = refreshPaths();
            expect(generator.next().value).toEqual(select());
        });

        it('do nothing when no from or to', () => {
            expect(generator.next({ path: {} }).done).toBeTruthy();
        });

        it('work when from & to are available', () => {
            expect(generator.next({
                path: { from: '1', to: '2' } 
            }).value).toEqual(
                put(findFirstPathsAction({
                    from: '1',
                    to: '2',
                    forced: true
                }))
            );
        });
    });

    describe('switchDestination', () => {
        let generator: Generator;

        beforeEach(() => {
            generator = switchDestinations();
            expect(generator.next().value).toEqual(select());
        });

        it('do nothing when from or to is not available', () => {
            expect(generator.next({ path: {} }).done).toBeTruthy();
        });

        it('work when from & to are available', () => {
            expect(generator.next({
                path: { from: '1', to: '2' } 
            }).value).toEqual(
                put(findFirstPathsAction({
                    from: '2',
                    to: '1',
                }))
            );
        });
    });
});