import { Start } from "shared/core-framework/core";
import { ParallelExecutor } from "shared/core-framework/utils/actors";
import { StressThread } from "./stress";

export class Test implements Start {
    constructor(private thread: StressThread) {}

    async Start() {
        
    };
}