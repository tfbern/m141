CREATE TYPE role AS ENUM('user', 'admin');
CREATE TYPE priority AS ENUM('niedrig', 'normal', 'hoch');
CREATE TYPE status AS ENUM('nicht begonnen', 'in Bearbeitung', 'erledigt', 'wartet auf jemanden', 'zurückgestellt');

CREATE TABLE IF NOT EXISTS "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(45) NOT NULL,
  "role" role DEFAULT 'user',
  "password" VARCHAR(255) NULL DEFAULT NULL,
  "registered" DATE NULL DEFAULT NULL,
  "lastlogin" DATE NULL DEFAULT NULL,
  "lastname" VARCHAR(45) NULL DEFAULT NULL,
  "firstname" VARCHAR(45) NULL DEFAULT NULL,
  "fullname" VARCHAR(45) NULL DEFAULT NULL
 );

 CREATE TABLE IF NOT EXISTS "task" (
  "id" SERIAL PRIMARY KEY,
  "text" VARCHAR(45) NOT NULL,
  "startdate" DATE NULL DEFAULT (current_date),
  "duedate" DATE NULL DEFAULT NULL,
  "priority" priority NOT NULL DEFAULT 'normal',
  "status" status NOT NULL DEFAULT 'nicht begonnen',
  "user" INT NULL DEFAULT NULL,
  CONSTRAINT "user"
    FOREIGN KEY ("user")
    REFERENCES "user" ("id")
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);
    
CREATE VIEW tasks AS
SELECT "task"."id", 
  "text",
  "startdate",
  "duedate",
  "priority",
  "status",
  "user" AS kuser,
  "user"."firstname" AS userfirst,
  "user"."lastname" AS userlast,
  concat("user".firstname,' ', "user".lastname) AS userfull
FROM "task"
  JOIN "user" ON "task"."user"="user"."id";

INSERT INTO "user"(firstname,lastname,username,registered) 
  VALUES ('Peter', 'Müller','pm',now());
  
INSERT INTO task(text,"user") VALUES ('erste Aufgabe',1);
