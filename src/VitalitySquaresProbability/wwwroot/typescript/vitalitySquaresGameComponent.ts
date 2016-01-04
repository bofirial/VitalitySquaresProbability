
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {VitalitySquaresGameService, VitalitySquare} from './vitalitySquaresGameService';
import {VitalitySquaresSettings, VitalitySquareItem} from './vitalitySquaresSettingsService';

@Component({
    selector: 'vitality-squares-game',
    templateUrl: 'templates/vitalitySquaresGame.html',
    directives: [CORE_DIRECTIVES]
    //styleUrls: ['app/border-component.css'],
})
export class VitalitySquaresGameComponent {

    constructor(vitalitySquaresGameService: VitalitySquaresGameService) {
        this.vitalitySquaresGameService = vitalitySquaresGameService;

        this.setVitalityGameSettings(this.vitalitySquaresGameService.getVitalitySquaresSettings());
        this.resetGameBoard();

        this.vitalitySquaresGameService.subscribeToUpdates(this.setVitalityGameSettings.bind(this));
    }

    private setVitalityGameSettings(vitalitySquaresSettings: VitalitySquaresSettings): void {
        
        this.remainingSelections = vitalitySquaresSettings.remainingSelections;
        this.vitalitySquareConfigurations = vitalitySquaresSettings.gridItems;
    }

    private vitalitySquaresGameService: VitalitySquaresGameService;

    remainingSelections: number;
    vitalitySquares: Array<VitalitySquare>;
    vitalitySquareConfigurations: Array<VitalitySquareItem>;

    selectVitalitySquare(vitalitySquare: VitalitySquare): void {
        if (this.remainingSelections > 0 && vitalitySquare.color == "") {
            var newVitalitySquare = this.vitalitySquaresGameService.getRandomRemainingVitalitySquare();
            
            vitalitySquare.color = newVitalitySquare.color;
            vitalitySquare.icon = newVitalitySquare.icon;
        }
    }

    resetGameBoard(): void {

        this.vitalitySquaresGameService.resetGameBoard();

        this.vitalitySquares = this.vitalitySquaresGameService.createVitalitySquares();
    }
}