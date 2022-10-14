/**
 * Function to connect to AutoCompleteApiService.
 */

import {AutoCompleteType} from "../types/sessionStorageTypes";

async function autoCompleteRequest(input: string): Promise<AutoCompleteType> {
    let httpAddress= {url:"http://localhost:8080/autocomplete?input="+input};
    let data: AutoCompleteType = await fetch(httpAddress.url)
        .then(response => response.json())

    return data;
}

export {autoCompleteRequest};
