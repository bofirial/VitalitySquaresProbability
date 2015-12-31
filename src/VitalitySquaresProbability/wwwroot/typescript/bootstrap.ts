
import {bootstrap} from 'angular2/platform/browser';
import {VspComponent} from "./vitalitySquaresProbability";
import {ProbabilityDisplayService} from "./probabilityDisplayService";
import {ProbabilityCalculationService} from "./probabilityCalculationService";
import {VitalitySquaresSettingsService} from "./vitalitySquaresSettingsService";

bootstrap(VspComponent, [ProbabilityCalculationService, ProbabilityDisplayService, VitalitySquaresSettingsService]);