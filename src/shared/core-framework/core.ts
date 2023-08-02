import { RunService } from "@rbxts/services";
import { Modding } from "./utils/modding";
import { Reflect } from "shared/core-framework/utils/reflect";
import { Thread, ActorHandler } from "./utils/actors";

interface Tick {
    Tick(dt: number) : void;
}

interface Start {
    Start(): void
};

interface Initalize {
    Initalize(): void
};

interface DependencyInjection {}

/* `namespace InternalFramework {` is creating a namespace in TypeScript called `InternalFramework`.
This namespace contains functions and variables that are only accessible within the namespace and
not outside of it. It is used to organize and encapsulate code to prevent naming conflicts and
improve code readability. */

namespace InternalFramework {
    const tick = new Map<Tick, string>();
    
    /**
     * The function `profilingThread` takes in a function and a string identifier, and uses the `debug`
     * module to profile and categorize memory usage of the function.
     * @param func - func is a function parameter that takes in a function with no arguments and no
     * return value. This function will be executed inside the profilingThread function.
     * @param {string} identifier - The identifier parameter is a string that is used to identify the
     * profiling data for the function being executed. It is used as a label for the profiling data in
     * the debugging tools.
     */
    function profilingThread(func: () => void, identifier: string) {
		debug.profilebegin(identifier);
		debug.setmemorycategory(identifier);

		func();
	}

    /**
     * The function `profileYielding` spawns a profiling thread with a given function and identifier.
     * @param func - func is a function that takes no arguments and returns nothing (void). It is the
     * function that will be profiled by the profilingThread.
     * @param {string} identifier - The `identifier` parameter is a string that is used to identify the
     * profiling task. It can be any string value that helps to distinguish the task from others.
     */
    function profileYielding(func: () => void, identifier: string) {
        task.spawn(profilingThread, func, identifier);
    };

    /**
     * This function sets up event listeners for tick events and executes the Tick function for
     * registered singletons on each heartbeat.
     */
    export function EventListeners() {
        let singletons = Reflect.getMetaDatas("singleton", true);

        /* This code is iterating over an array of objects that have been marked as singletons using
        metadata. For each object, it constructs an instance of the object using the
        `Modding.construct` function. If the object exists and has been marked as "ticked" using
        metadata, it adds the object to a `Map` called `tick` with the object as the key and the
        identifier (retrieved from metadata) as the value. This `Map` is used later to execute the
        `Tick` function for each registered singleton on each heartbeat. */

        singletons.forEach((value : defined) => {
            const object = Modding.construct(value);
            const identifier = Reflect.getMetadataValue(value, "id");

            if(object && Reflect.getMetadataValue(value, "ticked")) {
                tick.set(object as Tick, identifier as string);
            }
        });

        /* `RunService.Heartbeat.Connect((dt) => {...})` sets up an event listener for the `Heartbeat`
        event, which fires every frame. The function passed as an argument to `Connect` is executed
        on each `Heartbeat` event. */

        RunService.Heartbeat.Connect((dt) => {
            for (const [dependency, identifier] of tick) {
                profileYielding(() => dependency.Tick(dt), identifier);
            };
        });
    }

    /**
     * This function retrieves and starts all singletons with the "start" metadata.
     */
    export function Start() {
        let singletons = Reflect.getMetaDatas("start", true);

        /* This code is iterating over an array of objects that have been marked as singletons using
        metadata. For each object, it constructs an instance of the object using the
        `Modding.construct` function. If the object exists and has been marked as "start" using
        metadata, it retrieves the identifier (also retrieved from metadata) and executes the
        `Start` function for the object. The `profileYielding` function is used to profile the
        execution of the `Start` function with the given identifier. */

        singletons.forEach((value : defined) => {
            let dependency = Modding.construct(value) as Start;
            if(!dependency) return;

            const identifier = Reflect.getMetadataValue(value, "id");
            if(!identifier) return;

            /* `profileYielding(() => dependency.Start(), identifier as string);` is a function call
            that executes the `Start` function for a given object and profiles its execution using
            the `profileYielding` function. The `Start` function is retrieved from the object and
            passed as an anonymous function to `profileYielding`, along with an identifier string
            that is used to identify the profiling task. The `profileYielding` function then spawns
            a new thread to execute the anonymous function and profiles its memory usage using the
            `debug` module. */
            profileYielding(() => dependency.Start(), identifier as string);
        });
    }

