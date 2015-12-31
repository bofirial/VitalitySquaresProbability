
import {it, injectAsync, TestComponentBuilder} from 'angular2/testing';

import {VspComponent} from "./vitalitySquaresProbability";

import {getComponentMetadata} from "./test/testUtilities";

describe('VspComponent', () => {

    it('should have a title', () => {
        let vspComponent = new VspComponent();
        expect(vspComponent.title).toEqual('Vitality Squares Probability');
    });
    
    it("the default title should be 'Vitality Squares Probability'", injectAsync([TestComponentBuilder], (tcb) => {
        return tcb.createAsync(VspComponent).then((fixture) => {
                fixture.detectChanges();

                expect(fixture.debugElement.componentInstance.title).toBe('Vitality Squares Probability');
            });
    }));


    it("the template should contain the title", () => {

        let metadata = getComponentMetadata(VspComponent);

        expect(metadata.template).toContain("{{title}}");
    });

    it("the template should contain the probability-display component", () => {

        let metadata = getComponentMetadata(VspComponent);

        expect(metadata.template).toContain("<probability-display>");
    });

    it("the selector should be vsp", () => {

        let metadata = getComponentMetadata(VspComponent);

        expect(metadata.selector).toBe("vsp");
    });

    describe('with a custom title', () => {

        it("the template should contain the title", injectAsync([TestComponentBuilder], (tcb) => {
            return tcb.createAsync(VspComponent).then((fixture) => {
                fixture.detectChanges();

                fixture.debugElement.componentInstance.title = "Test Title";

                fixture.detectChanges();

                var compiled = fixture.debugElement.nativeElement;
                
                expect(compiled).toContainText("Test Title");
            });
        }));
    });
});