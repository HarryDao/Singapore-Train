import { ActionTypes } from './types';
import {
    FetchStationsData,
    FetchMRTLinesData
} from 'apis';

export interface FetchStationsAction {
    type: ActionTypes.fetchStations
};
export const fetchStations = (): FetchStationsAction => ({
    type: ActionTypes.fetchStations
});


export interface FetchStationsSuccessAction {
    type: ActionTypes.fetchStationsSuccess,
    payload: {
        stations: FetchStationsData,
        lines: FetchMRTLinesData
    }
}
export const fetchStationsSuccess = (
    stations: FetchStationsData,
    lines: FetchMRTLinesData
): FetchStationsSuccessAction => ({
    type: ActionTypes.fetchStationsSuccess,
    payload: { stations, lines }
});


export interface FetchStationsErrorAction {
    type: ActionTypes.fetchStationsError
}
export const fetchStationsError = (): FetchStationsErrorAction => ({
    type: ActionTypes.fetchStationsError
});