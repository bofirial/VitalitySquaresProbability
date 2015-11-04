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
var VitalitySquareItem = (function () {
    function VitalitySquareItem() {
    }
    return VitalitySquareItem;
})();
exports.VitalitySquareItem = VitalitySquareItem;
var VitalitySquaresSettings = (function () {
    function VitalitySquaresSettings() {
    }
    return VitalitySquaresSettings;
})();
exports.VitalitySquaresSettings = VitalitySquaresSettings;
var VitalitySquaresSettingsService = (function () {
    function VitalitySquaresSettingsService() {
        this.vitalitySquaresSettings = {
            gridRows: 3,
            gridColumns: 4,
            gridItems: [
                {
                    name: "Fruit",
                    total: 6,
                    remaining: 6
                },
                {
                    name: "Junk Food",
                    total: 6,
                    remaining: 6
                }
            ]
        };
    }
    VitalitySquaresSettingsService.prototype.getSettings = function () {
        return this.vitalitySquaresSettings;
    };
    VitalitySquaresSettingsService.prototype.getTotalRemainingItems = function () {
        var totalRemaining = 0;
        for (var _i = 0, _a = this.vitalitySquaresSettings.gridItems; _i < _a.length; _i++) {
            var item = _a[_i];
            totalRemaining += item.remaining;
        }
        return totalRemaining;
    };
    VitalitySquaresSettingsService = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], VitalitySquaresSettingsService);
    return VitalitySquaresSettingsService;
})();
exports.VitalitySquaresSettingsService = VitalitySquaresSettingsService;
