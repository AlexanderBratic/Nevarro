package ecotravelplaner.contollers;

import ecotravelplaner.Vehicle;
import ecotravelplaner.Model;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.bind.annotation.*;
import java.lang.Double;

import java.awt.*;

@RestController
public class TransportController {
    @GetMapping(path = "/transport", produces = MediaType.APPLICATION_JSON_VALUE)
    public Transport getTransport(@RequestParam (value = "vehicle", defaultValue = "NONE") String vehicle,
                                  @RequestParam (value = "model", defaultValue = "NONE") String model,
                                  @RequestParam (value = "reg", defaultValue = "EEN095") String reg,
                                  @RequestParam (value = "distance", defaultValue = "0") String distance,
                                  @RequestParam (value = "emission", defaultValue = "0") String emission) {

        return new Transport(Vehicle.valueOf(vehicle), Model.valueOf(model), reg, Double.parseDouble(distance), Double.parseDouble(emission));
    }

    // the api endpoint for /transport, that receives and returns a json object of Transport
    @PostMapping(path = "/transport", produces = "application/json", consumes = "application/json")
    public Transport postTransport(@RequestBody Transport data) {

        return data;
    }
}
