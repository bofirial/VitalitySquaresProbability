var __decorate=this&&this.__decorate||function(t,e,i,a){if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)return Reflect.decorate(t,e,i,a);switch(arguments.length){case 2:return t.reduceRight(function(t,e){return e&&e(t)||t},e);case 3:return t.reduceRight(function(t,a){return void(a&&a(e,i))},void 0);case 4:return t.reduceRight(function(t,a){return a&&a(e,i,t)||t},a)}},__metadata=this&&this.__metadata||function(t,e){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(t,e):void 0},angular2_1=require("angular2/angular2"),vitalitySquaresSettingsService_1=require("./vitalitySquaresSettingsService"),probabilityCalculationService_1=require("./probabilityCalculationService"),Outcome=function(){function t(){}return t}();exports.Outcome=Outcome;var ProbabilityDisplayStatistics=function(){function t(){}return t}();exports.ProbabilityDisplayStatistics=ProbabilityDisplayStatistics;var ProbabilityDisplayService=function(){function t(t,e){this.vitalitySquaresSettingsService=t,this.vitalitySquaresSettings=t.getSettings(),this.probabilityCalculationService=e}return t.prototype.getProbabilityOfNextSquare=function(t){return t.remaining/this.vitalitySquaresSettingsService.getTotalRemainingItems()},t.prototype.getExactProbabilityOfOutcome=function(t,e,i,a){var r=e-(t.total-t.remaining);return 0>r?0:this.probabilityCalculationService.hypergeometricProbability(i,t.remaining,a,r)},t.prototype.getAtLeastProbabilityOfOutcome=function(t,e,i,a){for(var r=0,o=e;o<=t.total;o++)r+=this.getExactProbabilityOfOutcome(t,o,i,a);return console.log(""),r},t.prototype.getProbabilityDisplayStatistics=function(){for(var t=new Array,e=this.vitalitySquaresSettingsService.getTotalRemainingItems(),i=0,a=this.vitalitySquaresSettings.gridItems;i<a.length;i++){for(var r=a[i],o={squareType:r.name,probabilityOfNextSquare:this.getProbabilityOfNextSquare(r),outcomes:[]},n=0;n<r.total+1;n++)o.outcomes.push({numSquares:n,exactProbability:this.getExactProbabilityOfOutcome(r,n,e,this.vitalitySquaresSettings.remainingSelections),atLeastProbability:this.getAtLeastProbabilityOfOutcome(r,n,e,this.vitalitySquaresSettings.remainingSelections)});t.push(o)}return t},t=__decorate([angular2_1.Injectable(),__metadata("design:paramtypes",[vitalitySquaresSettingsService_1.VitalitySquaresSettingsService,probabilityCalculationService_1.ProbabilityCalculationService])],t)}();exports.ProbabilityDisplayService=ProbabilityDisplayService;
//# sourceMappingURL=probabilityDisplayService.js.map