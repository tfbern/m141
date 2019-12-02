# Aufgabenmanager
This is a demo app. It has been developed during ICT module 141 at <a href="http://www.tfbern.ch" target="_blank">Technische Fachschule Bern</a>. The application consists of tree parts: the database, the API and the GUI.

## Database
The database can be either relational database supported by knex. We have tested MySQL and PostgreSQL.
The data model mainly consists of the two entities *user* and *task*. To setup such a database, the [SQL DDL statements](_doc) are provided. There are two supported designs: one making use of [columns with the ENUM data type](_doc/designWithEnum.png) and another using [lookup tables](_doc/designWithTablesERD.png).

## Application Programming Interface (API)
There is a [REST API](server) that provides access to the database via HTTP/JSON for the application.

## Grafical User Interface (GUI)
There is a [grafical user interface](client) programmed with vue.js that uses the API.

# Development
To start the Server/API change to [server](server) and run ```nodemon```. This will start the API and also serve static content in the [server/gui](server/gui) folder, if available. This folder contains the latest build of the GUI.

For GUI development start the development server by changing to [client](client) folder and running ```npm run serve```.
You can build the GUI by running ```npm run build```.

# Hosting
The application can be hosted locally, at <a href="http://www.heroku.com" target="_blank">Heroku</a> or any other host that supports node.js.

## Hosting at Heroku
If hosting at heroku you must upload a package that contains a *package.json* file in the root folder. Heroku will then compile the project and start it using ```npm start```. Heroku will provide the environment variables *process.env.PORT* and *process.env.DATABASE_URL*, hence the application must use them as port and database connection string. 

