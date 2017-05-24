import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { VitalitySquaresProbabilityComponent } from "./vitalitySquaresProbabilityComponent";

import {VitalitySquaresGameComponent} from "./vitalitySquaresGameComponent";
import {ProbabilityDisplayComponent} from "./probabilityDisplayComponent";
import {VitalitySquaresConfigurationComponent} from "./vitalitySquaresConfigurationComponent";

import { CollapsiblePanel } from "./collapsiblePanel";
import { VitalitySquarePicker } from "./vitalitySquarePicker";
import { Backdrop } from "./backdrop";

import { TotalSelectionsValidator } from "./totalSelectionsValidator";
import { ColorTotalValidator } from "./colorTotalValidator";

import {ProbabilityDisplayService} from "./probabilityDisplayService";
import {ProbabilityCalculationService} from "./probabilityCalculationService";
import {VitalitySquaresSettingsService} from "./vitalitySquaresSettingsService";
import {VitalitySquaresGameService} from "./vitalitySquaresGameService";


@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [VitalitySquaresProbabilityComponent, VitalitySquaresGameComponent, VitalitySquarePicker, Backdrop, ProbabilityDisplayComponent, CollapsiblePanel, VitalitySquaresConfigurationComponent, TotalSelectionsValidator, ColorTotalValidator],
    providers: [ProbabilityCalculationService, ProbabilityDisplayService, VitalitySquaresSettingsService, VitalitySquaresGameService],
    bootstrap: [VitalitySquaresProbabilityComponent],
})
export class AppModule { }