import { Lighting } from "@rbxts/services";
import { normalize } from "shared/utils/math";

const GOAL_BLUR = 40;

const GOAL_SATURATION = 0.3;
const GOAL_COLOR = Color3.fromRGB(215, 219, 255);

let blurEffect : BlurEffect, colorCorrectionEffect : ColorCorrectionEffect

function getLightingEffects() {
    if(blurEffect && colorCorrectionEffect) {
        return { blur: blurEffect, correction: colorCorrectionEffect }
    }

    blurEffect = new Instance("BlurEffect");
    blurEffect.Parent = Lighting;

    colorCorrectionEffect = new Instance("ColorCorrectionEffect")
    colorCorrectionEffect.Parent = Lighting

    return { blur: blurEffect, correction: colorCorrectionEffect }
}

export function updateLightingEffects(value : number) {
    let { blur, correction } = getLightingEffects();

    blur.Size = value * GOAL_BLUR
    correction.Saturation = value * GOAL_SATURATION

    correction.TintColor = Color3.fromRGB(255, 255, 255).Lerp(GOAL_COLOR, value)
};