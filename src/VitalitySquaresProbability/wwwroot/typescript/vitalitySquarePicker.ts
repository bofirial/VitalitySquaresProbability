import { Component, Input, OnChanges, SimpleChange, ElementRef, EventEmitter, Output } from '@angular/core';
//import {CORE_DIRECTIVES} from '@angular/common';
import {VitalitySquare} from './vitalitySquareCore';
import {Backdrop} from './backdrop';

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
    //directives: [Backdrop]
})
export class VitalitySquarePicker implements OnChanges {

    @Input() title: string;
    @Input() visible: boolean;
    @Input() targetElement: any;
    @Input() vitalitySquareOptions: Array<VitalitySquareOption>;
    @Output() select = new EventEmitter();
    @Output() cancel = new EventEmitter();

    currentPageOptions: Array<VitalitySquareOption>;
    currentPage: number;
    lastPage: number;
    pageNumbers: Array<number>;

    private visibility: string;
    private xPosition: string;
    private yPosition: string;
    private popoverPointerClass: string = "popover-top";
    private element: ElementRef;

    constructor(element: ElementRef) {
        this.element = element;

        this.currentPage = 1;
    }

    private close(): void {

        this.currentPage = 1;

        this.cancel.emit(null);
    }

    private selectOption(vitalitySquareOption: VitalitySquareOption): void {
        if (!vitalitySquareOption.disabled) {

            this.currentPage = 1;

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

            this.lastPage = Math.ceil(this.vitalitySquareOptions.length / 3);
            this.pageNumbers = Array(this.lastPage).fill(1).map((x, i) => i+1);

            this.setCurrentPage();
        }
    }

    private setCurrentPage(): void {
        var startIndex = (this.currentPage - 1) * 3,
            endIndex = this.currentPage * 3;

        this.currentPageOptions = this.vitalitySquareOptions.slice(startIndex, endIndex);
    }

    private nextPage(): void {

        if (this.currentPage >= this.lastPage)
        {
            return;
        }

        this.currentPage++;

        this.setCurrentPage()
    }

    private previousPage(): void {

        if (this.currentPage <= 1)
        {
            return;
        }

        this.currentPage--;

        this.setCurrentPage()
    }
}