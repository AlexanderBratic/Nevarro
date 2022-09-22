
const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();
function getItem(key: string, value: number|boolean|object|string) {
	if (!isBrowser)
		return value;
	let sessionValue = window.sessionStorage[key];
	if (sessionValue === undefined)
		return value;
	
	if (typeof value === 'number')
		return parseFloat(sessionValue);
	if (typeof sessionValue === 'boolean')
		return value === 'true';
	if (typeof sessionValue === 'object')
		return JSON.parse(sessionValue);
	return sessionValue;
}
function setItem(key: string, value: number|boolean|object|string) {
	if (isBrowser) {
		let storedValue = value;
		if (typeof value === 'number')
			storedValue = value.toString();
		else if (typeof value === 'boolean')
			storedValue = value ? 'true' : 'false';
		else if (typeof value === 'object')
			storedValue = JSON.stringify(value);
		
		
		window.sessionStorage.setItem(key, storedValue);
		return true;
	}

	return false;
}


export { setItem, getItem };
