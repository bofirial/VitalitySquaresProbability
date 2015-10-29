/// <reference path="./../../node_modules/angular2/angular2.d.ts" />

import {Component} from 'angular2/angular2';

@Component({
    selector: 'probability-display',
    templateUrl: 'templates/probabilityDisplay.html'
    //styleUrls: ['app/border-component.css'],
})
export class ProbabilityDisplayComponent {
    chanceForNextSquareToBeFruit: number = 0.5;
    chanceForNextSquareToBeJunk: number = 0.5;
}