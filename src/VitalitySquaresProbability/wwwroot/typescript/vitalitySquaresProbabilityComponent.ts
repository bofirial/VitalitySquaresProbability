
import {Component} from 'angular2/core';
import {VitalitySquaresGameComponent} from "./vitalitySquaresGameComponent";
import {ProbabilityDisplayComponent} from "./probabilityDisplayComponent";
import {VitalitySquaresConfigurationComponent} from "./vitalitySquaresConfigurationComponent";

@Component({
    selector: 'vsp',
    templateUrl: 'templates/vitalitySquaresProbability.html',
    directives: [ProbabilityDisplayComponent, VitalitySquaresGameComponent, VitalitySquaresConfigurationComponent]
})
export class VitalitySquaresProbabilityComponent {
    title: string = 'Vitality Squares Probability';
    showConfiguration: boolean = false;
}
