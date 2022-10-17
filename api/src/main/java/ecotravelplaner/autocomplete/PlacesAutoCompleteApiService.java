package ecotravelplaner.autocomplete;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

@Service
public class PlacesAutoCompleteApiService {

    @GetMapping
    public String placesAutoCompleteCon(String input, String apiKey){
        return new PlacesAutoCompleteApi(input, apiKey).getInfo();
    }
}
