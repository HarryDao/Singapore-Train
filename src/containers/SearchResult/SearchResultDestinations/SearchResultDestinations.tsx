import React, { memo } from 'react';
import './SearchResultDestinations.scss';

interface SearchResultDestinationsProps {
    from: string;
    to: string;
    onSwitchClick: (e: React.MouseEvent<HTMLButtonElement>) => any;
    switching: boolean;
}

const _SearchResultDestinations: React.FunctionComponent<
    SearchResultDestinationsProps
> = ({
    from,
    to,
    onSwitchClick,
    switching
}) => {
    return (
        <div className='SearchResultDestinations'>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div>
                                A
                            </div>
                        </td>
                        <td>
                            {from}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                B
                            </div>
                        </td>
                        <td>
                            {to}
                        </td>
                    </tr>

                    <tr>
                        <td/>
                        <td/>
                    </tr>
                </tbody>
            </table>

            <button
                className={`switch ${switching ? 'switching' : ''}`}
                onClick={onSwitchClick}
            >
                <i className='fas fa-sync'/>
            </button>
        </div>
    );
}

export const SearchResultDestinations = memo(_SearchResultDestinations);