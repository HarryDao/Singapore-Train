import { cloneDeep } from 'lodash';

import { ActionTypes } from '../types';
import {
    fetchMapData,
    fetchMapDataError,
    fetchMapDataSuccess,
} from '../mapActions';
import { apiData } from 'tests';
import { processBorderData } from 'helpers';

const {
    border,
    park,
    water,
} = apiData;

describe('actions/mapActions', () => {
    it('fetchMapData correctly', () => {
        expect(fetchMapData()).toEqual({
            type: ActionTypes.fetchMapData
        });
    });

    it('fetchMapDataSuccess correctly', () => {
        const original = cloneDeep(border);
        const modified = cloneDeep(border);
        processBorderData(modified);

        expect(fetchMapDataSuccess({
            border: original,
            park,
            water
        })).toEqual({
            type: ActionTypes.fetchMapDataSuccess,
            payload: {
                border: modified,
                park,
                water
            }
        });
    });

    it('fetchMapDataError correctly', () => {
        expect(fetchMapDataError()).toEqual({
            type: ActionTypes.fetchMapDataError
        });
    });
});