package ecotravelplaner.contollers;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.bind.annotation.*;

import java.awt.*;

@RestController
public class HelloWorld {


    // the json response object
    public static class HelloWorldData {
        public String hello = "world";
        public String test = "success";
    }

    // the api endpoint for /, returns a json object of hello world
    @GetMapping(path = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public HelloWorldData getHelloWorld() {

        return new HelloWorldData();
    }

    // the api endpoint for /, that receives and returns a json object of hello world
    @PostMapping(path = "/", produces = "application/json", consumes = "application/json")
    public HelloWorldData postHelloWorld(@RequestBody HelloWorldData data) {

        return data;
    }
}
