package ecotravelplaner.contollers;

//Saves the travel search. From == startpoint and to == destination
public class Route {
    private String from;
    private String to;

    public Route(String from, String to){
        this.from = from;
        this.to = to;
    }

    public String getFrom() {return from;}
    public void setFrom(String from){this.from = from;}
    public String getTo(){return to;}
    public void setTo(String to){this.to = to;}
}
