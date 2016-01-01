import {Injectable} from 'angular2/core';

import {VitalitySquaresSettingsService, VitalitySquaresSettings, VitalitySquareItem} from './vitalitySquaresSettingsService';

export class VitalitySquare {
    squareType: string;
}

@Injectable()
export class VitalitySquaresGameService {

    constructor(vitalitySquaresSettingsService: VitalitySquaresSettingsService) {
        this.vitalitySquaresSettingsService = vitalitySquaresSettingsService;
    }

    private vitalitySquaresSettingsService: VitalitySquaresSettingsService; 

    getRemainingSelections() : number {
        return this.vitalitySquaresSettingsService.getSettings().remainingSelections;
    }

    createVitalitySquares(): Array<VitalitySquare> {
        var totalVitalitySquares = this.vitalitySquaresSettingsService.getTotalItems();

        var vitalitySquares = [];

        for (var i = 0; i < totalVitalitySquares; i++) {
            vitalitySquares.push({ squareType: 'blank' });
        }

        return vitalitySquares;
    }

    getRandomRemainingVitalitySquare(): VitalitySquare {

        var settings = this.vitalitySquaresSettingsService.getSettings(),
            totalRemainingItems = this.vitalitySquaresSettingsService.getTotalRemainingItems();

        var randomSquare = Math.floor(Math.random() * totalRemainingItems);

        var currentRemaining = 0;

        var vitalitySquare: VitalitySquare;

        for (let gridItem of settings.gridItems) {
            currentRemaining += gridItem.remaining;

            if (randomSquare < currentRemaining) {

                vitalitySquare = { squareType: gridItem.name };

                gridItem.remaining--;

                break;
            }
        }

        return vitalitySquare;
    }
}