/// <reference path="./../../node_modules/angular2/angular2.d.ts" />

import {bootstrap} from 'angular2/angular2';
import {VspComponent} from "./vitalitySquaresProbability";
import {ProbabilityDisplayService} from "./probabilityDisplayService";
import {VitalitySquaresSettingsService} from "./vitalitySquaresSettingsService";

bootstrap(VspComponent, [ProbabilityDisplayService, VitalitySquaresSettingsService]);