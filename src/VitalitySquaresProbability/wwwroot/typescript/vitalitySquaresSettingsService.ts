/// <reference path="./../../node_modules/angular2/angular2.d.ts" />

import {Injectable} from 'angular2/angular2';

export class VitalitySquareItem {
    name: string;
    total: number;
    remaining: number;
}

export class VitalitySquaresSettings{
    remainingSelections: number;
    gridItems: Array<VitalitySquareItem>;
}

@Injectable()
export class VitalitySquaresSettingsService {

    constructor() {
        this.vitalitySquaresSettings = {
            remainingSelections: 6,
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
    }

    vitalitySquaresSettings: VitalitySquaresSettings;

    getSettings(): VitalitySquaresSettings {

        return this.vitalitySquaresSettings;
    }

    getTotalRemainingItems(): number {
        var totalRemaining = 0;

        for (var item of this.vitalitySquaresSettings.gridItems) {
            totalRemaining += item.remaining;
        }

        return totalRemaining;
    }
}