    /**
     * This function initializes objects that have been marked with a specific metadata.
     */
    export function Initalize() {
        let initalizeable = Reflect.getMetaDatas("initalize", true);

        /* This code is iterating over an array of objects that have been marked with the metadata
        "initalize" using the `Reflect.getMetaDatas` function. For each object, it constructs an
        instance of the object using the `Modding.construct` function. If the object exists and has
        an `Initalize` function, it executes the `Initalize` function for the object. This function
        is used to initialize objects that require additional setup beyond their constructor. */

        initalizeable.forEach((value : defined) => {
            let object = Modding.construct(value) as Initalize;
            if(!object || !object.Initalize) return;

            object.Initalize();
        });
    }

    /**
     * This TypeScript function constructs all singleton objects using metadata.
     */
    export function construct() {
        let singletons = Reflect.getMetaDatas("singleton", true);

        /* This code is iterating over an array of objects that have been marked as singletons using
        metadata. For each object, it constructs an instance of the object using the
        `Modding.construct` function. This function creates a new instance of the object and returns
        it. The constructed object is not returned or stored anywhere, so it is assumed that the
        purpose of this code is to initialize the singletons and make them available for use
        elsewhere in the code. */
        singletons.forEach((value : defined) => {
            Modding.construct(value);
        });
    };

    export function Threads() {
        let threads = Reflect.getMetaDatas("thread", true);

        threads.forEach((value : defined) => {
            let dependency = Modding.construct(value) as Thread;
            if(!dependency) return;

            const identifier = Reflect.getMetadataValue(value, "id") as string;
            if(!identifier) return;

            const threadContainer = Reflect.getMetadataValue(value, "container") as LuaSourceContainer;
            ActorHandler.HandleActorCreation(identifier, dependency, threadContainer);
        });
    }
};

/* The `class FrameworkSingleton` is defining a class in TypeScript called `FrameworkSingleton`. This
class is used to load and register modules for the framework. It contains two methods: `preload` and
`register`. The `preload` method loads all modules in the `modules` folder, and the `register`
method initializes and starts the framework by calling the `InternalFramework.construct`,
`InternalFramework.Initalize`, `InternalFramework.Start`, and `InternalFramework.EventListeners`
functions. The `FrameworkSingleton` class is used to create a singleton instance of the framework
that can be accessed and used throughout the codebase. */

class FrameworkSingleton {
    /**
     * This function loads a TypeScript module and throws an error if it fails to preload.
     * @param {ModuleScript} module - The "module" parameter is a ModuleScript object that represents a
     * module in Roblox Lua. It is used as an argument to the "loadModule" function to load and require
     * the module.
     */

    loadModule(module : ModuleScript) {
        const [success, value] = pcall(require, module);
        if (!success) {
            throw `${module.GetFullName()} failed to preload: ${value}`;
        }
    }

    /**
     * The function loads all modules in the "modules" folder of the parent object.
     * @returns If the `modules` folder is not found, the function returns an error message. If the
     * `modules` folder is found, the function iterates through its children and loads each child
     * module. There is no explicit return value for the function itself.
     */

    preload(holder: Instance) {
        if(!holder) return;

        let modules : Folder | undefined = holder.Parent?.FindFirstChild("modules") as Folder;
        if(!modules) return error("[Framework] Invalid Modules Folder");

        modules.GetDescendants().forEach((instance : Instance) => {
            if(instance.IsA("ModuleScript")) {
                const module = instance as ModuleScript;
                if(!module) return;

                this.loadModule(module);
            };
        });
    }

    /**
     * The function registers and initializes an internal framework for event handling.
     */
    register(holder: Instance) {
        this.preload(holder);

        /* These lines of code are initializing and starting the internal framework for event handling. */
        InternalFramework.construct();

        InternalFramework.Threads();

        InternalFramework.Initalize();
        InternalFramework.Start();
        InternalFramework.EventListeners();
    }
};

const Framework = new FrameworkSingleton();

export default Framework;
export { Start, Initalize, Tick, FrameworkSingleton, DependencyInjection }