import { Injectable } from '@angular/core';

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

        for (let vitalitySquareConfiguration of settings.vitalitySquareConfigurations) {
            currentRemaining += vitalitySquareConfiguration.remaining;

            if (randomSquare < currentRemaining) {

                vitalitySquare = {
                    color: vitalitySquareConfiguration.color,
                    icon: vitalitySquareConfiguration.icon
                };

                vitalitySquareConfiguration.remaining--;

                break;
            }
        }

        settings.remainingSelections--;

        this.vitalitySquaresSettingsService.saveSettings(settings);

        return vitalitySquare;
    }

    selectVitalitySquare(newVitalitySquare: VitalitySquare, previousVitalitySquare: VitalitySquare): void {
        var settings = this.vitalitySquaresSettingsService.getSettings();
        
        for (let vitalitySquareConfiguration of settings.vitalitySquareConfigurations) {

            if (vitalitySquareConfiguration.color == previousVitalitySquare.color) {
                vitalitySquareConfiguration.remaining++;

                settings.remainingSelections++;
            }

            if (vitalitySquareConfiguration.color == newVitalitySquare.color) {
                vitalitySquareConfiguration.remaining--;

                settings.remainingSelections--;
            }
        }

        this.vitalitySquaresSettingsService.saveSettings(settings);
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