/// <reference path="./../../node_modules/angular2/angular2.d.ts" />

import {Component, CORE_DIRECTIVES} from 'angular2/angular2';

import {ProbabilityDisplayService, ProbabilityDisplayStatistics} from './probabilityDisplayService';

@Component({
    selector: 'probability-display',
    templateUrl: 'templates/probabilityDisplay.html',
    directives: [CORE_DIRECTIVES]
    //styleUrls: ['app/border-component.css'],
})
export class ProbabilityDisplayComponent {

    constructor(probabilityDisplayService: ProbabilityDisplayService) {
        this.probabilityStatistics = probabilityDisplayService.getProbabilityDisplayStatistics();
    }

    probabilityStatistics: Array<ProbabilityDisplayStatistics>;
   
}