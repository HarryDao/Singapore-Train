import React, { memo } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionPhases } from 'styles/types';
import { FadeProps } from './types';

export const _Fade: React.FunctionComponent<FadeProps> = (props) => {
    const {
        show,
        children,
        className = '',
        duration = 300,
        tag = 'div',
        style = {},
        display = 'block',
        forwardedRef,
        ...otherProps
    } = props;

    const Tag = tag;
    const tagClassName = `Fade ${className}`;

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
        display: 'none',
    };
    const transitionStyles = {
        entering: { opacity: 0, display },
        entered: { opacity: 1, display },
        exiting: { opacity: 0, display },
        exited: { opacity: 0, display: 'none' },
    };

    const timeout = {
        enter: 0,
        exit: duration
    };

    return (
        <Transition in={show} timeout={timeout}>
            {(state: TransitionPhases): JSX.Element => {
                return (
                    <Tag
                        ref={forwardedRef}
                        className={tagClassName}
                        style={{
                            ...style,
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}
                        {...otherProps}
                    >
                        {children}
                    </Tag>
                );
            }}
        </Transition> 
    );
}

export default memo(_Fade);

