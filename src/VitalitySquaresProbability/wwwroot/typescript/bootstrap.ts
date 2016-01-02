
import {bootstrap} from 'angular2/platform/browser';
import {VitalitySquaresProbabilityComponent} from "./vitalitySquaresProbabilityComponent";
import {ProbabilityDisplayService} from "./probabilityDisplayService";
import {ProbabilityCalculationService} from "./probabilityCalculationService";
import {VitalitySquaresSettingsService} from "./vitalitySquaresSettingsService";
import {VitalitySquaresGameService} from "./vitalitySquaresGameService";

bootstrap(VitalitySquaresProbabilityComponent, [ProbabilityCalculationService, ProbabilityDisplayService, VitalitySquaresSettingsService, VitalitySquaresGameService]);