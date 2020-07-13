import React from 'react';

import { Fade } from 'components/Fade';
import './SearchInput.scss';
import { SearchInputOption } from './SearchInputOption';

import {
    SearchInputProps,
    SearchInputState,
    SearchInputOptionRef,
    SearchInputOptionType
} from './types';

const INITIAL_STATE: SearchInputState = {
    filteredOptions: [],
    show: false,
    input: '',
    activeOption: 0,
}

export class _SearchInput extends React.PureComponent<
    SearchInputProps,
    SearchInputState
> {
    state = INITIAL_STATE;
    private mappedOptions: { [option: string]: number } = {};
    private input: (HTMLInputElement | null) = null;
    private optionList: (HTMLElement | null) = null;
    private activeInputOption: (SearchInputOptionRef | null) = null;
    
    componentDidMount() {
        this.setState(
            { input: this.props.value },
            this.filterOptionsByInput
        );
    }

    componentDidUpdate(prevProps: SearchInputProps) {
        const { options, exclude, value } = this.props;

        if (!value && prevProps.value) {
            this.setState({ input: value });
            this.resetOptions();
            this.onSearchFocus();
        } else if (prevProps.options !== options) {
            this.filterOptionsByInput();
        } else if (prevProps.exclude !== exclude) {
            this.filterOptionsByInput();
            this.onSearchFocus();
        }
    }

    filterOptionsByInput = (): void => {
        const { options, exclude } = this.props;
        const { input } = this.state;

        const filteredOptions = Object.keys(options).filter(option => {
            if (exclude && option === exclude) return false;
            return !input || option.toLowerCase().includes(input.toLowerCase());
        });

        filteredOptions.forEach((option, index) => {
            this.mappedOptions[option] = index;
        });

        this.setState({ filteredOptions, activeOption: 0 });
    }

    onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (this.state.input !== e.target.value) {
            this.setState(
                { input: e.target.value },
                this.filterOptionsByInput
            );
        }
    }

    onSearchFocus = (): void => {
        this.setState({ show: true });
        
        if (this.input) {
            this.input.focus();
            this.input.select();
        }
    }

    onSearchBlur = () => {
        this.setState({ show: false });
    }

    onOptionClick = (option: SearchInputOptionType) => {
        const { name, onSelect } = this.props;
        onSelect(name, option);

        this.setState({ input: option });
        setTimeout(this.resetOptions, 300);
    }

    resetOptions = () => {
        const { options, exclude } = this.props;
        let filteredOptions = Object.keys(options);

        if (exclude) {
            filteredOptions = filteredOptions.filter(option => option !== exclude);
        }

        this.setState({ filteredOptions, activeOption: 0 });
    }

    onOptionHover = (option: SearchInputOptionType) => {
        if (this.mappedOptions) {
            this.setState({ activeOption: this.mappedOptions[option] });
        }
    }

    onKeyDown = (e: React.KeyboardEvent) => {
        const { keyCode } = e;
        const { activeOption, filteredOptions } = this.state;

        if (keyCode === 13) {
            e.preventDefault();
            this.onOptionClick(filteredOptions[activeOption]);
            if (this.input) this.input.blur();
            return;
        }

        const isPlus = keyCode === 40 && activeOption < filteredOptions.length - 1;
        const isMinus = keyCode === 38 && activeOption > 0;

        if (isPlus || isMinus) {
            this.setState(({ activeOption }) => ({
                activeOption: activeOption + (isPlus ? 1 : -1)
            }), this.scrollToActiveOption);
        }
    }

    scrollToActiveOption = () => {
        const { optionList, activeInputOption } = this;

        if (!optionList || !activeInputOption) return;

        const { scrollTop, offsetHeight } = optionList;
        const { offsetTop, clientHeight } = activeInputOption;
        const bottom = offsetTop + clientHeight;

        if (offsetTop < scrollTop) {
            optionList.scrollTop = offsetTop;
        }

        if (bottom > scrollTop + offsetHeight) {
            optionList.scrollTop = bottom - offsetHeight;
        }
    }

    renderOptions = () => {
        const { name } = this.props;
        const { activeOption, filteredOptions } = this.state;

        if (!filteredOptions.length) {
            return (
                <li className='no-option'>No options</li>
            );
        }

        return filteredOptions.map((option, index) => (
            <SearchInputOption
                ref={active => {
                    if (index === activeOption) {
                        this.activeInputOption = active;
                    }
                }}
                key={`${name}-${option}`}
                option={option}
                onClick={this.onOptionClick}
                active={index === activeOption}
                onHover={this.onOptionHover}
            />
        ));
    }

    render() {
        const { placeholder, error } = this.props;
        const { show, input } = this.state;
        const className = `SearchInput ${show ? 'show' : ''} ${error ? 'error': ''}`;

        return (
            <div
                className={className}
                onKeyDown={this.onKeyDown}
            >
                <div
                    className='input-wrapper'
                    onClick={this.onSearchFocus}
                    onBlur={this.onSearchBlur}
                >
                    <input
                        type='text'
                        ref={input => this.input = input}
                        placeholder={placeholder || 'Select...'}
                        value={input}
                        onChange={this.onInputChange}
                    />
                    <div className='arrow'>
                        <div className='inner'>
                            <i className='fas fa-chevron-down'/>
                        </div>
                    </div>
                </div>

                <div className='choices'>
                    <Fade
                        show={show}
                        tag='ul'
                        forwardedRef={ref => this.optionList = ref}
                    >
                        {this.renderOptions()}
                    </Fade>
                </div>
            </div>
        );
    }
}

export default _SearchInput;