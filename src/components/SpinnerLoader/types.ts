import { Properties } from 'csstype';

export enum SpinnerLoaderTypes {
    circle = 'circle'
}

export interface SpinnerLoaderProps {
    type?: SpinnerLoaderTypes;
    show?: boolean;
    size?: number;
    color?: string;
    duration?: number;
    style?: Properties;
    coverScreen?: boolean;
    transparent?: boolean;
    position?: string;
}