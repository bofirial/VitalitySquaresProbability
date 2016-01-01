
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {VitalitySquaresSettingsService, VitalitySquaresSettings, VitalitySquareItem} from './vitalitySquaresSettingsService';

export class VitalitySquare {
    squareType: string;
}

@Component({
    selector: 'vitality-squares-game',
    templateUrl: 'templates/vitalitySquaresGame.html',
    directives: [CORE_DIRECTIVES]
    //styleUrls: ['app/border-component.css'],
})
export class VitalitySquaresGameComponent {

    constructor(vitalitySquaresSettingsService: VitalitySquaresSettingsService) {
        this.remainingSelections = 6;

        var totalVitalitySquares = vitalitySquaresSettingsService.getTotalItems();

        this.vitalitySquares = [];

        for (var i = 0; i < totalVitalitySquares; i++) {
            this.vitalitySquares.push({squareType:'blank'});
        }
    }

    remainingSelections: number;
    vitalitySquares: Array<VitalitySquare>;

}