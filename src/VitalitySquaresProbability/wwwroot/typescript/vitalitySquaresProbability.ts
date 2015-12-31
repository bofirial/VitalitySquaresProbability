
import {Component} from 'angular2/core';
import {ProbabilityDisplayComponent} from "./probabilityDisplayComponent";

@Component({
    selector: 'vsp',
    template: `
    <h1>{{title}}</h1>
    <probability-display></probability-display>
    `,
    directives: [ProbabilityDisplayComponent]
})
export class VspComponent {
    public title: string = 'Vitality Squares Probability';
}
