/// <reference path="./../../node_modules/angular2/angular2.d.ts" />
/// <reference path="./../../node_modules/angular2/testing.d.ts" />
var testing_1 = require('angular2/testing');
var vitalitySquaresProbability_1 = require("./vitalitySquaresProbability");
var testUtilities_1 = require("./test/testUtilities");
describe('VspComponent', function () {
    testing_1.it('should have a title', function () {
        var vspComponent = new vitalitySquaresProbability_1.VspComponent();
        expect(vspComponent.title).toEqual('Vitality Squares Probability');
    });
    testing_1.it("the default title should be 'Vitality Squares Probability'", testing_1.injectAsync([testing_1.TestComponentBuilder], function (tcb) {
        return tcb.createAsync(vitalitySquaresProbability_1.VspComponent).then(function (fixture) {
            fixture.detectChanges();
            expect(fixture.debugElement.componentInstance.title).toBe('Vitality Squares Probability');
        });
    }));
    testing_1.it("the template should contain the title", function () {
        var metadata = testUtilities_1.getComponentMetadata(vitalitySquaresProbability_1.VspComponent);
        expect(metadata.template).toContain("{{title}}");
    });
    testing_1.it("the template should contain the probability-display component", function () {
        var metadata = testUtilities_1.getComponentMetadata(vitalitySquaresProbability_1.VspComponent);
        expect(metadata.template).toContain("<probability-display>");
    });
    testing_1.it("the selector should be vsp", function () {
        var metadata = testUtilities_1.getComponentMetadata(vitalitySquaresProbability_1.VspComponent);
        expect(metadata.selector).toBe("vsp");
    });
    describe('with a custom title', function () {
        testing_1.it("the template should contain the title", testing_1.injectAsync([testing_1.TestComponentBuilder], function (tcb) {
            return tcb.createAsync(vitalitySquaresProbability_1.VspComponent).then(function (fixture) {
                fixture.detectChanges();
                fixture.debugElement.componentInstance.title = "Test Title";
                fixture.detectChanges();
                var compiled = fixture.debugElement.nativeElement;
                expect(compiled).toContainText("Test Title");
            });
        }));
    });
});
