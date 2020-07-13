import React, { memo, useState } from 'react';
import {
    SearchInputOptionProps,
    SearchInputOptionRef
} from './types';

const _SearchInputOption = React.forwardRef<
    SearchInputOptionRef,
    SearchInputOptionProps
>((props, ref) => {
    const {
        option,
        onClick,
        active,
        onHover
    } = props;

    const [within, setWithin] = useState(false);

    return (
        <li
            ref={ref}
            className={active ? 'active' : ''}
            onClick={() => onClick(option)}
            onMouseMove={() => {
                if (!within) {
                    onHover(option);
                    setWithin(true);
                }
            }}
            onMouseOut={() => setWithin(false)}
        >
            {option}
        </li>
    );
});

export const SearchInputOption = memo(_SearchInputOption);