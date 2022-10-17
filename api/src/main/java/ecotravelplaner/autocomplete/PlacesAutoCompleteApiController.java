package ecotravelplaner.autocomplete;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

    /**
     * Creates a connection to GooglePlacesAutoCompleteApi
     * This required one parameter input as a String.
     * You will also need an apikey, put yore apikey in the document Nevarro//api//apiKey.
     * Else you will get a "MockResponse"
     * Address: http://localhost:8080/autocomplete?input=YourInputGoesHere
     */

    @RestController
    @RequestMapping(path="autocomplete")
    public class PlacesAutoCompleteApiController {
        private final PlacesAutoCompleteApiService placesAutoCompleteService;

        @Autowired
        public PlacesAutoCompleteApiController(PlacesAutoCompleteApiService placesAutoCompleteApiService){
            this.placesAutoCompleteService = placesAutoCompleteApiService;
        }

        @GetMapping @CrossOrigin(origins="*")
        public String autoComplete(@RequestParam String input) throws IOException {
            String pathToKey = "api//apiKey";
            String pathToMoch = "api//AutoCompleteMockResponse.txt";
            String contents;
            Path keyPath = Paths.get(pathToKey);

            if(Files.exists(keyPath)){
                System.out.println("Try to load autoComplete apiKey");
                contents = Files.readString(keyPath); //apiKey
                return placesAutoCompleteService.placesAutoCompleteCon(input, contents);
            }
            else{
                System.out.println("Try to load autoComplete Mochfile");
                Path mochPath = Paths.get(pathToMoch);
                return Files.readString(mochPath);
            }
        }
    }

