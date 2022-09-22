package ecotravelplaner.contollers;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
public class RouteController {
    @GetMapping(path = "/route", produces = MediaType.APPLICATION_JSON_VALUE)
    public Route getRoute(@RequestParam(value = "from", defaultValue = "Göteborg") String from,
                          @RequestParam(value = "to", defaultValue = "Stockholm") String to) {
        return new Route(from, to);
    }

    // the api endpoint for /route, that receives and returns a json object of Route
    @PostMapping(path = "/route", produces = "application/json", consumes = "application/json")
    public Route postRoute(@RequestBody Route data) {

        return data;
    }
}
