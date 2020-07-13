import { FetchStationsData } from 'apis';
import {
    FetchStationsAction,
    FindFirstPathsAction,
    RefreshPathsAction,
    InitTrainInformationListenerAction
} from 'actions';

export interface AppProps {
    updates: number;
    stations: FetchStationsData;
    fetchStations: () => FetchStationsAction;
    findFirstPaths: (
        { from, to }: { from: string, to: string }
    ) => FindFirstPathsAction,
    initTrainInformationListener: () => InitTrainInformationListenerAction;
    refreshPaths: () => RefreshPathsAction
}

export interface AppState {
    from: string;
    fromError: boolean;
    to: string;
    toError: boolean;
}