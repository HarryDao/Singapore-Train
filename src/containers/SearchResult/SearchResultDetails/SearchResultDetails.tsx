import React from 'react';
import './SearchResultDetails.scss';
import { SearchResultDetailsItem } from './SearchResultDetailsItem';

import { Frequencies, ConvertedPath } from 'helpers';

interface SearchResultDetailsProps {
    timeBtw2Stations: number;
    timeSwitchBtw2Lines: number;
    frequencies: Frequencies;
    from: string;
    to: string;
    loading: boolean;
    path: ConvertedPath;
    activeTrip: number;
    changeActiveTrip: (e: React.MouseEvent<HTMLButtonElement>) => any;  
}

export class SearchResultDetails extends React.PureComponent<SearchResultDetailsProps> {
    render() {
        const {
            timeBtw2Stations,
            timeSwitchBtw2Lines,
            frequencies,
            from,
            to,
            loading,
            path,
            activeTrip,
            changeActiveTrip,
        } = this.props;

        const trips = path && path.trips;
        const trip = trips && trips[activeTrip];

        let innerClass = 'inner';
        if (loading) innerClass += ' hide';

        return (
            <div className='SearchResultDetails'>
                <div className={innerClass}>
                    {trips && trips.length > 1 && (
                        <div className={`switch-trip ${activeTrip && 'prev'}`}>
                            <button onClick={changeActiveTrip}>
                                {activeTrip === 0 && (
                                    <>
                                        Next <i className='fas fa-arrow-right'/>
                                    </>
                                )}
                                {activeTrip === 1 && (
                                    <>
                                        <i className='fas fa-arrow-left'/> Back
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    <div className='trip-information'>
                        {trip && trip.map((split, index) => {
                            const key = `${from}-${to}-${activeTrip}-${index}`;
                            return (
                                <SearchResultDetailsItem
                                    key={key}
                                    index={index}
                                    line={split.line}
                                    stations={split.stations}
                                    timeBtw2Stations={timeBtw2Stations}
                                    timeSwitchBtw2Lines={timeSwitchBtw2Lines}
                                    frequencies={frequencies}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}