import { rawget, rawset } from "./raw/raw"

/* The `class Proxy {` is defining a new class called `Proxy`. This class is used to create a proxy
object that can be used to intercept and handle property access and modification on another object.
The `Proxy` class has a `proxy` property that holds the proxy object, a `reference` property that
holds the original object being proxied, and a `callback` property that is a function that will be
called whenever a property on the proxied object is modified. The `Proxy` class also has a `changed`
method that can be used to set the `callback` property. */

class Proxy {
    /* These are properties of the `Proxy` class. */
    public proxy = {};
    public reference = {};
    callback: ((key: string, value: unknown) => void) | undefined;

    /**
     * This function sets up a metatable for a proxy object in TypeScript.
     */
    constructor() {
        let Metatable: defined = {
            /* `__index` is a special method in Lua that is called when a table is accessed with a key
            that does not exist in the table. In this TypeScript code, `__index` is being used to
            intercept property access on the proxied object. */
            __index: (_: defined, Key: defined) => {
                return rawget(this.reference, Key)
            },

            /* `__newindex` is a special method in Lua that is called when a table is assigned a value
            to a key that does not exist in the table. In this TypeScript code, `__newindex` is
            being used to intercept property modification on the proxied object. */
            __newindex: (Original: unknown, Key: string, Value: unknown) => {
                rawset(this.reference, Key, Value)
                
                if(!this.callback) return;
                this.callback(Key, Value)
            },
        };

        /* `setmetatable(this.proxy, Metatable)` is setting the metatable of the `proxy` object to
        `Metatable`. This means that any property access or modification on the `proxy` object will
        be intercepted and handled according to the methods defined in `Metatable`, which in this
        case are `__index` and `__newindex`. This allows the `Proxy` class to intercept and handle
        property access and modification on the original object being proxied. */
        setmetatable(this.proxy, Metatable)
    }

    /**
     * The function "changed" sets a callback function to be executed when a change occurs.
     * @param arg0 - The parameter `arg0` is a function that takes in two arguments: `key` and `value`,
     * both of which have an unknown data type, and returns `void`. This function is assigned to the
     * `callback` property of the current object.
     */
    changed(arg0: (key: string, value: unknown) => void) {
        this.callback = arg0
    }
}

export default Proxy