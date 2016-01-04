
import {Injectable, EventEmitter} from 'angular2/core';

import {copyObject} from './utilities';

export enum RandomIcons {
    notRandom = 1,
    fruit = 2,
    junkFood = 3
}

export enum Colors {
    green = 1,
    orange = 2,
    yellow = 3,
    purple = 4,
    blue = 5,
    red = 6
}

function convertFlatIconEnumToClass(icon: string): string {

    var iconClass = "";

    for (var i = 0; i < icon.length; i++) {
        var c = icon[i];

        if (c.toUpperCase() == c && isNaN(<any>c) == true) {
            iconClass += '-' + c.toLowerCase();
        }
        else {
            iconClass += c;
        }
    }

    return iconClass;
}

export enum Icons {
    flaticonApple55 = 1,
    flaticonFastFood = 2,
    flaticonFruit72 = 3,
    flaticonHealthyFood4 = 4,
    flaticonSweet9 = 5,
    flaticonBaked2 = 6,
    flaticonBread14 = 7,
    flaticonBroccoli = 8,
    flaticonCheese14 = 9,
    flaticonDrink110 = 10,
    flaticonDrink24 = 11,
    flaticonFish52 = 12,
    flaticonSandwich = 13,
    flaticonSteak = 14,
    flaticonTea24 = 15,
    flaticonVegetables4 = 16
}

export enum FruitIcons {
    flaticonApple55 = 1,
    flaticonFruit72 = 2,
    flaticonHealthyFood4 = 3
}

export enum JunkFoodIcons {
    flaticonFastFood = 1,
    flaticonSweet9 = 2,
    flaticonBaked2 = 3
}

export class VitalitySquareItem {
    total: number;
    remaining: number;
    color: string;
    icon: string;
    id: number;
    isRandomColor: boolean;
    isRandomIcon: RandomIcons;
}

export class VitalitySquaresSettings{
    remainingSelections: number;
    totalSelections: number;
    gridItems: Array<VitalitySquareItem>;
}

@Injectable()
export class VitalitySquaresSettingsService {

    constructor() {
        this.vitalitySquaresSettings = {
            remainingSelections: 6,
            totalSelections: 6,
            gridItems: [
                {
                    total: 6,
                    remaining: 6,
                    color: 'green',
                    icon: 'flaticon-apple55',
                    id: 1,
                    isRandomColor: true,
                    isRandomIcon: RandomIcons.fruit
                },
                {
                    total: 6,
                    remaining: 6,
                    color: 'orange',
                    icon: 'flaticon-fast-food',
                    id: 2,
                    isRandomColor: true,
                    isRandomIcon: RandomIcons.junkFood
                }
            ]
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

        for (var item of this.vitalitySquaresSettings.gridItems) {
            totalRemaining += item.remaining;
        }

        return totalRemaining;
    }

    getTotalItems(): number {
        var total = 0;

        for (var item of this.vitalitySquaresSettings.gridItems) {
            total += item.total;
        }

        return total;
    }

    private getRandomColor(vitalitySquareItems: Array<VitalitySquareItem>): string {

        var i: number = -1;
        var j: number = 1;
        
        while (i == -1) {

            j++;

            i = Math.ceil(Math.random() * 6);
            
            for (var vitalitySquareItem of vitalitySquareItems) {
                if (Colors[i] == vitalitySquareItem.color && j < 500) {
                    i = -1;
                    break;
                }
            }
        }

        return Colors[i];
    }

    private getRandomIcon(isRandomIcon : RandomIcons, vitalitySquareItems: Array<VitalitySquareItem>): string {

        var i: number = -1;
        var j: number = 1;

        var icon : string = "";

        while (i == -1) {

            j++;

            i = Math.ceil(Math.random() * 3);

            icon = convertFlatIconEnumToClass(Icons[i]);

            if (isRandomIcon == RandomIcons.fruit) {

                icon = convertFlatIconEnumToClass(FruitIcons[i]);
            }

            if (isRandomIcon == RandomIcons.junkFood) {

                icon = convertFlatIconEnumToClass(JunkFoodIcons[i]);
            }
            
            for (var vitalitySquareItem of vitalitySquareItems) {

                if (icon == vitalitySquareItem.icon && j < 500) {
                    i = -1;
                    break;
                }
            }
        }

        return icon;
    }

    resetSettings(): void {
        var settings = this.getSettings();

        for (let gridItem of settings.gridItems) {
            gridItem.remaining = gridItem.total;
        }

        settings.remainingSelections = settings.totalSelections;

        for (var vitalitySquareItem of settings.gridItems) {
            if (vitalitySquareItem.isRandomColor) {

                vitalitySquareItem.color = "";
            }
            if (vitalitySquareItem.isRandomIcon != RandomIcons.notRandom) {
                vitalitySquareItem.icon = "";
            }
        }

        for (var vitalitySquareItem of settings.gridItems) {
            if (vitalitySquareItem.isRandomColor) {

                vitalitySquareItem.color = this.getRandomColor(settings.gridItems);
            }

            if (vitalitySquareItem.isRandomColor) {

                vitalitySquareItem.icon = this.getRandomIcon(vitalitySquareItem.isRandomIcon, settings.gridItems);
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