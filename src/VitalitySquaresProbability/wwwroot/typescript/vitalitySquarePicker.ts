import {Component, Input, OnChanges, SimpleChange, ElementRef, EventEmitter, Output} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {VitalitySquare} from './vitalitySquareCore';

export class VitalitySquareOption extends VitalitySquare{
    disabled: boolean;
}

export class VitalitySquarePickerSettings {
    show: boolean;
    targetElement: any;
    vitalitySquare: VitalitySquare;
    vitalitySquareOptions: Array<VitalitySquareOption>;
}

@Component({
    selector: 'vitalitySquarePicker',
    templateUrl: 'templates/vitalitySquarePicker.html',
    directives: [CORE_DIRECTIVES]
})
export class VitalitySquarePicker implements OnChanges {

    @Input() title: string;
    @Input() visible: boolean;
    @Input() targetElement: any;
    @Input() vitalitySquareOptions: Array<VitalitySquareOption>;
    @Output() select = new EventEmitter();
    @Output() cancel = new EventEmitter();

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

    private close(): void {
        this.cancel.emit(null);
    }

    private selectOption(vitalitySquareOption: VitalitySquareOption): void {
        if (!vitalitySquareOption.disabled) {
            this.select.emit(vitalitySquareOption);
        }
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