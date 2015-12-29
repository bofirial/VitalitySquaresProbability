/// <reference path="./../../node_modules/angular2/angular2.d.ts" />

import {bootstrap} from 'angular2/angular2';
import {VspComponent} from "./vitalitySquaresProbability";
import {ProbabilityDisplayService} from "./probabilityDisplayService";
import {ProbabilityCalculationService} from "./probabilityCalculationService";
import {VitalitySquaresSettingsService} from "./vitalitySquaresSettingsService";

bootstrap(VspComponent, [ProbabilityCalculationService, ProbabilityDisplayService, VitalitySquaresSettingsService]);