
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {VitalitySquaresGameService, VitalitySquare} from './vitalitySquaresGameService';

@Component({
    selector: 'vitality-squares-game',
    templateUrl: 'templates/vitalitySquaresGame.html',
    directives: [CORE_DIRECTIVES]
    //styleUrls: ['app/border-component.css'],
})
export class VitalitySquaresGameComponent {

    constructor(vitalitySquaresGameService: VitalitySquaresGameService) {
        this.vitalitySquaresGameService = vitalitySquaresGameService;

        this.setRemainingSelections(this.vitalitySquaresGameService.getRemainingSelections());
        this.resetGameBoard();

        this.vitalitySquaresGameService.subscribeToUpdates(this.setRemainingSelections.bind(this));
    }

    private setRemainingSelections(remainingSelections: number): void {
        
        this.remainingSelections = remainingSelections;
    }

    private vitalitySquaresGameService: VitalitySquaresGameService;

    remainingSelections: number;
    vitalitySquares: Array<VitalitySquare>;

    selectVitalitySquare(vitalitySquare: VitalitySquare): void {
        if (this.remainingSelections > 0 && vitalitySquare.squareType == "blank") {
            var newVitalitySquare = this.vitalitySquaresGameService.getRandomRemainingVitalitySquare();

            vitalitySquare.squareType = newVitalitySquare.squareType;
        }
    }

    resetGameBoard(): void {

        this.vitalitySquaresGameService.resetGameBoard();

        this.vitalitySquares = this.vitalitySquaresGameService.createVitalitySquares();
    }
}