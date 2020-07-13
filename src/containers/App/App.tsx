import _cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import { connect } from 'react-redux';

import './App.scss';
import { SocketIO } from 'services';
import {
    fetchStations,
    findFirstPaths,
    initTrainInformationListener,
    refreshPaths,
} from 'actions';
import { SearchResult } from 'containers/SearchResult';
import { Map } from 'containers/Map';
import {SearchInput  } from 'components/SearchInput';
import { SpinnerLoader, SpinnerLoaderTypes } from 'components/SpinnerLoader';

import { StoreState } from 'reducers';
import { AppProps, AppState } from './types';

const INITIAL_STATE: AppState = {
    from: '',
    fromError: false,
    to: '',
    toError: false
}

export class _App extends React.PureComponent<AppProps, AppState> {
    state = INITIAL_STATE;

    constructor(props: AppProps) {
        super(props);
        SocketIO.getSocket();
    }

    componentDidMount() {
        this.props.initTrainInformationListener();
        this.props.fetchStations();
    }

    componentDidUpdate(prevProps: AppProps) {
        if (prevProps.updates && this.props.updates > prevProps.updates) {
            this.props.refreshPaths();
        }
    }

    getNewState = (): AppState => _cloneDeep(this.state);

    onStationSelect = (name: string, value: string) => {
        if (name !== 'from' && name !== 'to') {
            return;
        }

        const state = this.getNewState();
        const { from, to } = state;

        state[name] = value;
        if (name === 'from' && value === to) {
            state.to = '';
        }

        this.setState(state, () => {
            if (name === 'to' && from) {
                this.onSubmit();
            }
        });
    }

    validateForm = (): boolean => {
        const state = this.getNewState();
        const errors = {
            fromError: false,
            toError: false
        };
        let hasError = false;

        if (!state.from) {
            errors.fromError = true;
            hasError = true;
        }

        if (!state.to) {
            errors.toError = true;
            hasError = true;
        }
        
        this.setState({ ...state, ...errors });
        
        return !hasError;
	}
    
    onSubmit = (e?: React.FormEvent): void => {
        if (e) e.preventDefault();

        if (!this.validateForm()) return;

        const { from, to } = this.state;
        this.props.findFirstPaths({ from, to });
    }

    render() {
        const {
            to,
            toError,
            from,
            fromError
        } = this.state;
        const { stations, updates } = this.props;

        return (
            <div className='App'>
                <SpinnerLoader
                    show={!updates}
                    type={SpinnerLoaderTypes.circle}
                />

				<form onSubmit={this.onSubmit}>
					<p>From</p>
					<SearchInput
						placeholder='Select...'
						name='from'
						options={stations}
						value={from}
						onSelect={this.onStationSelect}
						error={fromError}
					/>

					<p>To</p>
					<SearchInput
						name='to'
						options={stations}
						value={to}
						exclude={from}
						onSelect={this.onStationSelect}
						error={toError}
					/>

					<button type='submit' onClick={this.onSubmit}>
						<i className='fas fa-search'/>
					</button>
				</form>

				<div className='result'>
					<SearchResult/>
					<Map/>
				</div>	
			</div>
        );
    }
}

const mapStateToProps = ({ station, train, path }: StoreState) => ({
    updates: train.updates,
    stations: station.stations,
});

export default connect(
    mapStateToProps,
    {
        fetchStations,
        findFirstPaths,
        initTrainInformationListener,
        refreshPaths,
    }
)(_App);