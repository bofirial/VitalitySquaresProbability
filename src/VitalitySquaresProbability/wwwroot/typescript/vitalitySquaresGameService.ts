import {Injectable} from 'angular2/core';

import {VitalitySquaresSettingsService, VitalitySquaresSettings, VitalitySquareItem} from './vitalitySquaresSettingsService';

export class VitalitySquare {
    color: string;
    icon: string;
}

@Injectable()
export class VitalitySquaresGameService {

    constructor(vitalitySquaresSettingsService: VitalitySquaresSettingsService) {
        this.vitalitySquaresSettingsService = vitalitySquaresSettingsService;
    }

    private blankIcon: string = 'flaticon-question30';

    private vitalitySquaresSettingsService: VitalitySquaresSettingsService; 

    getVitalitySquaresSettings(): VitalitySquaresSettings {
        return this.vitalitySquaresSettingsService.getSettings();
    }

    createVitalitySquares(): Array<VitalitySquare> {
        var totalVitalitySquares = this.vitalitySquaresSettingsService.getTotalItems();

        var vitalitySquares = [];

        for (var i = 0; i < totalVitalitySquares; i++) {
            vitalitySquares.push({
                color: '',
                icon: this.blankIcon
            });
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

                vitalitySquare = {
                    color: gridItem.color,
                    icon: gridItem.icon
                };

                gridItem.remaining--;

                break;
            }
        }

        settings.remainingSelections--;
        
        this.vitalitySquaresSettingsService.saveSettings(settings);

        return vitalitySquare;
    }

    resetGameBoard(): void {
        var settings = this.vitalitySquaresSettingsService.getSettings();

        for (let gridItem of settings.gridItems) {
            gridItem.remaining = gridItem.total;
        }

        settings.remainingSelections = settings.totalSelections;

        this.vitalitySquaresSettingsService.saveSettings(settings);
    }

    subscribeToUpdates(callback: (vitalitySquaresSettings: VitalitySquaresSettings) => void): void {
        this.vitalitySquaresSettingsService.subscribeToUpdates((vitalitySquareSettings) => {
            callback(vitalitySquareSettings);
        });
    }
}