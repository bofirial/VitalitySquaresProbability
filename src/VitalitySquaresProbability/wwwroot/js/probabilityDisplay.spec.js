/// <reference path="./../../node_modules/angular2/angular2.d.ts" />
/// <reference path="./../../node_modules/angular2/testing.d.ts" />
var testing_1 = require('angular2/testing');
var testUtilities_1 = require("./test/testUtilities");
var probabilityDisplay_1 = require("./probabilityDisplay");
describe('Probability Display Component', function () {
    testing_1.it("the template url should be 'templates/ probabilityDisplay.html'", function () {
        var metadata = testUtilities_1.getComponentMetadata(probabilityDisplay_1.ProbabilityDisplayComponent);
        expect(metadata.templateUrl).toBe("templates/probabilityDisplay.html");
    });
    testing_1.it("the selector should be probability-display", function () {
        var metadata = testUtilities_1.getComponentMetadata(probabilityDisplay_1.ProbabilityDisplayComponent);
        expect(metadata.selector).toBe("probability-display");
    });
    //it("should have a chanceForNextSquareToBeFruit", injectAsync([TestComponentBuilder], (tcb) => {
    //    return tcb.createAsync(ProbabilityDisplayComponent).then((fixture) => {
    //        fixture.detectChanges();
    //        expect(fixture.debugElement.componentInstance.chanceForNextSquareToBeFruit).toBe(0.5);
    //    });
    //}));
});
