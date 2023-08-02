import Proxy from "shared/utils/proxy";
import Network from "../network"


/* `class ClassNetwork` is defining a new class called `ClassNetwork` that extends the `Network` class.
This means that `ClassNetwork` inherits all the properties and methods of the `Network` class and
can also add its own properties and methods. */
class ClassNetwork extends Network {
    /* `shared: any` and `proxy: Proxy` are defining two properties of the `ClassNetwork` class. */
    shared: any;
    private proxy: Proxy;
    private signals: {[key: string]: Array<(arg0: any) => void>} 

    /**
    * This is a constructor function that initializes a proxy object and sets up a listener for changes
    * to its properties.
    */
    constructor() {
        super()
        this.signals = {};

        /* `this.proxy = new Proxy()` creates a new instance of the `Proxy` class and assigns it to the
        `proxy` property of the `ClassNetwork` instance. */
        this.proxy = new Proxy()
        this.shared = this.proxy.proxy;

        /* `this.proxy.changed()` is setting up a listener for changes to the properties of the `proxy`
        object. When a property of the `proxy` object changes, the listener function is called with
        two parameters: `key`, which is a string representing the name of the property that changed,
        and `value`, which is the new value of the property. */
        this.proxy.changed((key: string, value: unknown) => {
            if(!this.signals[key]) return;

            for (var callback of this.signals[key]) {
                callback(value) 
            };
        })
    }

    /**
     * This function adds a callback function to an array of callbacks associated with a specific key
     * in an object.
     * @param {string} key - A string representing the name of the property whose change in value is
     * being monitored.
     * @param callback - The callback parameter is a function that will be called when the value of the
     * property with the specified key changes. The function takes one parameter, which is the new
     * value of the property.
     */
    onPropertyChanged(key: string, callback: (result : any) => void) {
        this.signals[key] = this.signals[key] || [];
        this.signals[key].push(callback)
	}

    /**
     * The function returns the shared networking object.
     * @returns the value of the `shared` property, which is of type `any`.
     */
    getSharedNetworking(): any {
		return this.shared;
	}
};

export default ClassNetwork