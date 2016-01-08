
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

    constructor(vitalitySquaresGameService: VitalitySquaresGameService) {
        this.vitalitySquaresGameService = vitalitySquaresGameService;

        this.resetGameBoard();
        this.setVitalityGameSettings(this.vitalitySquaresGameService.getVitalitySquaresSettings());

        this.vitalitySquaresGameService.subscribeToUpdates(this.setVitalityGameSettings.bind(this));
    }

    private setVitalityGameSettings(vitalitySquaresSettings: VitalitySquaresSettings): void {
        
        this.remainingSelections = vitalitySquaresSettings.remainingSelections;
        this.vitalitySquareConfigurations = vitalitySquaresSettings.vitalitySquareConfigurations;
        this.vitalitySquareGameMode = vitalitySquaresSettings.vitalitySquareGameMode;

        this.pickerSettings.vitalitySquareOptions = [{
            color: '',
            icon: FlatIcons.QuestionMark,
            disabled: false
        }];

        for (var vitalitySquareItem of vitalitySquaresSettings.vitalitySquareConfigurations)
        {
            var vitalitySquareOption = {
                color: vitalitySquareItem.color,
                icon: vitalitySquareItem.icon,
                disabled: false
            };

            this.pickerSettings.vitalitySquareOptions.push(vitalitySquareOption);
        }
    }

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
            
            this.setDisabledOptions(vitalitySquare);
        }
    }

    private setDisabledOptions(vitalitySquare: VitalitySquare): void {

        var vitalitySquareSettings = this.vitalitySquaresGameService.getVitalitySquaresSettings();

        for (var vitalitySquareOption of this.pickerSettings.vitalitySquareOptions) {
            if (vitalitySquareOption.color == '' || vitalitySquareOption.color == vitalitySquare.color) {

                vitalitySquareOption.disabled = false;
                continue;
            }

            if (this.remainingSelections < 1 && vitalitySquare.color == '') {

                vitalitySquareOption.disabled = true;
                continue;
            }

            for (var vitalitySquareConfiguration of vitalitySquareSettings.vitalitySquareConfigurations) {
                if (vitalitySquareConfiguration.color == vitalitySquareOption.color) {
                    vitalitySquareOption.disabled = vitalitySquareConfiguration.remaining <= 0;
                    break;
                }
            }
        }
    }

    vitalitySquarePickerSelect(vitalitySquare: VitalitySquare) {

        this.vitalitySquaresGameService.selectVitalitySquare(vitalitySquare, this.pickerSettings.vitalitySquare);

        this.pickerSettings.vitalitySquare.color = vitalitySquare.color;
        this.pickerSettings.vitalitySquare.icon = vitalitySquare.icon;
        this.pickerSettings.show = false;
    }

    resetGameBoard(): void {

        this.vitalitySquaresGameService.resetGameBoard();

        this.vitalitySquares = this.vitalitySquaresGameService.createVitalitySquares();
    }

    isDisabled(vitalitySquare: VitalitySquare): boolean {
        
        if (this.vitalitySquareGameMode == VitalitySquareGameModes.Edit) {
            return false;
        }
        else if (this.vitalitySquareGameMode == VitalitySquareGameModes.Play) {
            return this.remainingSelections < 1 || vitalitySquare.color != '';
        }

        return false;
    }
}