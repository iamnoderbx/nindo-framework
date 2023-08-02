import { HttpService } from "@rbxts/services";
import ClassNetwork from "../networking/class/classnetwork";

/* `export enum ClassImplementationType` is defining an enum called `ClassImplementationType` that
exports two values: `DYNAMIC_RENDER` and `SINGLE_RENDER`. These values are assigned the numeric
values of 1 and 2 respectively. This enum is used as a parameter in the constructor function of the
`ClassImplementation` class to determine whether the class should be rendered dynamically (on both
the client and server) or statically (only on the server). */

export enum ClassImplementationType {
    DYNAMIC_RENDER = 1,
    SINGLE_RENDER = 2,
};

class ClassNetworkDetails {
    constructor(settings: {localization: Player | undefined}) {
        //print(settings.localization?.Name)
    }
}

/* `class ClassImplementation {` is defining a new class called `ClassImplementation`. This class has
three properties: `render`, `network`, and `uuid`. It also has a constructor function that takes in
a parameter `classRenderingType` of type `ClassImplementationType` and sets the `render` property
based on the value of `classRenderingType`. If `classRenderingType` is
`ClassImplementationType.DYNAMIC_RENDER`, the constructor also generates a unique identifier for the
`uuid` property using `HttpService.GenerateGUID()`. */

class ClassImplementation {
    /* `render`, `network`, and `uuid` are properties of the `ClassImplementation` class. */
    render: ClassImplementationType;
    network: ClassNetwork;
    uuid: string | undefined;
    details: typeof ClassNetworkDetails;

    constructor(classRenderingType: ClassImplementationType, details: ClassNetworkDetails) {
        this.details = ClassNetworkDetails
        
        this.render = classRenderingType;
        this.network = new ClassNetwork();

        // Render this class on both the client & server!
        if(this.render === ClassImplementationType.DYNAMIC_RENDER) {
            this.uuid = HttpService.GenerateGUID();
        };
    }
}

export { ClassNetworkDetails }
export default ClassImplementation