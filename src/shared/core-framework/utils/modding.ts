import { console } from "shared/utils/console";
import { Reflect } from "./reflect";

export type Constructor<T = object> = new (...args: never[]) => T;

/* `export namespace Modding {` is creating a namespace called `Modding` and exporting it so that it
can be used in other parts of the code. The namespace contains several functions related to
dependency injection and object construction. */

export namespace Modding {

    const constructed = new Map<object, object>();

    /**
     * The function constructs a singleton instance from a container object if it is a constructor.
     * @param {object} container - The parameter `container` is an object that is being passed as an
     * argument to the `construct` function. The function checks if the `container` is a constructor
     * function using the `isConstructor` function and if it is, it resolves the singleton instance
     * using the `Modding.resolveSingleton` function
     * @returns The function `construct` returns the result of calling the `Modding.resolveSingleton`
     * function with the `container` object as its argument, but only if the `isConstructor` function
     * returns `true` when called with the `container` object as its argument. If `isConstructor`
     * returns `false`, then nothing is returned.
     */

    export function construct(container: object) {
        if(constructed.has(container)) {
            return constructed.get(container);
        };

        if(isConstructor(container)) {
            const resolved = Modding.resolveSingleton(container);
            constructed.set(container, resolved);
            
            return constructed;
        }
     }
 
     /**
      * This function resolves a singleton instance of a given class using a dependency injection
      * framework.
      * @param ctor - The `ctor` parameter is a constructor function that creates an object of a
      * certain type. In this case, it is a generic type `T` that extends the `object` type. The
      * function `resolveSingleton` uses this constructor function to create a singleton instance of
      * the object.
      * @returns The function `resolveSingleton` returns an instance of the class represented by the
      * constructor `ctor`. The instance is obtained by calling the `createDependency` method of the
      * `Modding` object, which presumably creates and returns a singleton instance of the class. The
      * returned instance is of type `T`, which extends `object`.
      */

     export function resolveSingleton<T extends object>(ctor: Constructor<T>): T {
         const dependency = Modding.createDependency(ctor);
         return dependency;
     }

     /**
      * This function resolves a dependency by constructing it if it hasn't been constructed yet and
      * returning the constructed object.
      * @param {string} id - The `id` parameter is a string representing the identifier of a dependency
      * that needs to be resolved.
      * @returns The function `resolveDependency` returns the constructed object corresponding to the
      * given `id` if it exists in the `constructed` map. If the object has not been constructed yet,
      * the function constructs it and then returns it. If the `dependant` object is not found, the
      * function returns `undefined`.
      */

     function resolveDependency(id: string) {
        const dependant = Reflect.getObjectFromIdentifier(id);
        if(dependant && !constructed.has(dependant)) {
            construct(dependant)
        }

        if(!dependant) return;
        return constructed.get(dependant);
     }
 
     /**
      * This function creates a deferred dependency for a given constructor and returns the constructed
      * object.
      * @param ctor - The parameter `ctor` is a constructor function that creates an object of type
      * `T`. The `createDependency` function uses this constructor to create a deferred dependency,
      * which means that the object is not created immediately but only when it is needed. The function
      * returns a tuple containing the deferred object and a
      * @returns The function `createDependency` returns an object of type `T` which is the type of the
      * constructor passed as an argument to the function. The object is created using the
      * `Modding.createDeferredDependency` function which returns a tuple containing the object and a
      * function to construct it. The `construct` function is immediately called after the object is
      * created, ensuring that the object is fully constructed before it
      */

     export function createDependency<T extends object>(
         ctor: Constructor<T>,
     ) {
         const [obj, construct] = Modding.createDeferredDependency(ctor);
         construct();
         return obj;
     }
 
     /* The `createDeferredDependency` function is creating a deferred dependency for a given
     constructor and returning the constructed object as well as a function to construct it. It
     takes a constructor function `ctor` that creates an object of type `T` and returns a tuple
     containing the deferred object and a function to construct it. The object is not created
     immediately but only when it is needed. The returned object is of type `T` which is the type of
     the constructor passed as an argument to the function. The `construct` function is immediately
     called after the object is created, ensuring that the object is fully constructed before it is
     returned. */

     export function createDeferredDependency<T extends object>(
         ctor: Constructor<T>,
     ) {
         const [obj, construct] = getDeferredConstructor(ctor);
 
         /* This code block is defining the `createDeferredDependency` function in the `Modding`
         namespace. This function takes a constructor function `ctor` that creates an object of type
         `T` and returns a tuple containing the deferred object and a function to construct it. */
         
         return [
                obj as T,
                () => {
                    /* This code block is retrieving an array of dependency identifiers from the
                    metadata of the constructor function `ctor` using the `Reflect.getMetadataValue`
                    function. The metadata is stored using the `Reflect.defineMetadata` function
                    elsewhere in the codebase. */

                    const dependencies: string[] = Reflect.getMetadataValue(ctor, "dependencies") as []
                    const constructorDependencies: never[] = [];

                    if (dependencies) {
                        for (const [index, dependencyId] of pairs(dependencies)) {
                            constructorDependencies[index - 1] = resolveDependency(
                                dependencyId,
                            ) as never;
                        };
                    };

                    construct(...constructorDependencies);
                },
         ] as const;
     }
}

/**
 * The function checks if an object is a constructor.
 * @param {object} obj - The `obj` parameter is of type `object`. It is the object that we want to
 * check if it is a constructor function.
 * @returns The function `isConstructor` is returning a boolean value. It returns `true` if the input
 * `obj` is a constructor function (i.e. has a `new` keyword and a `constructor` property), and `false`
 * otherwise.
 */

function isConstructor(obj: object): obj is Constructor {
	return "new" in obj && "constructor" in obj;
}

/**
 * The function returns a deferred constructor for a given class.
 * @param {T} ctor - The parameter `ctor` is a generic type `T` that extends the `Constructor` type,
 * which represents a constructor function that can create instances of a class. The
 * `getDeferredConstructor` function takes this constructor function as an argument.
 * @returns A tuple with two elements. The first element is an instance of the class represented by the
 * input constructor, created using `setmetatable`. The second element is a function that takes
 * constructor parameters and calls the constructor on the instance, ensuring that it does not return
 * any values.
 */
function getDeferredConstructor<T extends Constructor<unknown>>(ctor: T) {
	const obj = setmetatable({}, ctor as never) as InstanceType<T>;
	return [
		obj,
		(...args: ConstructorParameters<T>) => {
			const result = (obj as { "constructor"(...args: unknown[]): unknown }).constructor(...args);
			assert(result === undefined || result === obj, `Deferred constructors are not allowed to return values.`);
		},
	] as const;
}