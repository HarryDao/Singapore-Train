export interface SearchInputState {
    filteredOptions: SearchInputOptionType[];
    show: boolean;
    input: string;
    activeOption: number;
}

export interface SearchInputProps {
    placeholder?: string;
    name: string;
    options: { [optionName: string]: any };
    value: string;
    onSelect: (name: string, option: SearchInputOptionType) => void;
    error?: boolean;
    exclude?: string;
}

export interface SearchInputOptionProps {
    option: SearchInputOptionType;
    active: boolean
    onClick: (option: SearchInputOptionType) => void;
    onHover: (option: SearchInputOptionType) => void;
}

export type SearchInputOptionType = string;
export type SearchInputOptionRef = HTMLLIElement;