import {Component, Input, OnChanges, SimpleChange, ElementRef, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'backdrop',
    template: `
<div class="pickerBackdrop {{visible ? 'show' : ''}}" [style.left]="backdropLeft" [style.top]="backdropTop" [style.width]="backdropWidth" [style.height]="backdropHeight" [style.zIndex]="zIndex" (click)="click.emit($event)"></div>
`
})
export class Backdrop implements OnChanges {

    @Input() visible: boolean;
    @Input() zIndex: number;
    @Output() click = new EventEmitter();

    private backdropLeft: string;
    private backdropTop: string;
    private backdropWidth: string;
    private backdropHeight: string;
    private element: ElementRef;

    constructor(element: ElementRef) {
        this.element = element;
    }

    reset(): void {
        this.ngOnChanges.call(this, null);
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        setTimeout(this.updateBackdropPosition.bind(this), 100);
    }

    updateBackdropPosition() {
        var staticParent = this.element.nativeElement;

        while (staticParent.style.position == "absolute" || staticParent.offsetHeight == 0) {
            staticParent = staticParent.parentElement;
        }

        var body = document.body,
            html = document.documentElement;

        var height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);

        var width = Math.max(body.scrollWidth, body.offsetWidth,
            html.clientWidth, html.scrollWidth, html.offsetWidth);

        this.backdropLeft = -staticParent.getBoundingClientRect().left - window.scrollX + "px";
        this.backdropTop = -staticParent.getBoundingClientRect().top - window.scrollY + "px";

        this.backdropWidth = width + "px";
        this.backdropHeight = height + "px";
    }
}