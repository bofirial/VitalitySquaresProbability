/// <reference path="./../../node_modules/angular2/angular2.d.ts" />

import {Injectable} from 'angular2/angular2';

import {VitalitySquaresSettingsService, VitalitySquaresSettings, VitalitySquareItem} from './vitalitySquaresSettingsService';

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

    constructor(vitalitySquaresSettingsService: VitalitySquaresSettingsService) {
        this.vitalitySquaresSettingsService = vitalitySquaresSettingsService;
        this.vitalitySquaresSettings = vitalitySquaresSettingsService.getSettings();
    }

    vitalitySquaresSettings: VitalitySquaresSettings;
    vitalitySquaresSettingsService: VitalitySquaresSettingsService;

    private getProbabilityOfNextSquare(vitalitySquareItem: VitalitySquareItem): number {
        
        return vitalitySquareItem.remaining / this.vitalitySquaresSettingsService.getTotalRemainingItems();
    }

    private getExactProbabilityOfOutcome(vitalitySquareItem: VitalitySquareItem, outcome: number): number {

        return 1;
    }

    private getAtLeastProbabilityOfOutcome(vitalitySquareItem: VitalitySquareItem, outcome: number): number {

        return 1;
    }

    getProbabilityDisplayStatistics(): Array<ProbabilityDisplayStatistics> {

        let probabilityDisplayStatistics = new Array<ProbabilityDisplayStatistics>();

        for (var vitalitySquareItem of this.vitalitySquaresSettings.gridItems) {
            var currentItemStatistics = {
                squareType: vitalitySquareItem.name,
                probabilityOfNextSquare: this.getProbabilityOfNextSquare(vitalitySquareItem),
                outcomes: []
            };

            for (var i = 0; i < vitalitySquareItem.total + 1; i++) {
                currentItemStatistics.outcomes.push({
                    numSquares: i,
                    exactProbability: this.getExactProbabilityOfOutcome(vitalitySquareItem, i),
                    atLeastProbability: this.getAtLeastProbabilityOfOutcome(vitalitySquareItem, i)
                });
            }

            probabilityDisplayStatistics.push(currentItemStatistics);
        }

        return probabilityDisplayStatistics;
        
    }

}