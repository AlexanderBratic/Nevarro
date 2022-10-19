package ecotravelplaner.googlemapapi;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * A class fore establishing a http connection to GoogleRoutsDirection Api
 * https://maps.googleapis.com/maps/api/directions/json?destination=place_id:ChIJWarIEjNifEYRp_-OvZUkBy4&origin=place_id:ChIJ1c_PFG1lfEYRofKh9NqTsrI&key=YoureKeyHere
 */

public class RoutesDirectionApi {

    /** the starting point of the route */
    private String origin;
    /** the destination of the route */
    private String destination;
    /** the mean of transportation, can be oneOf: driving, walking, bicycling or transit */
    private String mean;
    /** the connection to GoogleRoutsDirectionApi */
    private HttpURLConnection con;
    /** current line of the response */
    private String inPutLine;
    /** the apikey for GoogleRoutsDirectionApi */
    private String apiKey;

    /**
     * Constructor for RoutesDirectionApi where it takes the parameters and saves them as class variables.
     * @param destination the destination of the route
     * @param origin the starting point of the route
     * @param mean the mean of transportation, can be oneOf: driving, walking, bicycling or transit
     * @param apiKey the apikey for GoogleRoutesDirectionApi
     */
    public RoutesDirectionApi(String destination, String origin, String mean, String apiKey) {
        this.destination = destination;
        this.origin = origin;
        this.mean = mean;
        this.apiKey = apiKey; //key in http request
    }

    /**
     * Method for getting the response from GoogleRoutsDirectionApi and returning it as a String.
     * It uses the class variables to create the http request.
     * @return A JSON object as a String
     */
    public String getInfo() {
        String ret = "";

        String urlAdress = "https://maps.googleapis.com/maps/api/directions/json" +
                "?destination="+this.destination+
                "&origin="+this.origin+
                "&mean="+this.mean+
                "&key="+this.apiKey;
        try {
            this.con = this.getConnected(urlAdress);
            for (BufferedReader reader = new BufferedReader(new InputStreamReader(this.con.getInputStream()));
                 (this.inPutLine = reader.readLine()) != null;
                 ret = ret + this.inPutLine) {
            }
        } catch (IOException var11) {
            var11.printStackTrace();
        } finally {
            this.con.disconnect();
        }
        return ret;
    }

    /**
     * Method for establishing a connection to GoogleRoutsDirectionApi
     * @param urlAddress the url to connect to
     * @return a HttpURLConnection
     * @throws IOException if the connection fails
     */
    private HttpURLConnection getConnected(String urlAddress) throws IOException {
        URL url = new URL(urlAddress);
        this.con = (HttpURLConnection)url.openConnection();
        this.con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        this.con.setConnectTimeout(10000);
        this.con.getReadTimeout();
        int connectionInfo = this.con.getResponseCode();
        System.out.println("GoogleApi response code " + connectionInfo);
        return this.con;
    }
}
