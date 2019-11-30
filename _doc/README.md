There are two supported designs: 

```js
// designWithEnumDDL.sql

CREATE SCHEMA m141;
USE m141;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `registered` DATETIME NULL DEFAULT NULL,
  `lastlogin` DATETIME NULL DEFAULT NULL,
  `lastname` VARCHAR(45) NULL DEFAULT NULL,
  `firstname` VARCHAR(45) NULL DEFAULT NULL,
  `fullname` VARCHAR(91) GENERATED ALWAYS AS (concat(`firstname`,' ',`lastname`)) VIRTUAL,
  PRIMARY KEY (`id`));
  
 CREATE TABLE IF NOT EXISTS `task` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(45) NOT NULL,
  `startdate` DATE NULL DEFAULT (curdate()),
  `duedate` DATE NULL DEFAULT NULL,
  `priority` ENUM('niedrig', 'normal', 'hoch') NOT NULL DEFAULT 'normal',
  `status` ENUM('nicht begonnen', 'in Bearbeitung', 'erledigt', 'wartet auf jemanden', 'zurückgestellt') NOT NULL DEFAULT 'nicht begonnen',
  `user` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_idx` (`user` ASC) VISIBLE,
  CONSTRAINT `user`
    FOREIGN KEY (`user`)
    REFERENCES `user` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);
	
CREATE VIEW tasks AS
SELECT `task`.`id`, 
  `text`,
  `startdate`,
  `duedate`,
  `priority`,
  `status`,
  `user` AS kuser,
  `user`.`firstname` AS userfirst,
  `user`.`lastname` AS userlast,
  `user`.`fullname` AS userfull
FROM `task`
	JOIN `user` ON `task`.`user`=`user`.`id`;

/* Fill in some test users and tasks. 
   However, an encyrpted password cannot be set. 
   Use the API/GUI with bcrypt to set the encyrpted password  
*/
INSERT INTO `user`(firstname,lastname,username,registered) 
  VALUES ('Peter', 'Müller','peter@mueller',now());
INSERT INTO task(`text`,`user`) VALUES ('erste Aufgabe',1);

```

```js
// designWithEnumPostgresDDL.sql

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

```

```js
// designWithTablesDDL.sql

CREATE SCHEMA m141b;
USE m141b;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `registered` DATETIME NULL DEFAULT NULL,
  `lastlogin` DATETIME NULL DEFAULT NULL,
  `lastname` VARCHAR(45) NULL DEFAULT NULL,
  `firstname` VARCHAR(45) NULL DEFAULT NULL,
  `fullname` VARCHAR(91) GENERATED ALWAYS AS (concat(`firstname`,' ',`lastname`)) VIRTUAL,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `priority` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `priority` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE IF NOT EXISTS `status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE IF NOT EXISTS `task` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(255) NOT NULL,
  `done` TINYINT NOT NULL DEFAULT '0',
  `startdate` DATE NULL DEFAULT (curdate()),
  `duedate` DATE NULL DEFAULT NULL,
  `priority` INT NOT NULL DEFAULT '2',
  `user` INT NOT NULL DEFAULT '1',
  `status` INT NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  INDEX `status_idx` (`status` ASC) VISIBLE,
  INDEX `priority_idx` (`priority` ASC) VISIBLE,
  INDEX `user_idx` (`user` ASC) VISIBLE,
  CONSTRAINT `user`
    FOREIGN KEY (`user`)
    REFERENCES `user` (`id`),
  CONSTRAINT `priority`
    FOREIGN KEY (`priority`)
    REFERENCES `priority` (`id`),
  CONSTRAINT `status`
    FOREIGN KEY (`status`)
    REFERENCES `status` (`id`));
    
CREATE VIEW tasks AS
SELECT task.id, 
  `text`,
  startdate,
  duedate,
  task.priority AS kpriority,
  priority.priority,
  task.`status` AS kstatus,
  `status`.`status` AS `status`,
  task.`user` AS kuser,
  `user`.firstname AS userfirst,
  `user`.lastname AS userlast,
  `user`.fullname AS userfull
FROM task
  JOIN priority ON task.priority=priority.id
  JOIN `user` ON task.`user`=`user`.id
  JOIN `status` ON task.`status`=`status`.id;

/* Fill in some test data */
INSERT INTO `user`(username,firstname,registered) VALUES ('admin','Administrator',now());
INSERT INTO priority(priority) VALUES ('niedrig'),('normal'),('hoch');
INSERT INTO `status`(`status`) VALUES ('nicht begonnen'), ('in Bearbeitung'), ('erledigt'), ('wartet auf jemanden'), ('zurückgestellt');
INSERT INTO task(`text`) VALUES ('erste Aufgabe');
INSERT INTO tasks(`text`) VALUES ('zweite Aufgabe');

```


![alt Design With Enum][designWithEnum]
![alt Design with Tables][designWithTablesERD]

Paste the code below into the left pane of [sequencediagram.org] and see the diagram.</p>

```
title Anmeldeverfahren

participant User
participant "GUI / Axios" as GUI
participant API
participant "Datenbank" as DB
group Registrierung
User->GUI:Benutzer registriert sich
space -3
GUI->API:Axios POSTet Accountinfo an API Endpunkt /user
space -3
API->DB: API prüft, ob Benutzernane frei ist und trägt ihn ggf. in DB ein
end
group Anmeldung
User->GUI:Benutzer meldet sich an mit Benutzername und Passwort
GUI->API:Axios POSTet Credentials an API Endpunkt /user/login
space -3
API->DB: API schaut nach, ob der Benutzername existiert \nund prüft ggf. mit **jwt.compare()**, ob das Passwort korrekt ist
space -3
API->GUI: API erstellt Tokem mit **jwt.sign()** und sendet es ans GUI
GUI->GUI: GUI speichert das Token im Browser Store \nund fügt es dem Axios Header für weitere Anfragen hinzu
end

group Sitzung
User->GUI: Benutzer navigiert und/oder bearbeitet Daten
space -3
GUI->API: Axios verwendet das Token für seine Requests
space -3
API->API: API prüft mit **jwt.verify()**, ob das Token gültig ist, \nalso ob der Benutzer auf den jeweiligen Endpunkt zugreifen darf 
space -3
API->GUI: API antwortet entsprechend mit den angegefragten Daten \noder einem Hinweis, dass Authentisierung erfolderlich ist
end
group Abmeldung
User->GUI: Benutzer meldet sich ab.
GUI->GUI: Das Token wird im Browser Store gelöscht und in Axios gelöscht
end
```

[sequencediagram.org]: https://sequencediagram.org
[designWithEnum]: (designWithEnum.png)
[designWithTablesERD] (designWithTablesERD.png)