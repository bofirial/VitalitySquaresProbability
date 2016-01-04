import {Component, Input} from 'angular2/core';

@Component({
    selector: 'collapsiblePanel',
    template: `<div class="collapse {{isExpanded ? 'in' : ''}}"><ng-content></ng-content></div>`
})
export class CollapsiblePanel {

    @Input() isExpanded: boolean;
}