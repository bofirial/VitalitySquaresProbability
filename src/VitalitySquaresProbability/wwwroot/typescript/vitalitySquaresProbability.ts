
import {Component} from 'angular2/core';
import {VitalitySquaresGameComponent} from "./vitalitySquaresGameComponent";
import {ProbabilityDisplayComponent} from "./probabilityDisplayComponent";

@Component({
    selector: 'vsp',
    template: `
    <h1>{{title}}</h1>
    <vitality-squares-game></vitality-squares-game>
    <probability-display></probability-display>
    `,
    directives: [ProbabilityDisplayComponent, VitalitySquaresGameComponent]
})
export class VspComponent {
    public title: string = 'Vitality Squares Probability';
}
