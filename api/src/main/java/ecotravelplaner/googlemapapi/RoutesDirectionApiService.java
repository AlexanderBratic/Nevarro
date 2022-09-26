package ecotravelplaner.googlemapapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

@Service
public class RoutesDirectionApiService {
 //   private final RoutesDirectionApi routesDirectionApi;
/*
    @Autowired
    public RoutesDirectionApiService(RoutesDirectionApi routesDirectionApi){
        this.routesDirectionApi = routesDirectionApi;
    }

 */
    @GetMapping
    public String routesDirectionCon(String destination, String origin,
                                     String transportationMean, String apiKey){
        //return routesDirectionApi(destination, origin, transportationMean, apiKey).getInfo();
        return new RoutesDirectionApi(destination, origin, transportationMean, apiKey).getInfo();
    }
}
