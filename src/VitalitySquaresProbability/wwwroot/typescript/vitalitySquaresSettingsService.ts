
import {Injectable, EventEmitter} from 'angular2/core';

import {copyObject} from './utilities';

export class VitalitySquareItem {
    name: string;
    total: number;
    remaining: number;
}

export class VitalitySquaresSettings{
    remainingSelections: number;
    totalSelections: number;
    gridItems: Array<VitalitySquareItem>;
}

@Injectable()
export class VitalitySquaresSettingsService {

    constructor() {
        this.vitalitySquaresSettings = {
            remainingSelections: 6,
            totalSelections: 6,
            gridItems: [
                {
                    name: "Fruit",
                    total: 6,
                    remaining: 6
                },
                {
                    name: "Junk Food",
                    total: 6,
                    remaining: 6
                }
            ]
        };

        this.eventEmitter = new EventEmitter(false);
    }

    private eventEmitter: EventEmitter<VitalitySquaresSettings>;

    private vitalitySquaresSettings: VitalitySquaresSettings;

    getSettings(): VitalitySquaresSettings {

        return copyObject(this.vitalitySquaresSettings);
    }

    getTotalRemainingItems(): number {
        var totalRemaining = 0;

        for (var item of this.vitalitySquaresSettings.gridItems) {
            totalRemaining += item.remaining;
        }

        return totalRemaining;
    }

    getTotalItems(): number {
        var total = 0;

        for (var item of this.vitalitySquaresSettings.gridItems) {
            total += item.total;
        }

        return total;
    }

    saveSettings(vitalitySquaresSettings: VitalitySquaresSettings): void {
        this.vitalitySquaresSettings = vitalitySquaresSettings;

        this.eventEmitter.next(this.vitalitySquaresSettings);
    } 

    subscribeToUpdates(callback : (vitalitySquareSettings: VitalitySquaresSettings) => void): void {
        this.eventEmitter.subscribe(callback);
    }
}