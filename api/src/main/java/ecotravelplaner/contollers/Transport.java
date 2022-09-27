package ecotravelplaner.contollers;

import ecotravelplaner.Model;
import ecotravelplaner.Vehicle;

public class Transport {
    private Vehicle vehicle;
    private Model model;
    private String reg; //registreringskylt ex: EEN095
    private double distance; // in km
    private double emission; // CO2 in g/km
    private double c02; // total amount of C02 released in g

    public Transport(Vehicle vehicle, Model model, String reg, double distance, double emission){
        this.vehicle = vehicle; this.model = model; this.reg = reg; this.distance = distance; this.emission = emission;
        c02 = emission*distance;
    }

    public Vehicle getVehicle(){return this.vehicle;}
    public void setVehicle(Vehicle vehicle){this.vehicle = vehicle;}
    public Model getModel(){return this.model;}
    public void setModel(Model model){this.model = model;}
    public String getReg(){return this.reg;}
    public void setReg(String reg){this.reg = reg;}
    public double getDistance(){return this.distance;}
    public void setDistance(double distance){this.distance = distance;}
    public double getEmission(){return this.emission;}
    public void setEmission(double emission){this.emission = emission;}
    public double getC02(){return this.c02;}
    public void setC02(double c02) {this.c02 = c02;}
}
