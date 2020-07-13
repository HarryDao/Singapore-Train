import {
    FetchMapDataAction,
    FetchMapDataErrorAction,
    FetchMapDataSuccessAction,
} from './mapActions';
import {
    FetchStationsAction,
    FetchStationsErrorAction,
    FetchStationsSuccessAction,
} from './stationActions';
import {
    InitTrainInformationListenerAction,
    UpdateTrainInformationAction,
} from './trainActions';
import {
    FindFirstPathsAction,
    FindFirstPathSuccessAction,
    FindFirstPathsErrorAction,
    FindNextPathAction,
    FindNextPathSuccessAction,
    FindNextPathErrorAction,
    SwitchDestinationsAction,
    ChangeActivePathAction,
    ChangeActiveTripAction
} from './pathActions';

export enum ActionTypes {
    testAction = 'testAction',
    
    fetchStations = 'fetchStations',
    fetchStationsSuccess = 'fetchStationsSuccess',
    fetchStationsError = 'fetchStationsError',

    fetchMapData = 'fetchMapData',
    fetchMapDataSuccess = 'fetchMapDataSuccess',
    fetchMapDataError = 'fetchMapDataError',

    findFirstPaths = 'findFirstPaths',
    findFirstPathsSuccess = 'findFirstPathsSuccess',
    findFirstPathsError = 'findFirstPathsError',
    
    findNextPath = 'findNextPath',
    findNextPathSuccess = 'findNextPathSuccess',
    findNextPathError = 'findNextPathError',

    switchDestinations = 'switchDestinations',

    changeActivePath = 'changeActivePath',
    changeActiveTrip = 'changeActiveTrip',

    initTrainInformationListener = 'initTrainInformationListener',
    updateTrainInformation = 'updateTrainInformation',

    refreshPaths = 'refreshPaths',
}

export interface TestAction {
    type: ActionTypes.testAction
}

export type Action = TestAction |
    FetchMapDataAction |
    FetchMapDataErrorAction |
    FetchMapDataSuccessAction |
    FetchStationsAction |
    FetchStationsSuccessAction |
    FetchStationsErrorAction |
    InitTrainInformationListenerAction |
    UpdateTrainInformationAction |
    FindFirstPathsAction |
    FindFirstPathSuccessAction |
    FindFirstPathsErrorAction |
    FindNextPathAction |
    FindNextPathSuccessAction |
    FindNextPathErrorAction |
    SwitchDestinationsAction |
    ChangeActivePathAction |
    ChangeActiveTripAction;