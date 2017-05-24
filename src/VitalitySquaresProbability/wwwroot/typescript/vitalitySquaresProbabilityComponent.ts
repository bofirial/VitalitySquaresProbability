
import {Component} from '@angular/core';

@Component({
    selector: 'vsp',
    //'template':'<div>Test Code</div>'
    templateUrl: 'templates/vitalitySquaresProbability.html'
    //directives: [ProbabilityDisplayComponent, VitalitySquaresGameComponent, VitalitySquaresConfigurationComponent]
})
export class VitalitySquaresProbabilityComponent {
    title: string = 'Vitality Squares Probability';
    showConfiguration: boolean = false;
}
