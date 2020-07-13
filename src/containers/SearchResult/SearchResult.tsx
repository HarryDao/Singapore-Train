import _isEqual from 'lodash/isEqual';
import React from 'react';
import { connect } from 'react-redux';
import './SearchResult.scss';
import { SearchResultDestinations } from './SearchResultDestinations';
import { SearchResultOptions } from './SearchResultOptions';
import { SearchResultDetails } from './SearchResultDetails';
import {
    findNextPath,
    switchDestinations,
    changeActivePath,
    changeActiveTrip
} from 'actions';
import { stringifyTime } from 'helpers';

import { SearchResultProps } from './types';
import { StoreState } from 'reducers';

class _SearchResult extends React.PureComponent<
    SearchResultProps
> {
    render() {
        const {
            loading,
            paths,
            from,
            to,
            timeBtw2Stations,
            timeSwitchBtw2Lines,
            frequencies,
            firstTrain,
            lastTrain,
            switchDestinations,
            switchLoading,
            searchable,
            nextLoading,
            activePath,
            activeTrip,
            changeActivePath,
            changeActiveTrip,
            findNextPath,
        } = this.props;
        const className = `SearchResult ${from && to ? 'active' : ''}`;
        const isTrainInformationAvailable = !_isEqual(frequencies, {});

        return (
            <div className={className}>   
                {!isTrainInformationAvailable&& (
                    <div className='off-service'>
                        <img src='./closed.png' alt='closed'/>
                        <p>Sorry, no train is available at the moment</p>
                        <p>Singapore MRT only operates from <span>{stringifyTime(firstTrain)}</span> to <span>{stringifyTime(lastTrain)}</span> local time daily.</p>
                    </div>
                )}

                {isTrainInformationAvailable && (
                    <div className='inner'>
                        <div className='general'>
                            <SearchResultDestinations
                                from={from}
                                to={to}
                                onSwitchClick={switchDestinations}
                                switching={switchLoading}
                            />

                            <SearchResultOptions
                                paths={paths}
                                activeOption={activePath}
                                onOptionClick={changeActivePath}
                                loading={loading}
                                searchable={searchable}
                                onNextClick={findNextPath}
                                nextLoading={nextLoading}
                            />
                        </div>

                        <SearchResultDetails
                            path={paths[activePath]}
                            activeTrip={activeTrip}
                            changeActiveTrip={changeActiveTrip}
                            from={from}
                            to={to}
                            loading={loading}
                            timeBtw2Stations={timeBtw2Stations}
                            timeSwitchBtw2Lines={timeSwitchBtw2Lines}
                            frequencies={frequencies}
                        />
                    </div>
                )}
            </div>
        );
    }
}


const mapStateToProps = ({ path, train }: StoreState) => {
    return {
        from: path.from,
        to: path.to,
        loading: path.loading,
        paths: path.paths,
        error: path.error,
        switchLoading: path.switchLoading,
        searchable: path.searchable,
        nextLoading: path.nextLoading,
        activePath: path.activePath,
        activeTrip: path.activeTrip,
        timeBtw2Stations: train.timeBtw2Stations,
        timeSwitchBtw2Lines: train.timeSwitchBtw2Lines,
        frequencies: train.frequencies,
        firstTrain: train.firstTrain,
        lastTrain: train.lastTrain,
    };
}

export default connect(
    mapStateToProps,
    {
        findNextPath,
        switchDestinations,
        changeActivePath,
        changeActiveTrip
    },
)(_SearchResult);