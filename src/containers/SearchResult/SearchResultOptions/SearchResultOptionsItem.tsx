import React from 'react';

interface SearchResultOptionsItemProps {
    time: number,
    lines: number,
    stations: number,
    index: number,
    activeOption: number;
    onOptionClick: (index: number) => any;
}

export class SearchResultOptionsItem extends React.PureComponent<
    SearchResultOptionsItemProps
> {
    onClick = () => {
        this.props.onOptionClick(this.props.index);
    }

    render() {
        const { time, lines, stations, index, activeOption } = this.props;
        let className = `SearchResultOptionsItem`;

        if (index === activeOption) {
            className += ' active';
        }

        return (
            <tr
                className={className}
                onClick={this.onClick}
            >
                <td className='check'><i className='fas fa-check'/></td>
                <td className='time'>
                    <span className='number'>{time}</span> min
                </td>
                <td className='stations'>{stations}</td>
                <td className='transfers'>{lines - 1}</td>
            </tr>
        );
    }
}