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
        /** the service that handles the connection to GooglePlacesAutoCompleteApi */
        private final PlacesAutoCompleteApiService placesAutoCompleteService;

        /**
         * constructor that initializes the placesAutoCompleteService from a bean
         * @param placesAutoCompleteApiService the service already initialized and save to a java bean by spring
         */
        @Autowired
        public PlacesAutoCompleteApiController(PlacesAutoCompleteApiService placesAutoCompleteApiService){
            this.placesAutoCompleteService = placesAutoCompleteApiService;
        }

        /**
         * A handler for the http get request to /autocomplete, the method params are the same as the query params in the url.
         * For example: http://localhost:8080/autocomplete?input=malmo.
         * @param input the input to be autocompleted
         * @return a JSON object as a String with the autocomplete suggestions
         * @throws IOException if the mock response file is not found
         */
        @GetMapping @CrossOrigin(origins="*")
        public String autoComplete(@RequestParam String input) throws IOException {
            String pathToKey = "apiKey";
            String pathToMoch = "AutoCompleteMockResponse.txt";
            String contents;
            Path keyPath = Paths.get(pathToKey);

            if(Files.exists(keyPath)){
                System.out.println("Try to load autoComplete apiKey");
                contents = Files.readString(keyPath); //apiKey
                // passes the parameters to the service
                return placesAutoCompleteService.placesAutoCompleteCon(input, contents);
            }
            else if(Files.exists(Path.of("api//" + pathToKey))){
                System.out.println("Try to load autoComplete apiKey");
                contents = Files.readString(Path.of("api//" + pathToKey)); //apiKey
                // passes the parameters to the service
                return placesAutoCompleteService.placesAutoCompleteCon(input, contents);
            }
            else if(Files.exists(Path.of("api//" + pathToMoch))){
                System.out.println("Try to load autoComplete Mochfile");
                Path mochPath = Path.of("api//" + pathToMoch); //MockResponse
                return Files.readString(mochPath);
            }
            else{
                System.out.println("Try to load autoComplete Mochfile");
                Path mochPath = Paths.get(pathToMoch); //MockResponse
                return Files.readString(mochPath);
            }
        }
    }

