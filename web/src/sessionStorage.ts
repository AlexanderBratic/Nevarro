import {SessionStorageTypes} from "../types/sessionStorageTypes";

const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

/**
 * Get an item from the session storage matching the given key. If the item does not exist, the default value is returned.
 * @param key The key of the item to get.
 * @param defaultValue The default value to return if the item does not exist.
 */
function getItem(key: SessionStorageTypes, defaultValue: number|boolean|object|string) {
	if (!isBrowser)
		return defaultValue;
	let sessionValue = window.sessionStorage[key];
	if (sessionValue === undefined)
		return defaultValue;

	if (typeof defaultValue === 'number')
		return parseFloat(sessionValue);
	if (typeof sessionValue === 'boolean')
		return defaultValue === 'true';
	if (typeof sessionValue === 'object')
		return JSON.parse(sessionValue);
	return sessionValue;
}

/**
 * Get an item from the session storage matching the given key and infers type T on it.
 * If the item does not exist, the default value is returned.
 * @param key The key of the item to get.
 * @param defaultValue The default value to return if the item does not exist.
 * @see getItem
 * @see JSON.parse
 */
function getTypedItem<T>(key: SessionStorageTypes, defaultValue: T): T{
    if (!isBrowser)
        return defaultValue;
    const sessionValue = window.sessionStorage[key];
    if (sessionValue === undefined)
        return defaultValue;

    return JSON.parse(sessionValue); // json parse handles all types
}

/**
 * Set an item in the session storage matching the given key.
 * @param key The key of the item to set.
 * @param value The value to set.
 * @returns True if the item was set, false otherwise.
 * @see JSON.stringify
 */
function setItem(key: SessionStorageTypes, value: any): boolean {
	if (isBrowser) {
		let storedValue: string;
		if (typeof value === 'number')
			storedValue = value.toString();
		else if (typeof value === 'boolean')
			storedValue = value ? 'true' : 'false';
		else
			storedValue = JSON.stringify(value); // json stringify handles all types


		window.sessionStorage.setItem(key, storedValue);
		return true;
	}

	return false;
}

/**
 * Update an object in the session storage matching the given key. If the item does not exist, the value is set.
 * Use this function to update a single or few properties of an object in the session storage otherwise use setItem.
 * @param key The key of the item to update.
 * @param value The object with the properties to update.
 * @returns True if the item was updated, otherwise false when the client is not a browser
 *          or the stored value is not an object.
 * @see setItem
 */
function updateItemObj(key: SessionStorageTypes, value: object): boolean {
    if (!isBrowser) {
        return false;
    }

    let sessionValue = window.sessionStorage[key];
    if (sessionValue === undefined) {
        sessionValue = {};
    } else {
        sessionValue = JSON.parse(sessionValue);
        if(typeof sessionValue !== 'object') {
            return false;
        }
    }

    // merge the two objects where the second object overwrites the first if there are any duplicate keys
    sessionValue = {...sessionValue, ...value};
    window.sessionStorage.setItem(key, JSON.stringify(sessionValue));

    return true;
}


export { setItem, getItem, getTypedItem, updateItemObj };
