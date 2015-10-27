/// <reference path="vitalitysquaresprobability.ts" />

import {VspComponent} from "./vitalitySquaresProbability";

describe('VspComponent', () => {

    it('should have a title', () => {
        let vspComponent = new VspComponent();
        expect(vspComponent.title).toEqual('Vitality Squares Probability Statistics');
    });

});