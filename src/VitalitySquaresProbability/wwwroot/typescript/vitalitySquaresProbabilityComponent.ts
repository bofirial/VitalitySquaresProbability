
import {Component} from 'angular2/core';
import {VitalitySquaresGameComponent} from "./vitalitySquaresGameComponent";
import {ProbabilityDisplayComponent} from "./probabilityDisplayComponent";

@Component({
    selector: 'vsp',
    templateUrl: 'templates/vitalitySquaresProbability.html',
    directives: [ProbabilityDisplayComponent, VitalitySquaresGameComponent]
})
export class VitalitySquaresProbabilityComponent {
    public title: string = 'Vitality Squares Probability';
}
