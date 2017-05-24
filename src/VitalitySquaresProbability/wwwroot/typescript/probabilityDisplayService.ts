
import { Injectable } from '@angular/core';

import {VitalitySquaresSettingsService, VitalitySquaresSettings} from './vitalitySquaresSettingsService';
import {VitalitySquare, VitalitySquareConfiguration} from './vitalitySquareCore'
import {ProbabilityCalculationService} from './probabilityCalculationService';

export class Outcome {
    numSquares: number;
    exactProbability: number;
    atLeastProbability: number;
}

export class VitalitySquareStatistics extends VitalitySquare {
    probabilityOfNextSquare: number;
    outcomes: Array<Outcome>;
    showDetails: boolean;
    id: number;
}

@Injectable()
export class ProbabilityDisplayService {

    constructor(vitalitySquaresSettingsService: VitalitySquaresSettingsService, probabilityCalculationService: ProbabilityCalculationService ) {
        this.vitalitySquaresSettingsService = vitalitySquaresSettingsService;
        this.probabilityCalculationService = probabilityCalculationService;
    }
    
    private vitalitySquaresSettingsService: VitalitySquaresSettingsService;
    private probabilityCalculationService: ProbabilityCalculationService;

    private getProbabilityOfNextSquare(vitalitySquareItem: VitalitySquareConfiguration): number {
        
        return vitalitySquareItem.remaining / this.vitalitySquaresSettingsService.getTotalRemainingItems();
    }

    private getExactProbabilityOfOutcome(vitalitySquareItem: VitalitySquareConfiguration, outcome: number, totalRemainingItems: number, remainingSelections: number): number {
        
        var requiredSelections = outcome - (vitalitySquareItem.total - vitalitySquareItem.remaining);

        if (requiredSelections < 0) {
            return 0;
        }

        return this.probabilityCalculationService.hypergeometricProbability(totalRemainingItems, vitalitySquareItem.remaining, remainingSelections, requiredSelections);
    }

    private getAtLeastProbabilityOfOutcome(vitalitySquareItem: VitalitySquareConfiguration, outcome: number, totalRemainingItems: number, remainingSelections: number): number {

        let total = 0;

        for (let i = outcome; i <= vitalitySquareItem.total; i++) {
            total += this.getExactProbabilityOfOutcome(vitalitySquareItem, i, totalRemainingItems, remainingSelections);
        }

        return total;
    }

    getProbabilityDisplayStatistics(): Array<VitalitySquareStatistics> {

        var probabilityDisplayStatistics = new Array<VitalitySquareStatistics>();
        var totalRemainingItems = this.vitalitySquaresSettingsService.getTotalRemainingItems();
        var vitalitySquaresSettings = this.vitalitySquaresSettingsService.getSettings();

        for (let vitalitySquareConfiguration of vitalitySquaresSettings.vitalitySquareConfigurations) {
            var currentItemStatistics: VitalitySquareStatistics  = {
                color: vitalitySquareConfiguration.color,
                icon: vitalitySquareConfiguration.icon,
                probabilityOfNextSquare: this.getProbabilityOfNextSquare(vitalitySquareConfiguration),
                outcomes: [],
                showDetails: false,
                id: vitalitySquareConfiguration.id
            };

            if (vitalitySquaresSettings.remainingSelections <= 0) {
                currentItemStatistics.probabilityOfNextSquare = 0;
            }

            for (let i = 0; i < vitalitySquareConfiguration.total + 1; i++) {
                currentItemStatistics.outcomes.push({
                    numSquares: i,
                    exactProbability: this.getExactProbabilityOfOutcome(vitalitySquareConfiguration, i, totalRemainingItems, vitalitySquaresSettings.remainingSelections),
                    atLeastProbability: this.getAtLeastProbabilityOfOutcome(vitalitySquareConfiguration, i, totalRemainingItems, vitalitySquaresSettings.remainingSelections)
                });
            }

            probabilityDisplayStatistics.push(currentItemStatistics);
        }

        return probabilityDisplayStatistics;
    }

    subscribeToUpdates(callback: (probabilityDisplayStatistics: Array<VitalitySquareStatistics>) => void): void {
        this.vitalitySquaresSettingsService.subscribeToUpdates((vitalitySquareSettings) => {
            callback(this.getProbabilityDisplayStatistics());
        });
    }
}