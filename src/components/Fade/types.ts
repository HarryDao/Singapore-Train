import CSS from 'csstype';

export interface FadeProps {
    show?: boolean;
    children?: React.ReactNode;
    className?: string;
    duration?: number;
    tag?: React.ReactType;
    style?: CSS.Properties;
    display?: string;
    forwardedRef?: (element: HTMLElement) => void;
}