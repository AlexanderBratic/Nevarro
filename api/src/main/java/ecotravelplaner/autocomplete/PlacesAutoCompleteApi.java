package ecotravelplaner.autocomplete;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * A class fore establishing a http connection to GooglePlaces Auto Complete Api
 * Addres: https://maps.googleapis.com/maps/api/place/autocomplete/json?input=InPutStringGoesHere&components=country:se&key=YoureApiKeyGoesHere
 */


public class PlacesAutoCompleteApi {

    private HttpURLConnection con;
    private String input;
    private String inPutLine;
    private String apiKey;

    public PlacesAutoCompleteApi(String input, String apiKey) {
        this.input = input;
        this.apiKey = apiKey; //key in http request
    }

    /**
     * @return A JSON object as a String
     */

    public String getInfo() {
        String ret = "";
        String urlAdress = "https://maps.googleapis.com/maps/api/place/autocomplete/json?" +
                "input=" + this.input+
                "&components=country:se"+
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


