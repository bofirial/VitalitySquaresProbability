import {Injectable} from 'angular2/core';

import {VitalitySquare, FlatIcons} from './vitalitySquareCore';
import {VitalitySquaresSettingsService, VitalitySquaresSettings} from './vitalitySquaresSettingsService';

@Injectable()
export class VitalitySquaresGameService {

    constructor(vitalitySquaresSettingsService: VitalitySquaresSettingsService) {
        this.vitalitySquaresSettingsService = vitalitySquaresSettingsService;
    }

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
                icon: FlatIcons.QuestionMark
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

        for (let gridItem of settings.vitalitySquareConfigurations) {
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

        this.vitalitySquaresSettingsService.resetSettings();
    }

    subscribeToUpdates(callback: (vitalitySquaresSettings: VitalitySquaresSettings) => void): void {
        this.vitalitySquaresSettingsService.subscribeToUpdates((vitalitySquareSettings) => {
            callback(vitalitySquareSettings);
        });
    }
}