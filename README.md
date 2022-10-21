# Nevarro
Group project in DAT257 / DIT257 Agile software project management which is the Eco Travel Planner. 
The project is a web application that helps users to plan their trips in a more sustainable way. 
The application is built with react as frontend and java spring boot as backend.

### Links
[Trello](https://trello.com/invite/b/syo51Img/ATTI331a8775b7de6c06267cdac5edc7f0491EA7937E/agile-board)

### Directories
`Agile Planning` contains planning docs, relfections and so on.
`api` contains the java spring boot project, see the readme in it for how to run.
`web` contains the react project, see readme in it for how to run.

### Git username refrence (who is who)
```
Name              | Git username(s)
------------------------------------
Andin Blomgren    - lesonion
Jesper Jansson    - skruven96
Alen Mukaca       - ShinzenATT
Henning Dahlen    - Anaemix
Alexander Bratic  - AlexanderBratic
Tomas Alander     - tomasal5817
David Azizi       - QodeMaster, Dav
```

## Deploying the application
The production version of the application is deployed using docker to quickly deploy the application to a server.
To run the application locally then read the readmes in the api and web folder.
To run the docker images locally you need to have docker (or Docker Desktop for windows) installed 
and run the following command in the root directory of the project:
```bash
docker-compose up --build -d
```
or if you have docker compose V2 installed:
```bash
docker compose up --build -d
```
This will build the images and start the containers. The api will be available at http://localhost:8080 and the web application at http://localhost.


## Sources for the data in the application
Sources for the different modes of transportation can be found in:
./api/VariousCO2e transport modes.txt
./web/src/co2_transport.json
There are no sources for the items on the comparison page but the data is here:
./web/src/items.json
