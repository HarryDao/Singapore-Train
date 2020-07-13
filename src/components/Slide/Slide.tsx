import React from 'react';
import { SlideProps, SlideState } from './types';
const EFFICIENCY_LEVEL = 2;

export default class Slide extends React.PureComponent<
    SlideProps,
    SlideState
> {
    wrapper: HTMLElement | null = null;
    state = { maxHeight: 0 }

    componentDidMount() {
        this.updateMaxHeight();
    }

    componentDidUpdate(prevProps: SlideProps) {
        if (prevProps.show !== this.props.show) {
            this.updateMaxHeight();
        }
    }

    updateMaxHeight = () => {
        if (this.wrapper) {
            const { scrollHeight } = this.wrapper;
            this.setState({
                maxHeight: scrollHeight * EFFICIENCY_LEVEL
            });
        }
    }

    render() {
        const {
            show,
            children,
            style = {},
            duration = 300,
            className = '',
            tag = 'div',
            animateOnOpen = true,
            animateOnClose = true,
            ...otherProps
        } = this.props;

        const Tag = tag;
        const tagClassName = `Slide ${className}`;
        const efficientDuration = duration * EFFICIENCY_LEVEL;

        const addedStyle = {
            ...style,
            maxHeight: show ? `${this.state.maxHeight}px` : 0,
            overflow: 'hidden',
            opacity: show ? 1 : 0,
        }

        if (show) {
            addedStyle.transition = animateOnOpen ? `${efficientDuration}ms` : '0ms';
        } else {
            addedStyle.transition = animateOnClose ? `${efficientDuration}ms` : '0ms';
            addedStyle.margin = 0;
            addedStyle.paddingTop = 0;
            addedStyle.paddingBottom = 0;
            addedStyle.borderWidth = 0;
        }

        return (
            <Tag
                className={tagClassName}
                ref={(ref: HTMLElement) => this.wrapper = ref}
                style={addedStyle}
                {...otherProps}
            >
                {children}
            </Tag>
        );
    }
}