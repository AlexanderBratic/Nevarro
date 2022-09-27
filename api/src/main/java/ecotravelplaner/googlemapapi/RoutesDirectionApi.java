package ecotravelplaner.googlemapapi;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * A class fore establishing a http connection to GoogleRoutsDirection Api
 */

public class RoutesDirectionApi {

    private String origin;
    private String destination;
    private String transprortationMean;
    private HttpURLConnection con;
    private String inPutLine;
    private String apiKey;


    public RoutesDirectionApi(String destination, String origin, String transportationMean, String apiKey) {
        this.destination = destination;
        this.origin = origin;
        this.transprortationMean = transportationMean; //mode in http request
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
                "&mode="+this.transprortationMean+
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
