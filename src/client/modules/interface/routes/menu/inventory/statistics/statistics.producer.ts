import { createProducer } from "@rbxts/reflex";

export interface HealthState {max: number, value: number}
export interface LevelState {experience: number, level: number, required: number}

export interface StatisticState {
	readonly health: HealthState;

    readonly thirst: number;
    readonly hunger: number;

    readonly level: LevelState;
}

const initialState: StatisticState = {
	health: {max: 100, value: 100},

    thirst: 100,
    hunger: 100,

    level: {level: 1, experience: 50, required: 100},
}

export const statisticProducer = createProducer(initialState, {
    setHealthState: (state : StatisticState, health : HealthState) => ({
        ...state, health,
    }),

    setThirstState: (state : StatisticState, thirst : number) => ({
        ...state, thirst
    }),

    setHungerState: (state : StatisticState, hunger : number) => ({
        ...state, hunger
    })
});