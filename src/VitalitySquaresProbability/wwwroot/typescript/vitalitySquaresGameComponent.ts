
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {VitalitySquaresGameService, VitalitySquare} from './vitalitySquaresGameService';
import {VitalitySquaresSettings, VitalitySquareItem, VitalitySquareGameModes} from './vitalitySquaresSettingsService';
import {PopoverPicker} from './popoverPicker';

export class VitalitySquarePicker {
    show: boolean;
    targetElement: any;
}

@Component({
    selector: 'vitality-squares-game',
    templateUrl: 'templates/vitalitySquaresGame.html',
    directives: [CORE_DIRECTIVES, PopoverPicker]
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
        this.vitalitySquareGameMode = vitalitySquaresSettings.vitalitySquareGameMode;
    }

    private vitalitySquaresGameService: VitalitySquaresGameService;

    remainingSelections: number;
    vitalitySquares: Array<VitalitySquare>;
    vitalitySquareConfigurations: Array<VitalitySquareItem>;
    vitalitySquareGameMode: VitalitySquareGameModes;
    vitalitySquarePicker: VitalitySquarePicker = {
        show: false,
        targetElement: null
    };

    selectVitalitySquare(vitalitySquare: VitalitySquare, $event : Event): void {
        if (this.vitalitySquareGameMode == VitalitySquareGameModes.play) {

            if (this.remainingSelections > 0 && vitalitySquare.color == "") {
                var newVitalitySquare = this.vitalitySquaresGameService.getRandomRemainingVitalitySquare();

                vitalitySquare.color = newVitalitySquare.color;
                vitalitySquare.icon = newVitalitySquare.icon;
            }
        }
        else if (this.vitalitySquareGameMode == VitalitySquareGameModes.edit) {
            this.vitalitySquarePicker.show = !this.vitalitySquarePicker.show;

            this.vitalitySquarePicker.targetElement = $event.currentTarget;
        }
    }

    resetGameBoard(): void {

        this.vitalitySquaresGameService.resetGameBoard();

        this.vitalitySquares = this.vitalitySquaresGameService.createVitalitySquares();
    }
}