/// <reference path="./../../node_modules/angular2/angular2.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var vitalitySquaresSettingsService_1 = require('./vitalitySquaresSettingsService');
var Outcome = (function () {
    function Outcome() {
    }
    return Outcome;
})();
exports.Outcome = Outcome;
var ProbabilityDisplayStatistics = (function () {
    function ProbabilityDisplayStatistics() {
    }
    return ProbabilityDisplayStatistics;
})();
exports.ProbabilityDisplayStatistics = ProbabilityDisplayStatistics;
var ProbabilityDisplayService = (function () {
    function ProbabilityDisplayService(vitalitySquaresSettingsService) {
        this.vitalitySquaresSettingsService = vitalitySquaresSettingsService;
        this.vitalitySquaresSettings = vitalitySquaresSettingsService.getSettings();
    }
    ProbabilityDisplayService.prototype.getProbabilityOfNextSquare = function (vitalitySquareItem) {
        return vitalitySquareItem.remaining / this.vitalitySquaresSettingsService.getTotalRemainingItems();
    };
    ProbabilityDisplayService.prototype.getExactProbabilityOfOutcome = function (vitalitySquareItem, outcome) {
        return 1;
    };
    ProbabilityDisplayService.prototype.getAtLeastProbabilityOfOutcome = function (vitalitySquareItem, outcome) {
        return 1;
    };
    ProbabilityDisplayService.prototype.getProbabilityDisplayStatistics = function () {
        var probabilityDisplayStatistics = new Array();
        for (var _i = 0, _a = this.vitalitySquaresSettings.gridItems; _i < _a.length; _i++) {
            var vitalitySquareItem = _a[_i];
            var currentItemStatistics = {
                squareType: vitalitySquareItem.name,
                probabilityOfNextSquare: this.getProbabilityOfNextSquare(vitalitySquareItem),
                outcomes: []
            };
            for (var i = 0; i < vitalitySquareItem.total + 1; i++) {
                currentItemStatistics.outcomes.push({
                    numSquares: i,
                    exactProbability: this.getExactProbabilityOfOutcome(vitalitySquareItem, i),
                    atLeastProbability: this.getAtLeastProbabilityOfOutcome(vitalitySquareItem, i)
                });
            }
            probabilityDisplayStatistics.push(currentItemStatistics);
        }
        return probabilityDisplayStatistics;
    };
    ProbabilityDisplayService = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [vitalitySquaresSettingsService_1.VitalitySquaresSettingsService])
    ], ProbabilityDisplayService);
    return ProbabilityDisplayService;
})();
exports.ProbabilityDisplayService = ProbabilityDisplayService;
