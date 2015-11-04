/// <reference path="./../../node_modules/angular2/angular2.d.ts" />
var angular2_1 = require('angular2/angular2');
var vitalitySquaresProbability_1 = require("./vitalitySquaresProbability");
var probabilityDisplayService_1 = require("./probabilityDisplayService");
var vitalitySquaresSettingsService_1 = require("./vitalitySquaresSettingsService");
angular2_1.bootstrap(vitalitySquaresProbability_1.VspComponent, [probabilityDisplayService_1.ProbabilityDisplayService, vitalitySquaresSettingsService_1.VitalitySquaresSettingsService]);
