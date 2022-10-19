package ecotravelplaner.googlemapapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Creates a connection to GoogleRoutsDirectionApi
 * This required three parameters origen, destination and transportationMean.
 * Where transportationMean is oneOf: driving walking bicycling or transit and default value is driving.
 * You will also need an apikey, put yore apikey in the document Nevarro//api//apiKey.
 * Else you will get a "MockResponse"
 * Address: http://localhost:8080/routes?origin=from&destination=to&mean=transportmedel
 */

@RestController
@RequestMapping(path="routes")

public class RoutesDirectionApiController {
    /** the service that handles the connection to GoogleDirectionAPI */
    private final RoutesDirectionApiService routesDirectionApiService;

    /**
     * constructor that initializes the routesDirectionApiService from a bean
     * @param routesDirectionApiService the service already initialized and save to a java bean by spring
     */
    @Autowired
    public RoutesDirectionApiController(RoutesDirectionApiService routesDirectionApiService){
        this.routesDirectionApiService = routesDirectionApiService;
    }

    /**
     * A handler for the http get request to /routes, the method params are the same as the query params in the url.
     * For example: http://localhost:8080/routes?origin=malmo&destination=stockholm&mean=driving.
     * The method will return a mock response if the apikey is not found in the file Nevarro//api//apiKey.
     * @param destination the destination of the route
     * @param origin the starting point of the route
     * @param mean the mean of transportation, can be oneOf: driving, walking, bicycling or transit
     * @return a JSON object as a String with the route information
     * @throws IOException if the mock response file is not found
     */
    @GetMapping@CrossOrigin(origins="*")
    public String routesDirection(@RequestParam String destination, @RequestParam String origin,
                                  @RequestParam (value = "mean", defaultValue = "driving")
                                          String mean) throws IOException {

        String pathToKey = "api//apiKey";
        String pathToMoch = "api//GoogleApiMockResponse.txt";
        String contents;
        Path keyPath = Paths.get(pathToKey);

        if(Files.exists(keyPath)){
            System.out.println("Try to load RoutsDirection apiKey");
            contents = Files.readString(keyPath); //apiKey
            // passes the parameters to the service
            return routesDirectionApiService.routesDirectionCon(destination, origin, mean, contents);
        }
        else{
            System.out.println("Try to load RoutsDirection mochfile");
            Path mochPath = Paths.get(pathToMoch);
            return Files.readString(mochPath); //mochResponse if no apiKey
        }
    }
}

