
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
        this.getProbabilityStatistics(probabilityDisplayService.getProbabilityDisplayStatistics());

        probabilityDisplayService.subscribeToUpdates(this.getProbabilityStatistics.bind(this));
    }

    private getProbabilityStatistics(probabilityStatistics : Array<ProbabilityDisplayStatistics>): void {
        this.probabilityStatistics = probabilityStatistics;
    }

    probabilityStatistics: Array<ProbabilityDisplayStatistics>;
   
}