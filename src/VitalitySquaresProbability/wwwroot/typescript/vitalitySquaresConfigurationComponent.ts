
import { Component, Input, EventEmitter, Output, OnChanges, SimpleChange, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {VitalitySquareGameModes, VitalitySquareConfiguration, Colors, IconGroups, FlatIcons, Icons} from './vitalitySquareCore'
import {VitalitySquaresSettingsService, VitalitySquaresSettings} from './vitalitySquaresSettingsService';
import {VitalitySquarePicker, VitalitySquareOption, VitalitySquarePickerSettings} from './vitalitySquarePicker';
//import {TotalSelectionsValidator} from './totalSelectionsValidator';
//import {ColorTotalValidator} from './colorTotalValidator';
import {Backdrop} from './backdrop';

@Component({
    selector: 'vitality-squares-configuration',
    templateUrl: 'templates/vitalitySquaresConfiguration.html',
    //directives: [CORE_DIRECTIVES, Backdrop, VitalitySquarePicker, TotalSelectionsValidator, ColorTotalValidator]
})
export class VitalitySquaresConfigurationComponent implements OnChanges {
    @Input() visible: boolean;
    @Output() close = new EventEmitter();

    @ViewChild(Backdrop) backdrop: Backdrop;
    @ViewChild(NgForm) configForm: NgForm;

    vitalitySquaresSettingsService: VitalitySquaresSettingsService;
    vitalitySquaresSettings: VitalitySquaresSettings;

    vitalitySquareGameModes = VitalitySquareGameModes;

    totalVitalitySquares: number;

    nextId: number = 3;

    private colorPickerOptions: Array<VitalitySquareOption> = [];
    private iconPickerOptions: Array<VitalitySquareOption> = [];

    pickerSettings: VitalitySquarePickerSettings = {
        show: false,
        targetElement: null,
        vitalitySquare: null,
        vitalitySquareOptions: this.colorPickerOptions
    };


    constructor(vitalitySquaresSettingsService: VitalitySquaresSettingsService) {
        this.vitalitySquaresSettingsService = vitalitySquaresSettingsService;

        this.vitalitySquaresSettings = this.vitalitySquaresSettingsService.getSettings();

        this.buildColorPickerOptions();
        this.buildIconPickerOptions();
    }

    private buildColorPickerOptions(): void {

        this.colorPickerOptions = [];

        for (var i in Colors) {
            var isValueProperty = parseInt(i, 10) >= 0
            if (isValueProperty) {
                this.colorPickerOptions.push({
                    color: Colors[i].toLowerCase(),
                    icon: '',
                    disabled: false
                });
            }
        }
    }

    private buildIconPickerOptions(): void {

        this.iconPickerOptions = [];

        for (var icon of IconGroups.PlayableIcons) {

            this.iconPickerOptions.push({
                color: '',
                icon: FlatIcons[Icons[icon]],
                disabled: false
            });
        }
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        this.calculateTotals();
    }

    private colorTotalChange(): void {
        setTimeout(this.calculateTotals.bind(this), 100);
    }

    private calculateTotals(): void {
        this.totalVitalitySquares = 0;

        for (var vitalitySquareConfiguration of this.vitalitySquaresSettings.vitalitySquareConfigurations) {
            this.totalVitalitySquares += vitalitySquareConfiguration.total;
        }

        if (isNaN(this.totalVitalitySquares)) {
            this.totalVitalitySquares = null;
        }
    }

    private openVitalitySquarePicker(vitalitySquareConfiguration: VitalitySquareConfiguration, $event: Event) {

        this.pickerSettings.show = true;

        this.pickerSettings.vitalitySquare = vitalitySquareConfiguration;

        this.pickerSettings.targetElement = $event.currentTarget;
    }

    private openColorPicker(vitalitySquareConfiguration: VitalitySquareConfiguration, $event: Event): void {

        if (vitalitySquareConfiguration.isRandomColor) {
            return;
        }

        this.openVitalitySquarePicker(vitalitySquareConfiguration, $event);

        this.pickerSettings.vitalitySquareOptions = this.colorPickerOptions;

        this.setDisabledColorOptions(vitalitySquareConfiguration);
    }

    private openIconPicker(vitalitySquareConfiguration: VitalitySquareConfiguration, $event: Event): void {

        if (vitalitySquareConfiguration.isRandomIcon) {
            return;
        }

        this.openVitalitySquarePicker(vitalitySquareConfiguration, $event);

        this.pickerSettings.vitalitySquareOptions = this.iconPickerOptions;

        this.setDisabledIconOptions(vitalitySquareConfiguration);
    }

    vitalitySquarePickerSelect(vitalitySquare: VitalitySquareOption) {

        if (vitalitySquare.color) {

            this.pickerSettings.vitalitySquare.color = vitalitySquare.color;
        }

        if (vitalitySquare.icon) {

            this.pickerSettings.vitalitySquare.icon = vitalitySquare.icon;
        }

        this.pickerSettings.show = false;
    }

    private setDisabledColorOptions(currentVitalitySquareConfiguration: VitalitySquareConfiguration): void {

        for (var vitalitySquareOption of this.colorPickerOptions) {

            vitalitySquareOption.disabled = false;

            if (vitalitySquareOption.color == currentVitalitySquareConfiguration.color) {

                continue;
            }

            for (var vitalitySquareConfiguration of this.vitalitySquaresSettings.vitalitySquareConfigurations) {
                if (vitalitySquareConfiguration.color == vitalitySquareOption.color && vitalitySquareOption.color != currentVitalitySquareConfiguration.color) {
                    vitalitySquareOption.disabled = true;
                }
            }
        }
    }

    private setDisabledIconOptions(currentVitalitySquareConfiguration: VitalitySquareConfiguration): void {

        for (var vitalitySquareOption of this.iconPickerOptions) {

            vitalitySquareOption.disabled = false;

            if (vitalitySquareOption.icon == currentVitalitySquareConfiguration.icon) {

                continue;
            }

            for (var vitalitySquareConfiguration of this.vitalitySquaresSettings.vitalitySquareConfigurations) {
                if (vitalitySquareConfiguration.icon == vitalitySquareOption.icon && vitalitySquareOption.icon != currentVitalitySquareConfiguration.icon) {
                    vitalitySquareOption.disabled = true;
                }
            }
        }
    }

    private createNewVitalitySquareConfiguration(): void {

        if (this.vitalitySquaresSettings.vitalitySquareConfigurations.length >= 6) {
            return;
        }

        var vitalitySquareConfiguration : VitalitySquareConfiguration = {
            isRandomColor: true,
            isRandomIcon: true,
            remaining: 3,
            total: 3,
            color: this.vitalitySquaresSettingsService.getRandomColor(this.vitalitySquaresSettings.vitalitySquareConfigurations),
            icon: this.vitalitySquaresSettingsService.getRandomIcon(this.vitalitySquaresSettings.vitalitySquareConfigurations),
            id: this.nextId++
        };

        this.vitalitySquaresSettings.vitalitySquareConfigurations.push(vitalitySquareConfiguration);

        this.calculateTotals();

        this.backdrop.reset();
    }

    private removeVitalitySquareConfiguration(vitalitySquareConfiguration: VitalitySquareConfiguration): void {
        if (!this.canRemoveConfiguration()) {
            return;
        }

        var index = this.vitalitySquaresSettings.vitalitySquareConfigurations.indexOf(vitalitySquareConfiguration);

        if (index > -1)
        {
            this.vitalitySquaresSettings.vitalitySquareConfigurations.splice(index, 1);
        }
    }

    private canRemoveConfiguration(): boolean {

        return this.vitalitySquaresSettings.vitalitySquareConfigurations.length > 2;
    }

    private closeConfiguration(): void {

        if (!this.configForm.form.valid)
        {
            return;
        }

        this.vitalitySquaresSettingsService.saveSettings(this.vitalitySquaresSettings);

        this.close.emit(null);
    }
}
