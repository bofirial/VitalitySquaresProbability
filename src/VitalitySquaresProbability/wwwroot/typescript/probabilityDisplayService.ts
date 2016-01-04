
import {Injectable} from 'angular2/core';

import {VitalitySquaresSettingsService, VitalitySquaresSettings, VitalitySquareItem} from './vitalitySquaresSettingsService';
import {ProbabilityCalculationService} from './probabilityCalculationService';

export class Outcome {
    numSquares: number;
    exactProbability: number;
    atLeastProbability: number;
}

export class ProbabilityDisplayStatistics {
    color: string;
    icon: string;
    id: number;
    probabilityOfNextSquare: number;
    outcomes: Array<Outcome>;
}

@Injectable()
export class ProbabilityDisplayService {

    constructor(vitalitySquaresSettingsService: VitalitySquaresSettingsService, probabilityCalculationService: ProbabilityCalculationService ) {
        this.vitalitySquaresSettingsService = vitalitySquaresSettingsService;
        this.probabilityCalculationService = probabilityCalculationService;
    }
    
    private vitalitySquaresSettingsService: VitalitySquaresSettingsService;
    private probabilityCalculationService: ProbabilityCalculationService;

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
        var vitalitySquaresSettings = this.vitalitySquaresSettingsService.getSettings();

        for (let vitalitySquareItem of vitalitySquaresSettings.gridItems) {
            var currentItemStatistics: ProbabilityDisplayStatistics  = {
                id: vitalitySquareItem.id,
                color: vitalitySquareItem.color,
                icon: vitalitySquareItem.icon,
                probabilityOfNextSquare: this.getProbabilityOfNextSquare(vitalitySquareItem),
                outcomes: []
            };

            if (vitalitySquaresSettings.remainingSelections <= 0) {
                currentItemStatistics.probabilityOfNextSquare = 0;
            }

            for (let i = 0; i < vitalitySquareItem.total + 1; i++) {
                currentItemStatistics.outcomes.push({
                    numSquares: i,
                    exactProbability: this.getExactProbabilityOfOutcome(vitalitySquareItem, i, totalRemainingItems, vitalitySquaresSettings.remainingSelections),
                    atLeastProbability: this.getAtLeastProbabilityOfOutcome(vitalitySquareItem, i, totalRemainingItems, vitalitySquaresSettings.remainingSelections)
                });
            }

            probabilityDisplayStatistics.push(currentItemStatistics);
        }

        return probabilityDisplayStatistics;
    }

    subscribeToUpdates(callback: (probabilityDisplayStatistics: Array<ProbabilityDisplayStatistics>) => void): void {
        this.vitalitySquaresSettingsService.subscribeToUpdates((vitalitySquareSettings) => {
            callback(this.getProbabilityDisplayStatistics());
        });
    }
}