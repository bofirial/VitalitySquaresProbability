
import {Injectable, EventEmitter} from 'angular2/core';

import {copyObject} from './utilities';
import {VitalitySquareGameModes, Colors, Icons, FlatIcons, IconGroups, VitalitySquareConfiguration} from './vitalitySquareCore';

export class VitalitySquaresSettings{
    remainingSelections: number;
    totalSelections: number;
    vitalitySquareConfigurations: Array<VitalitySquareConfiguration>;
    vitalitySquareGameMode: VitalitySquareGameModes;
}

@Injectable()
export class VitalitySquaresSettingsService {

    constructor() {
        this.vitalitySquaresSettings = {
            remainingSelections: 6,
            totalSelections: 6,
            vitalitySquareConfigurations: [
                {
                    total: 6,
                    remaining: 6,
                    color: 'green',
                    icon: FlatIcons.Apple,
                    isRandomColor: true,
                    isRandomIcon: false,
                    id: 1
                },
                {
                    total: 6,
                    remaining: 6,
                    color: 'orange',
                    icon: FlatIcons.FastFood,
                    isRandomColor: true,
                    isRandomIcon: false,
                    id: 2
                }
            ],
            vitalitySquareGameMode: VitalitySquareGameModes.Play
        };

        this.eventEmitter = new EventEmitter(false);
    }

    private eventEmitter: EventEmitter<VitalitySquaresSettings>;

    private vitalitySquaresSettings: VitalitySquaresSettings;

    getSettings(): VitalitySquaresSettings {

        return copyObject(this.vitalitySquaresSettings);
    }

    getTotalRemainingItems(): number {
        var totalRemaining = 0;

        for (var item of this.vitalitySquaresSettings.vitalitySquareConfigurations) {
            totalRemaining += item.remaining;
        }

        return totalRemaining;
    }

    getTotalItems(): number {
        var total = 0;

        for (var item of this.vitalitySquaresSettings.vitalitySquareConfigurations) {
            total += item.total;
        }

        return total;
    }

    getRandomColor(vitalitySquareConfigurations: Array<VitalitySquareConfiguration>): string {

        var i: number = -1;
        var j: number = 1;
        
        while (i == -1) {

            j++;

            i = Math.ceil(Math.random() * 6);
            
            for (var vitalitySquareConfiguration of vitalitySquareConfigurations) {
                if (Colors[i].toLowerCase() == vitalitySquareConfiguration.color && j < 500) {
                    i = -1;
                    break;
                }
            }
        }

        return Colors[i].toLowerCase();
    }

    getRandomIcon(vitalitySquareConfigurations: Array<VitalitySquareConfiguration>): string {

        var i: number = -1;
        var j: number = 1;

        var icon : string = "";

        while (i == -1) {

            j++;

            i = Math.ceil(Math.random() * 16);

            icon = FlatIcons[Icons[IconGroups.PlayableIcons[i - 1]]];
            
            for (var vitalitySquareConfiguration of vitalitySquareConfigurations) {

                if (icon == vitalitySquareConfiguration.icon && j < 500) {
                    i = -1;
                    break;
                }
            }
        }

        return icon;
    }

    resetSettings(): void {
        var settings = this.getSettings();

        for (let vitalitySquareConfiguration of settings.vitalitySquareConfigurations) {
            vitalitySquareConfiguration.remaining = vitalitySquareConfiguration.total;
        }

        settings.remainingSelections = settings.totalSelections;

        for (var vitalitySquareConfiguration of settings.vitalitySquareConfigurations) {
            if (vitalitySquareConfiguration.isRandomColor) {

                vitalitySquareConfiguration.color = "";
            }
            if (vitalitySquareConfiguration.isRandomIcon) {
                vitalitySquareConfiguration.icon = "";
            }
        }

        for (var vitalitySquareConfiguration of settings.vitalitySquareConfigurations) {
            if (vitalitySquareConfiguration.isRandomColor) {

                vitalitySquareConfiguration.color = this.getRandomColor(settings.vitalitySquareConfigurations);
            }

            if (vitalitySquareConfiguration.isRandomIcon) {

                vitalitySquareConfiguration.icon = this.getRandomIcon(settings.vitalitySquareConfigurations);
            }
        }

        this.saveSettings(settings);
    }

    saveSettings(vitalitySquaresSettings: VitalitySquaresSettings): void {
        this.vitalitySquaresSettings = vitalitySquaresSettings;

        this.eventEmitter.next(this.vitalitySquaresSettings);
    } 

    subscribeToUpdates(callback : (vitalitySquareSettings: VitalitySquaresSettings) => void): void {
        this.eventEmitter.subscribe(callback);
    }
}