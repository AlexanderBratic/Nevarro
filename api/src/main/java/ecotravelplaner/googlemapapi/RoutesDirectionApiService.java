package ecotravelplaner.googlemapapi;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

@Service
public class RoutesDirectionApiService {

    /**
     * Service for RoutesDirectionApi where it proxies the handling of a connection to GoogleRoutesDirectionApi
     * @param destination the destination of the route
     * @param origin the starting point of the route
     * @param mean the mean of transportation, can be oneOf: driving, walking, bicycling or transit
     * @param apiKey the apikey for GoogleRoutesDirectionApi
     * @return a JSON object as a String
     * @see RoutesDirectionApi#getInfo()
     */
    @GetMapping
    public String routesDirectionCon(String destination, String origin,
                                     String mean, String apiKey){
        return new RoutesDirectionApi(destination, origin, mean, apiKey).getInfo();
    }
}

