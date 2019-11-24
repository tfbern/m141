CREATE SCHEMA m141;
USE m141;

CREATE TABLE IF NOT EXISTS `m141`.`task` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(45) NOT NULL,
  `startdate` DATE NULL DEFAULT (curdate()),
  `duedate` DATE NULL DEFAULT NULL,
  `priority` ENUM('niedrig', 'normal', 'hoch') NOT NULL DEFAULT 'normal',
  `status` ENUM('nicht begonnen', 'in Bearbeitung', 'erledigt', 'wartet auf jemanden', 'zurückgestellt') NOT NULL DEFAULT 'nicht begonnen',
  `user` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_idx` (`user` ASC) VISIBLE,
  CONSTRAINT `user`
    FOREIGN KEY (`user`)
    REFERENCES `m141`.`user` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)

CREATE TABLE IF NOT EXISTS `m141`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `registered` DATETIME NULL DEFAULT NULL,
  `lastlogin` DATETIME NULL DEFAULT NULL,
  `lastname` VARCHAR(45) NULL DEFAULT NULL,
  `firstname` VARCHAR(45) NULL DEFAULT NULL,
  `fullname` VARCHAR(91) GENERATED ALWAYS AS (concat(`firstname`,_utf8mb4' ',`lastname`)) VIRTUAL,
  PRIMARY KEY (`id`))

/* Fill in some test user */
INSERT INTO `user`(firstname,lastname,username,registered) 
VALUES ('Peter', 'Müller','peter@mueller',now());
/* Fill in some test task */
INSERT INTO task(`text`,`user`) VALUES ('erste Aufgabe',1);
