
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {VitalitySquare, FlatIcons, VitalitySquareGameModes, VitalitySquareConfiguration} from './vitalitySquareCore';
import {VitalitySquaresGameService} from './vitalitySquaresGameService';
import {VitalitySquaresSettings} from './vitalitySquaresSettingsService';
import {VitalitySquarePicker, VitalitySquareOption, VitalitySquarePickerSettings} from './vitalitySquarePicker';

@Component({
    selector: 'vitality-squares-game',
    templateUrl: 'templates/vitalitySquaresGame.html',
    directives: [CORE_DIRECTIVES, VitalitySquarePicker]
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
        this.vitalitySquareConfigurations = vitalitySquaresSettings.vitalitySquareConfigurations;
        this.vitalitySquareGameMode = vitalitySquaresSettings.vitalitySquareGameMode;

        this.pickerSettings.vitalitySquareOptions = [{
            color: '',
            icon: FlatIcons.QuestionMark
        }];

        for (var vitalitySquareItem of vitalitySquaresSettings.vitalitySquareConfigurations)
        {
            this.pickerSettings.vitalitySquareOptions.push(vitalitySquareItem);
        }
    }

    private vitalitySquaresGameService: VitalitySquaresGameService;

    remainingSelections: number;
    vitalitySquares: Array<VitalitySquare>;
    vitalitySquareConfigurations: Array<VitalitySquareConfiguration>;
    vitalitySquareGameMode: VitalitySquareGameModes;
    pickerSettings: VitalitySquarePickerSettings = {
        show: false,
        targetElement: null,
        vitalitySquare: null,
        vitalitySquareOptions: []
    };

    selectVitalitySquare(vitalitySquare: VitalitySquare, $event : Event): void {
        if (this.vitalitySquareGameMode == VitalitySquareGameModes.Play) {

            if (this.remainingSelections > 0 && vitalitySquare.color == "") {
                var newVitalitySquare = this.vitalitySquaresGameService.getRandomRemainingVitalitySquare();

                vitalitySquare.color = newVitalitySquare.color;
                vitalitySquare.icon = newVitalitySquare.icon;
            }
        }
        else if (this.vitalitySquareGameMode == VitalitySquareGameModes.Edit) {
            this.pickerSettings.show = true;

            this.pickerSettings.vitalitySquare = vitalitySquare;

            this.pickerSettings.targetElement = $event.currentTarget;
        }
    }

    popupPickerSelect(vitalitySquare : VitalitySquare) {
        this.pickerSettings.vitalitySquare.color = vitalitySquare.color;
        this.pickerSettings.vitalitySquare.icon = vitalitySquare.icon;
        this.pickerSettings.show = false;
    }

    resetGameBoard(): void {

        this.vitalitySquaresGameService.resetGameBoard();

        this.vitalitySquares = this.vitalitySquaresGameService.createVitalitySquares();
    }
}