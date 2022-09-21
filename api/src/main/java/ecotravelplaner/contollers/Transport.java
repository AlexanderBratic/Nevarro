package ecotravelplaner.contollers;

import ecotravelplaner.Model;
import ecotravelplaner.Vehicle;

public class Transport {
    private Vehicle vehicle;
    private Model model;
    private double distance; // in km
    private double emission; // CO2 in g/km
    private double c02; // total amount of C02 released in g

    public Transport(Vehicle vehicle, Model model, double distance, double emission){
        this.vehicle = vehicle; this.model = model; this.distance = distance; this.emission = emission;
        c02 = emission*distance;
    }

    public Vehicle getVehicle(){return this.vehicle;}
    public Model getModel(){return this.model;}
    public double getDistance(){return this.distance;}
    public double getEmission(){return this.emission;}
    public double getC02(){return this.c02;}

}
