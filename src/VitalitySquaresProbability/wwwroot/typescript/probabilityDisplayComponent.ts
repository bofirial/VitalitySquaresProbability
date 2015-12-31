
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

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