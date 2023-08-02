import { Initalize, Start } from "shared/core-framework/core";
import { console } from "shared/utils/console";

class World implements Start, Initalize {
    testing: number | undefined;

	test() {
        // Testing!
        console.log(this.testing)
	}

    Start() {
        console.log("Starting world!!")
    }

    Initalize() {
        this.testing = 1;
    }
}

export default World;