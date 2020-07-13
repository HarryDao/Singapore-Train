import React, { memo } from 'react';
import { PulseLoader, ClipLoader } from 'react-spinners';
import './SpinnerLoader.scss';
import { SpinnerLoaderProps, SpinnerLoaderTypes } from './types';
import { Fade } from 'components/Fade';

export const _SpinnerLoader: React.SFC<SpinnerLoaderProps> = ({
    type,
    show, 
    size, 
    color,
    duration,
    style,
    coverScreen,
    transparent,
    position,
}) => {
    let className = 'SpinnerLoader';

    if (coverScreen) {
        className += ' cover-screen';
    }

    if (transparent) {
        className += ' transparent';
    }

    if (position === 'top') {
        className += ' top';
    } else if (position === 'bottom') {
        className += ' bottom';
    }

    let Tag, loaderSize;

    switch(type) {
        case SpinnerLoaderTypes.circle:
            Tag = ClipLoader;
            loaderSize = 40;
            break;
        default:
            Tag = PulseLoader;
            loaderSize = 7;
    }

    return (
        <Fade
            className={className}
            show={show}
            duration={duration}
            style={style}
            display='flex'
        >
            <Tag
                size={size || loaderSize}
                color={color || 'white'}
            />
        </Fade>
    );
}

export default memo(_SpinnerLoader);