package ecotravelplaner.googlemapapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Creats a connection to GoogleRoutsDirectionApi
 * This requred four parameters origen, destination, transportationMean and apiKey
 * Address: http://localhost:8080/routes?origen=from&destination=to&transportationMean=transportmedel&apiKey=apinyckel
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
                                                 @RequestParam String transportationMean, @RequestParam String apiKey){
       // if(true) //Apitextfile exist
        return routesDirectionApiService.routesDirectionCon(destination, origin, transportationMean, apiKey);
       // else return toString(jsontext.txt)
    }
}
