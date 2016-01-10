
import {Directive, provide, Input, OnChanges, SimpleChange} from 'angular2/core';
import {Control, Validator, NG_VALIDATORS} from 'angular2/common';


@Directive({
    selector: '[total-selections]',
    providers: [provide(NG_VALIDATORS, { useExisting: TotalSelectionsValidator, multi: true })]
})
export class TotalSelectionsValidator implements Validator, OnChanges {
    
    @Input() totalVitalitySquares: number;

    control: Control;

    validate(c: Control): { [key: string]: any } {
        this.control = c;

        if (parseInt(c.value, 10) == NaN) {
            return { notInteger: true };
        }

        if (c.value < 1) {
            return { lessThanZero: true };
        }

        if (c.value > this.totalVitalitySquares)
        {
            return { greaterThanTotal: true };
        }

        return null;
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        if (this.control) {

            //HACK: If we don't do this in a setTimeout we get an exception because this change happens during change detection...
            //      If we try to trigger change detection then we get a recursion error for calling change detection from change detection.
            //      https://github.com/angular/angular/issues/6005

            setTimeout(() => {
                this.control.updateValueAndValidity();
            }, 1);
        }
    }
}