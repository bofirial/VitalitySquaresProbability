/// <reference path="./../../node_modules/angular2/angular2.d.ts" />
/// <reference path="./../../node_modules/angular2/testing.d.ts" />

import {it, injectAsync, TestComponentBuilder} from 'angular2/testing';

import {getComponentMetadata} from "./test/testUtilities";

import {ProbabilityDisplayComponent} from "./probabilityDisplayComponent";

describe('Probability Display Component', () => {

    it("the template url should be 'templates/ probabilityDisplay.html'", () => {

        let metadata = getComponentMetadata(ProbabilityDisplayComponent);

        expect(metadata.templateUrl).toBe("templates/probabilityDisplay.html");
    });

    it("the selector should be probability-display", () => {

        let metadata = getComponentMetadata(ProbabilityDisplayComponent);

        expect(metadata.selector).toBe("probability-display");
    });


    //it("should have a chanceForNextSquareToBeFruit", injectAsync([TestComponentBuilder], (tcb) => {
    //    return tcb.createAsync(ProbabilityDisplayComponent).then((fixture) => {
    //        fixture.detectChanges();

    //        expect(fixture.debugElement.componentInstance.chanceForNextSquareToBeFruit).toBe(0.5);
    //    });
    //}));

});