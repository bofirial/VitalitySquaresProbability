/// <reference path="./../../node_modules/angular2/angular2.d.ts" />

import {Injectable} from 'angular2/angular2';

@Injectable()
export class ProbabilityCalculationService {

    constructor() {
    }

    private factorial(n: number): number {
        if (n < 0) {
            return 0;
        }

        if (n === 0) {
            return 1;
        } else {
            return n * this.factorial(n - 1);
        }
    }

    private combination(n: number, r: number): number {

        if (r > n) {
            return 0;
        }

        return this.factorial(n)/(this.factorial(r)*this.factorial(n-r));
    }

    hypergeometricProbability(totalItems: number, totalSuccesses: number, selected: number, selectedSuccesses: number): number {
        
        if (selectedSuccesses > selected)
        {
            return 0;
        }

        return this.combination(totalSuccesses, selectedSuccesses) * this.combination(totalItems-totalSuccesses, selected-selectedSuccesses) / this.combination(totalItems, selected);
    }
}