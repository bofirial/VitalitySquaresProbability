var testing_1=require("angular2/testing"),vitalitySquaresProbability_1=require("./vitalitySquaresProbability"),testUtilities_1=require("./test/testUtilities");describe("VspComponent",function(){testing_1.it("should have a title",function(){var t=new vitalitySquaresProbability_1.VspComponent;expect(t.title).toEqual("Vitality Squares Probability")}),testing_1.it("the default title should be 'Vitality Squares Probability'",testing_1.injectAsync([testing_1.TestComponentBuilder],function(t){return t.createAsync(vitalitySquaresProbability_1.VspComponent).then(function(t){t.detectChanges(),expect(t.debugElement.componentInstance.title).toBe("Vitality Squares Probability")})})),testing_1.it("the template should contain the title",function(){var t=testUtilities_1.getComponentMetadata(vitalitySquaresProbability_1.VspComponent);expect(t.template).toContain("{{title}}")}),testing_1.it("the template should contain the probability-display component",function(){var t=testUtilities_1.getComponentMetadata(vitalitySquaresProbability_1.VspComponent);expect(t.template).toContain("<probability-display>")}),testing_1.it("the selector should be vsp",function(){var t=testUtilities_1.getComponentMetadata(vitalitySquaresProbability_1.VspComponent);expect(t.selector).toBe("vsp")}),describe("with a custom title",function(){testing_1.it("the template should contain the title",testing_1.injectAsync([testing_1.TestComponentBuilder],function(t){return t.createAsync(vitalitySquaresProbability_1.VspComponent).then(function(t){t.detectChanges(),t.debugElement.componentInstance.title="Test Title",t.detectChanges();var e=t.debugElement.nativeElement;expect(e).toContainText("Test Title")})}))})});
//# sourceMappingURL=vitalitySquaresProbability.spec.js.map