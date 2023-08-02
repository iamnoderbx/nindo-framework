interface MetaTags {
    [start : string]: boolean | undefined | string | string[] | LuaSourceContainer | unknown,
};

/* The Reflection class provides methods for adding, retrieving, and checking metadata for objects. */
class Reflection {
    containers: Map<object, MetaTags> = new Map()

    /**
     * This function returns an array of objects containing metadata values for a given key and
     * property.
     * @param {string} key - a string representing the metadata key to search for
     * @param {unknown} property - unknown is a TypeScript type that represents any type of value. In
     * this case, the function is designed to accept any type of value for the `property` parameter.
     * @returns An array of objects that have metadata matching the provided key and property.
     */

    getMetaDatas(key: string, property: unknown): object[] {
        const values = new Array<object>();

        this.containers.forEach((tags, container) => {
            if(this.getOwnMetadata(container, key, property)) {
                values.push(container)
            }
        })

        return values;
    }

    /**
     * This function retrieves a metadata value from a container object using a specified key.
     * @param {object} container - The `container` parameter is an object that contains metadata
     * values.
     * @param {string} key - The key parameter is a string representing the metadata key for which you
     * want to retrieve the value from the container object.
     * @returns the value of the specified key in the container object, which is retrieved from a Map
     * using the container as the key. If the container is not found in the Map, the function returns
     * undefined.
     */
    getMetadataValue(container: object, key: string) {
        const val = this.containers.get(container)
        if(!val) return;
        
        return val[key];
    }

    /**
     * This function returns an object from a given identifier by searching through a collection of
     * containers and their associated metadata.
     * @param {string} id - The `id` parameter is a string representing the identifier of an object
     * that needs to be retrieved.
     * @returns the container object that has a metadata property with the key 'id' equal to the input
     * id string. If no container object is found with the matching metadata, the function will return
     * undefined.
     */
    getObjectFromIdentifier(id: string) {
        let res;
        
        this.containers.forEach((tags, container) => {
            if(this.getOwnMetadata(container, 'id', id)) {
                res = container;
            };
        });

        return res;
    }

    /**
     * This function retrieves metadata from a container object based on a given key and property.
     * @param {object} container - The `container` parameter is an object that contains metadata.
     * @param {string} key - The `key` parameter is a string that represents the metadata key to
     * retrieve from the `container` object.
     * @param {unknown} property - The `property` parameter is an unknown value that is being compared
     * to the value associated with the given `key` in the `container` object's metadata. It is not
     * clear what type of value `property` should be, as it is simply labeled as `unknown`.
     * @returns a boolean value. It returns `true` if the value of the `key` property in the
     * `container` object is equal to the `property` parameter, and `false` otherwise. If the `val`
     * variable is not defined, the function returns `undefined`.
     */

    getOwnMetadata(container: object, key: string, property: unknown) {
        const val = this.containers.get(container)
        if(!val) return;

        return val[key] === property
    }

    /**
     * The function adds metadata to a container object using the provided settings.
     * @param {object} container - The container parameter is an object that represents the HTML
     * element where the meta tags will be added.
     * @param {MetaTags} settings - MetaTags is likely an interface or type that defines the structure
     * of metadata for a container. It could include properties such as title, description, keywords,
     * author, etc. The `settings` parameter is an object that contains the metadata values for a
     * specific container.
     */
    
    addMetaData(container: object, settings: MetaTags) {
        const object = settings.container as LuaSourceContainer;
        if(!object.GetFullName().find(".ts.")) return;
        
        this.containers.set(container, settings);
    }
}

const Reflect = new Reflection();
export { Reflect };