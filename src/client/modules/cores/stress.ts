import { BaseActor, Thread } from "shared/core-framework/utils/actors";

class StressThread extends BaseActor implements Thread {
    constructor() {
        super({ Cores: 10 })
    }

    Thread(): void {
        let a = 5
        let b = 3

        for (let i = 0; i < 1e6; i++) {
            a = b
            b = a
        };
    }
};

export { StressThread }