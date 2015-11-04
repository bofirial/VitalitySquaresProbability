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
var ProbabilityDisplayComponent = (function () {
    function ProbabilityDisplayComponent() {
        this.chanceForNextSquareToBeFruit = 0.5;
        this.chanceForNextSquareToBeJunk = 0.5;
        this.fruitStats = [
            {
                numFruit: 0,
                exactProbability: 0,
                atLeastProbability: 1
            },
            {
                numFruit: 1,
                exactProbability: 0,
                atLeastProbability: 1
            },
            {
                numFruit: 2,
                exactProbability: 0,
                atLeastProbability: 1
            },
            {
                numFruit: 3,
                exactProbability: 0,
                atLeastProbability: 1
            },
            {
                numFruit: 4,
                exactProbability: 0,
                atLeastProbability: 1
            },
            {
                numFruit: 5,
                exactProbability: 0,
                atLeastProbability: 1
            },
            {
                numFruit: 6,
                exactProbability: 0,
                atLeastProbability: 1
            }
        ];
    }
    ProbabilityDisplayComponent = __decorate([
        angular2_1.Component({
            selector: 'probability-display',
            templateUrl: 'templates/probabilityDisplay.html',
            directives: [angular2_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], ProbabilityDisplayComponent);
    return ProbabilityDisplayComponent;
})();
exports.ProbabilityDisplayComponent = ProbabilityDisplayComponent;
