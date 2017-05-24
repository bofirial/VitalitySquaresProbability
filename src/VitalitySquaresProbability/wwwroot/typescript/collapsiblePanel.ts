import { Component, Input } from '@angular/core';

@Component({
    selector: 'collapsiblePanel',
    template: `<div class="collapse {{isExpanded ? 'show' : ''}}"><ng-content></ng-content></div>`
})
export class CollapsiblePanel {

    @Input() isExpanded: boolean;
}