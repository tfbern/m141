# Task manager
This is task manager. The application consists of two parts, the GUI and the API. For the third part, the database, only the SQL DDL statements are provided in order to setup such a database.

To start the Server/API change to */server/* and run ```nodemon```. This will start the API and also serve static content in the /server/gui folder. The folder contains the last build of the GUI.

For GUI development start the development server by changing to */client/* and running ```npm run serve```.
You can build the GUI by running ```npm run build```.

## Database
It is assumed that you use MySQL 8 database.
Here you will only find the SQL DDL statements to create such a database. 
The API supports currently MySQL and PostgreSQL databases in two degins, see the [doc].
Since the API abstracts the database, the GUI supports all combinations.

[doc]: /doc
