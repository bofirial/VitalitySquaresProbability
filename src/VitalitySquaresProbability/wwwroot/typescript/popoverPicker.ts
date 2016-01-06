import {Component, Input, OnChanges, SimpleChange, ElementRef} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
    selector: 'popoverPicker',
    template: `
<div class="popover {{popoverPointerClass}}" role="tooltip" [style.visibility]="visibility" [style.top]="yPosition" [style.left]="xPosition">
    <div class="popover-arrow"></div>
    <h3 class="popover-title">Select A Vitality Square</h3>
    <div class="popover-content">
        <div class="row">
            <div class="pickerItem col-xs-4">
                <a href="#">
                    <i class="flaticon-question30"></i>
                </a>
            </div>
            <div class="pickerItem yellow col-xs-4">
                <a href="#">
                    <i class="flaticon-fruit72"></i>
                </a>
            </div>
            <div class="pickerItem red col-xs-4">
                <a href="#">
                    <i class="flaticon-baked2"></i>
                </a>
            </div>
        </div>
    </div>
</div>
<div class="pickerBackdrop {{visible ? 'show' : ''}}" [style.left]="backdropLeft" [style.top]="backdropTop" [style.width]="backdropWidth" [style.height]="backdropHeight" (click)="hide()"></div>`,
    directives: [CORE_DIRECTIVES]
})
export class PopoverPicker implements OnChanges {

    @Input() title: string;
    @Input() visible: boolean;
    @Input() targetElement: any;

    private visibility: string;
    private xPosition: string;
    private yPosition: string;
    private popoverPointerClass: string = "popover-top";
    private element: ElementRef;

    private backdropLeft: string;
    private backdropTop: string;
    private backdropWidth: string;
    private backdropHeight: string;

    constructor(element: ElementRef) {
        this.element = element;
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {

        var target = this.targetElement,
            parent = this.element.nativeElement.parentElement,
            popOver = this.element.nativeElement.querySelector('.popover');

        if (this.visible) {
            this.visibility = "visible"
        }
        else {
            this.visibility = "hidden"
        }

        if (this.targetElement) {

            var defaultLeft = target.getBoundingClientRect().left - parent.getBoundingClientRect().left - (popOver.offsetWidth / 2) + (target.offsetWidth / 2),
                xPos = defaultLeft,
                yPos = target.getBoundingClientRect().top - parent.getBoundingClientRect().top - popOver.offsetHeight;

            this.popoverPointerClass = "popover-top";

            if (defaultLeft < 0) {
                xPos = target.getBoundingClientRect().left - parent.getBoundingClientRect().left + target.offsetWidth;
                yPos = target.getBoundingClientRect().top - parent.getBoundingClientRect().top - (popOver.offsetHeight / 2) + (target.offsetWidth / 2);
                this.popoverPointerClass = "popover-right";
            }

            if (defaultLeft + popOver.offsetWidth > parent.offsetWidth) {
                xPos = target.getBoundingClientRect().left - parent.getBoundingClientRect().left - popOver.offsetWidth;
                yPos = target.getBoundingClientRect().top - parent.getBoundingClientRect().top - (popOver.offsetHeight / 2) + (target.offsetWidth / 2);
                this.popoverPointerClass = "popover-left";
            }

            this.xPosition = xPos + "px";
            this.yPosition = yPos + "px";
        }

        this.backdropLeft = -parent.getBoundingClientRect().left + "px";
        this.backdropTop = -parent.getBoundingClientRect().top + "px";
        this.backdropWidth = window.innerWidth + "px";
        this.backdropHeight = window.innerHeight + "px";
    }

}