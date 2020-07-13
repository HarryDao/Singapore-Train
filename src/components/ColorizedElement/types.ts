export interface ColorizedElementProps {
    line: string;
    tag?: React.ReactType;
    className?: string;
    css?: string | string[];
    style?: { [styleKey: string]: (string | number) };
    children?: JSX.Element | JSX.Element[] | string | number | (string | number)[];
}