import React from 'react';
import './SearchResultOptions.scss';
import { SearchResultOptionsItem } from './SearchResultOptionsItem';
import { SpinnerLoader, SpinnerLoaderTypes } from 'components/SpinnerLoader';
import { Slide } from 'components/Slide';

import { ConvertedPath } from 'helpers';

interface SearchResultOptionsProps {
    searchable: boolean;
    loading: boolean;
    nextLoading: boolean;
    paths: ConvertedPath[]; 
    activeOption: number;
    onOptionClick: (index: number) => any;
    onNextClick: () => any;
}

interface SearcResultOptionsState {
    showNoMore: boolean;
}

const INITIAL_STATE: SearcResultOptionsState = {
    showNoMore: false,
}

export class SearchResultOptions extends React.PureComponent<
    SearchResultOptionsProps,
    SearcResultOptionsState
> {
    state = INITIAL_STATE

    componentDidUpdate() {
        if (!this.props.searchable && this.state.showNoMore) {
            this.hideNoMore();
        }
    }

    hideNoMore = () => {
        setTimeout(() => {
            this.setState({ showNoMore: false });
        }, 2000);
    }

    onClick = () => {
        const { onNextClick } = this.props;

        if (!this.state.showNoMore) {
            this.setState({ showNoMore: true }, onNextClick);
        } else {
            onNextClick();
        }
    }

    renderNoRoute() {
        const { loading, paths } = this.props;
        if (!paths.length && !loading) {
            return (
                <div className='no-route'>
                    No route found!
                </div>
            );
        }
    }

    renderNextButton() {
        const { searchable, nextLoading } = this.props;

        return (
            <Slide
                show={searchable}
                className='next'
                tag='div'
            >
                <SpinnerLoader
                    show={nextLoading}
                    transparent
                />

                {searchable && (
                    <button
                        className={`next-button ${nextLoading ? 'hide' : ''}`}
                        type='button'
                        onClick={this.onClick}
                    >
                        Find next route
                    </button>
                )}
            </Slide>
        );
    }

    renderNoMore() {
        const { searchable } = this.props;
        const { showNoMore } = this.state;

        return (
            <Slide
                show={!searchable && showNoMore}
                tag='p'
                className='no-more'
                animateOnOpen={false}
            >
                No more route found
            </Slide>
        );
    }

    render() {
        const {
            loading,
            paths,
            activeOption,
            onOptionClick,
        } = this.props;

        let innerClass = 'inner';
        if (loading) innerClass += ' hide';

        return (
            <div className='SearchResultOptions'>
                <SpinnerLoader
                    show={loading}
                    type={SpinnerLoaderTypes.circle}
                    transparent
                />
                <div className={innerClass}>
                    {paths.length ? (
                        <table>
                            <thead>
                                <tr>
                                    <th className='check'></th>
                                    <th className='time'>TOTAL TIME</th>
                                    <th className='stations'>STATIONS</th>
                                    <th className='transfers'>TRANSFERS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paths.map((path, index) => {
                                    const { stations, lines, time } = path;
                                    const key = `${stations[0]}-${stations[stations.length - 1]}-${index}`;
                                    return (
                                        <SearchResultOptionsItem
                                            key={key}
                                            index={index}
                                            activeOption={activeOption}
                                            lines={lines}
                                            stations={stations.length}
                                            time={time}
                                            onOptionClick={onOptionClick}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : null}
        
                    {this.renderNoRoute()}
                    {this.renderNextButton()}
                    {this.renderNoMore()}
                </div>
            </div>     
        );
    };
}