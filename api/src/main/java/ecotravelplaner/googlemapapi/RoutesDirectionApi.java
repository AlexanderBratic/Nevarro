package ecotravelplaner.googlemapapi;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * A class fore establishing a http connection to GoogleRoutsDirection Api
 * https://maps.googleapis.com/maps/api/directions/json?destination=place_id:ChIJWarIEjNifEYRp_-OvZUkBy4&origin=place_id:ChIJ1c_PFG1lfEYRofKh9NqTsrI&key=YoureKeyHere
 *         try {
 */

public class RoutesDirectionApi {

    private String origin;
    private String destination;
    private String mean;
    private HttpURLConnection con;
    private String inPutLine;
    private String apiKey;


    public RoutesDirectionApi(String destination, String origin, String mean, String apiKey) {
        this.destination = destination;
        this.origin = origin;
        this.mean = mean;
        this.apiKey = apiKey; //key in http request
    }

    /**
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
