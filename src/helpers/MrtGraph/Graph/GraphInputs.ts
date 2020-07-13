import _isEqual from 'lodash/isEqual';

export interface ValidateOutput {
    needReset: boolean;
    isValid: boolean;
}

interface IsFrequencies {
    [key: string]: number;
}

export class GraphInputs<F extends IsFrequencies> {
    public start?: string;
    public end?: string;
    public timeBtw2Stations?: number;
    public timeSwitchBtw2Lines?: number;
    public frequencies?: F;

    validateAndUpdateInputs(
        start?: string,
        end?: string,
        timeBtw2Stations?: number,
        timeSwitchBtw2Lines?: number,
        frequencies?: F
    ): ValidateOutput {
        if (start === undefined) {
            start = this.start;
        }

        if (end === undefined) {
            end = this.end;
        }

        if (timeBtw2Stations === undefined) {
            timeBtw2Stations = this.timeBtw2Stations;
        }

        if (timeSwitchBtw2Lines === undefined) {
            timeSwitchBtw2Lines = this.timeSwitchBtw2Lines;
        }

        if (frequencies === undefined) {
            frequencies = this.frequencies;
        }

        const needReset = this.start !== start ||
            this.end !== end ||
            !_isEqual(this.frequencies, frequencies) ||
            this.timeSwitchBtw2Lines !== timeSwitchBtw2Lines ||
            this.timeBtw2Stations !== timeBtw2Stations;
        
        this.start = start;
        this.end = end;
        this.timeBtw2Stations = timeBtw2Stations;
        this.timeSwitchBtw2Lines = timeSwitchBtw2Lines; 
        this.frequencies = frequencies;

        const isValid = !!(
            this.start &&
            this.end &&
            this.frequencies &&
            this.timeSwitchBtw2Lines !== undefined &&
            this.timeBtw2Stations !== undefined
        );

        return { needReset, isValid }   
    }
}