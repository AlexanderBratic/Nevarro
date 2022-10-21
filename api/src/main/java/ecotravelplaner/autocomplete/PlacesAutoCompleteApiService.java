package ecotravelplaner.autocomplete;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

@Service
public class PlacesAutoCompleteApiService {

    /**
     * Service for PlacesAutoCompleteApi where it proxies the handling of a connection to GooglePlacesAutoCompleteApi
     * @param input the input of the user
     * @param apiKey the apikey for GooglePlacesAutoCompleteApi
     * @return a JSON object as a String
     * @see PlacesAutoCompleteApi#getInfo()
     */
    @GetMapping
    public String placesAutoCompleteCon(String input, String apiKey){
        return new PlacesAutoCompleteApi(input, apiKey).getInfo();
    }
}
