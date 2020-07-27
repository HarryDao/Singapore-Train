import React, { memo, FunctionComponent } from 'react';
import { ColorizedElementProps } from './types';
import { MRT_LINES } from 'configs';

export const _ColorizedElement: FunctionComponent<
    ColorizedElementProps
> = (props: ColorizedElementProps) => {  
    let {
        line,
        tag = 'div',
        className = '',
        css,
        style = {},
        children,
        ...otherProps
    } = props;

    const lineData = MRT_LINES[line];
    const Tag = tag;

    if (!css) {
        css = [];
    }
    if (!Array.isArray(css)) {
        css = [css]
    }

    css.forEach(prop => {
        style[prop] = lineData.color;
        if (prop === 'background' || prop === 'background-color') {
            style.color = 'white';
        }
    });

    return (
        <Tag
            className={className}
            style={style}
            {...otherProps}
        >
            {children}
        </Tag>
    );
}

export default memo(_ColorizedElement);