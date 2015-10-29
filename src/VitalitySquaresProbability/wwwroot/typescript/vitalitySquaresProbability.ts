/// <reference path="./../../node_modules/angular2/angular2.d.ts" />

import {Component} from 'angular2/angular2';
import {ProbabilityDisplayComponent} from "./probabilityDisplay";

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
