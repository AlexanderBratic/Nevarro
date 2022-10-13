/**
 * Function to connect to AutoCompleteApiService.
 */
import {setItem, updateItemObj} from "./sessionStorage";
import {AutoCompleteType} from "../types/sessionStorageTypes"; //Hjälp med detta!!

async function autoCompleteRequest(input: string): Promise<AutoCompleteType> {
    let httpAddress= {url:"http://localhost:8080/autocomplete?input="+input};
    let data: AutoCompleteType = await fetch(httpAddress.url)
        .then(response => response.json())
    setItem('googleautocomplete',data)

    setItem('comparison', {somename: input});
    return data;
}

export {dirRequest};
