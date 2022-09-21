package ecotravelplaner.contollers;

import ecotravelplaner.Vehicle;
import ecotravelplaner.Model;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.bind.annotation.*;

import java.awt.*;

@RestController
public class TransportController {
    @GetMapping(path = "/transport", produces = MediaType.APPLICATION_JSON_VALUE)
    public Transport getTransport() {

        return new Transport(Vehicle.CAR, Model.SEDAN, 15.7, 149.2);
    }

    // the api endpoint for /, that receives and returns a json object of hello world
    @PostMapping(path = "/transport", produces = "application/json", consumes = "application/json")
    public Transport postHelloWorld(@RequestBody Transport data) {

        return data;
    }
}
