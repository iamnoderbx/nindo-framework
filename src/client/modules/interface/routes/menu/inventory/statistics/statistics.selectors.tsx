import { RootState } from "client/modules/interface/root.producer";

const THIRST_MESSAGES = [
    "You are desperate for a drink.",
    "You feel thirsty.",
    "You begin to feel thirsty.",
    "You feel relatively quenched.",
    "You feel fully quenched."
];

const HUNGER_MESSAGES = [
    "You are desperate for a meal.",
    "You feel hungry.",
    "You begin to feel hungry.",
    "You feel relatively nourished.",
    "You feel fully nourished."
];

export const selectLevelState = (state : RootState) => {
    return state.statistics.level;
}

export const selectHealthState = (state : RootState) => {
    return state.statistics.health;
};

const findIndex = (value: number, divisible: number) => {
    let index = 0;
    for (let i = 1; i < divisible; i++) {
        if (value > i * 20) {
            index = i;
        }
    }
    return index;
};

const getThirstMessage = (value: number) => {
    const divisible = THIRST_MESSAGES.size();
    const index = findIndex(value, divisible);
    
    return THIRST_MESSAGES[index];
};

const getHungerMessage = (value: number) => {
    const divisible = HUNGER_MESSAGES.size();
    const index = findIndex(value, divisible);

    return HUNGER_MESSAGES[index];
};

export const selectNutrientStates = (state: RootState) => {
    const thirst = state.statistics.thirst;
    const hunger = state.statistics.hunger;

    return {
        thirst: getThirstMessage(thirst),
        hunger: getHungerMessage(hunger),
    };
};