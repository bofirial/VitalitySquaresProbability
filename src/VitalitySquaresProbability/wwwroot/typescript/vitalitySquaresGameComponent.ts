
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
        this.remainingSelections = vitalitySquaresGameService.getRemainingSelections();

        this.vitalitySquares = vitalitySquaresGameService.createVitalitySquares();

        this.vitalitySquaresGameService = vitalitySquaresGameService;
    }

    private vitalitySquaresGameService: VitalitySquaresGameService;

    remainingSelections: number;
    vitalitySquares: Array<VitalitySquare>;

    selectVitalitySquare(vitalitySquare: VitalitySquare): void {
        var newVitalitySquare = this.vitalitySquaresGameService.getRandomRemainingVitalitySquare();

        vitalitySquare.squareType = newVitalitySquare.squareType;
    }

    resetGameBoard(): void {
        console.log("Resetting the Game Board");
    }
}