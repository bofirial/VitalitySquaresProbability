
import {Injectable} from 'angular2/core';

import {VitalitySquaresSettingsService, VitalitySquaresSettings, VitalitySquareItem} from './vitalitySquaresSettingsService';
import {ProbabilityCalculationService} from './probabilityCalculationService';

export class Outcome {
    numSquares: number;
    exactProbability: number;
    atLeastProbability: number;
}

export class ProbabilityDisplayStatistics {
    squareType: string;
    probabilityOfNextSquare: number;
    outcomes: Array<Outcome>;
}

@Injectable()
export class ProbabilityDisplayService {

    constructor(vitalitySquaresSettingsService: VitalitySquaresSettingsService, probabilityCalculationService: ProbabilityCalculationService ) {
        this.vitalitySquaresSettingsService = vitalitySquaresSettingsService;
        this.vitalitySquaresSettings = vitalitySquaresSettingsService.getSettings();
        this.probabilityCalculationService = probabilityCalculationService;
    }

    vitalitySquaresSettings: VitalitySquaresSettings;
    vitalitySquaresSettingsService: VitalitySquaresSettingsService;
    probabilityCalculationService: ProbabilityCalculationService;

    private getProbabilityOfNextSquare(vitalitySquareItem: VitalitySquareItem): number {
        
        return vitalitySquareItem.remaining / this.vitalitySquaresSettingsService.getTotalRemainingItems();
    }

    private getExactProbabilityOfOutcome(vitalitySquareItem: VitalitySquareItem, outcome: number, totalRemainingItems: number, remainingSelections: number): number {
        
        var requiredSelections = outcome - (vitalitySquareItem.total - vitalitySquareItem.remaining);

        if (requiredSelections < 0) {
            return 0;
        }

        return this.probabilityCalculationService.hypergeometricProbability(totalRemainingItems, vitalitySquareItem.remaining, remainingSelections, requiredSelections);
    }

    private getAtLeastProbabilityOfOutcome(vitalitySquareItem: VitalitySquareItem, outcome: number, totalRemainingItems: number, remainingSelections: number): number {

        let total = 0;

        for (let i = outcome; i <= vitalitySquareItem.total; i++) {
            total += this.getExactProbabilityOfOutcome(vitalitySquareItem, i, totalRemainingItems, remainingSelections);
        }

        return total;
    }

    getProbabilityDisplayStatistics(): Array<ProbabilityDisplayStatistics> {

        var probabilityDisplayStatistics = new Array<ProbabilityDisplayStatistics>();
        var totalRemainingItems = this.vitalitySquaresSettingsService.getTotalRemainingItems();

        for (let vitalitySquareItem of this.vitalitySquaresSettings.gridItems) {
            var currentItemStatistics: any  = {
                squareType: vitalitySquareItem.name,
                probabilityOfNextSquare: this.getProbabilityOfNextSquare(vitalitySquareItem),
                outcomes: []
            };

            for (let i = 0; i < vitalitySquareItem.total + 1; i++) {
                currentItemStatistics.outcomes.push({
                    numSquares: i,
                    exactProbability: this.getExactProbabilityOfOutcome(vitalitySquareItem, i, totalRemainingItems, this.vitalitySquaresSettings.remainingSelections),
                    atLeastProbability: this.getAtLeastProbabilityOfOutcome(vitalitySquareItem, i, totalRemainingItems, this.vitalitySquaresSettings.remainingSelections)
                });
            }

            probabilityDisplayStatistics.push(currentItemStatistics);
        }

        return probabilityDisplayStatistics;
        
    }
}