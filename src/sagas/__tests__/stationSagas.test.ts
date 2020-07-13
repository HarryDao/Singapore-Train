import { all, call, put } from 'redux-saga/effects';

import { fetchStations } from '../stationSagas';
import * as actions from 'actions';
import * as apis from 'apis';
import { apiData } from 'tests';
import { MrtGraph } from 'helpers';

const { stations, lines } = apiData;

describe('sagas/stationSagas', () => {
    describe('fetchStations', () => {
        let generator: Generator;

        beforeEach(() => {
            generator = fetchStations();
            expect(generator.next().value).toEqual(
                all([
                    call(apis.fetchStations),
                    call(apis.fetchMRTLines)
                ])
            );

        });

        it('work fine when no error', () => {
            expect(generator.next([ stations, lines ]).value).toEqual(
                call(MrtGraph.getGraph, stations)
            );

            expect(generator.next().value).toEqual(
                put(actions.fetchStationsSuccess(stations, lines))
            );
        });

        it('can handle error', () => {
            expect(generator.throw(1).value).toEqual(
                put(actions.fetchStationsError())
            );
        });
    });
});