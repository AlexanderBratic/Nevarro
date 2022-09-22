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
 * Creats a connection to GoogleRoutsDirectionApi
 * This required three parameters origen, destination and transportationMean. You will also need an apikey.
 * Else you will get a "MockRespons"
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

        String pathToKey = "//Users//tomasalander//Desktop//DAT257//apiKey";
        String pathToMoch = "//Users//tomasalander//Desktop//Nevarro-GoogleApi//api//GoogleApiMockResponse.txt";
        String contents;
        Path keyPath = Paths.get(pathToKey);

        if(Files.exists(keyPath)){
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

