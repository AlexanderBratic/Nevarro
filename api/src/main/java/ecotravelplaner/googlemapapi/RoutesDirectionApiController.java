package ecotravelplaner.googlemapapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
 * Address: http://localhost:8080/routes?origen=from&destination=to&transportationMean=transportmedel
 */

@RestController
@RequestMapping(path="routes")

public class RoutesDirectionApiController {
    private final RoutesDirectionApiService routesDirectionApiService;

    @Autowired
    public RoutesDirectionApiController(RoutesDirectionApiService routesDirectionApiService){
        this.routesDirectionApiService = routesDirectionApiService;
    }

    @GetMapping
    public String routesDirection(@RequestParam String destination, @RequestParam String origin,
                                  @RequestParam (value = "transportationMean", defaultValue = "driving")
                                          String transportationMean) throws IOException {

        String pathToKey = "api//apiKey";
        String pathToMoch = "api//GoogleApiMockResponse.txt";
        String contents;
        Path keyPath = Paths.get(pathToKey);

        if(Files.exists(keyPath)){
            System.out.println("Try to load apiKey");
            contents = Files.readString(keyPath);
            return routesDirectionApiService.routesDirectionCon(destination, origin, transportationMean, contents);
        }
        else{
            System.out.println("Try to load mochfile");
            Path mochPath = Paths.get(pathToMoch);
            return Files.readString(mochPath);
        }
    }
}
