import { ReactNode } from 'react';
import { Properties } from 'csstype';

export interface SlideState {
    maxHeight: number;
}

export interface SlideProps {
    show?: boolean;
    children?: ReactNode;
    style?: Properties;
    duration?: number;
    className?: string;
    tag?: React.ReactType;
    animateOnOpen?: boolean;
    animateOnClose?: boolean;
}