
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {ProbabilityDisplayService, VitalitySquareStatistics} from './probabilityDisplayService';
import {CollapsiblePanel} from './collapsiblePanel';

@Component({
    selector: 'probability-display',
    templateUrl: 'templates/probabilityDisplay.html',
    directives: [CORE_DIRECTIVES, CollapsiblePanel]
})
export class ProbabilityDisplayComponent {

    constructor(probabilityDisplayService: ProbabilityDisplayService) {
        this.getProbabilityStatistics(probabilityDisplayService.getProbabilityDisplayStatistics());

        probabilityDisplayService.subscribeToUpdates(this.getProbabilityStatistics.bind(this));
    }

    private copyCollapseStatuses(currentProbabilityStatistics: Array<VitalitySquareStatistics>, newProbabilityStatistics: Array<VitalitySquareStatistics>)
        : Array<VitalitySquareStatistics> {

        if (currentProbabilityStatistics != undefined && newProbabilityStatistics != undefined) {
            for (var probStat of currentProbabilityStatistics) {
                for (var newProbStat of newProbabilityStatistics) {
                    if (probStat.id == newProbStat.id) {
                        newProbStat.showDetails = probStat.showDetails;
                    }
                }
            }
        }

        return newProbabilityStatistics;
    }

    private getProbabilityStatistics(probabilityStatistics: Array<VitalitySquareStatistics>): void {

        probabilityStatistics = this.copyCollapseStatuses(this.probabilityStatistics, probabilityStatistics);

        this.probabilityStatistics = probabilityStatistics;
    }

    probabilityStatistics: Array<VitalitySquareStatistics>;
   
}