CREATE SCHEMA m141;
USE m141;

CREATE TABLE IF NOT EXISTS `user` (
  `id` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `registered` DATETIME NULL DEFAULT NULL,
  `lastlogin` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `priority` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `priority` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE IF NOT EXISTS `status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE IF NOT EXISTS `owner` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lastname` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `fullname` VARCHAR(91) GENERATED ALWAYS AS (concat(`firstname`,' ',`lastname`)) VIRTUAL,
  PRIMARY KEY (`id`));
  
CREATE TABLE IF NOT EXISTS `task` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(45) NOT NULL,
  `done` TINYINT NOT NULL DEFAULT '0',
  `startdate` DATE NULL DEFAULT (curdate()),
  `duedate` DATE NULL DEFAULT NULL,
  `priority` INT NOT NULL DEFAULT '2',
  `owner` INT NOT NULL DEFAULT '1',
  `status` INT NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  INDEX `status_idx` (`status` ASC) VISIBLE,
  INDEX `priority_idx` (`priority` ASC) VISIBLE,
  INDEX `owner_idx` (`owner` ASC) VISIBLE,
  CONSTRAINT `owner`
    FOREIGN KEY (`owner`)
    REFERENCES `owner` (`id`),
  CONSTRAINT `priority`
    FOREIGN KEY (`priority`)
    REFERENCES `priority` (`id`),
  CONSTRAINT `status`
    FOREIGN KEY (`status`)
    REFERENCES `status` (`id`));
    
CREATE VIEW tasks AS
SELECT task.id, 
	`text`,
	done,
	startdate,
	duedate,
	task.priority AS kpriority,
	priority.priority,
	task.`status` AS kstatus,
	`status`.`status` AS `status`,
	task.`owner` AS kowner,
	`owner`.firstname AS ownerfirst,
	`owner`.lastname AS ownerlast,
	`owner`.fullname AS ownerfull
FROM task
	JOIN priority ON task.priority=priority.id
	JOIN `owner` ON task.`owner`=`owner`.id
	JOIN `status` ON task.`status`=`status`.id;

/* Fill in some test data */
INSERT INTO `owner`(lastname, firstname) VALUES ('Muster', 'Max');
INSERT INTO priority(priority) VALUES ('niedrig'),('normal'),('hoch');
INSERT INTO `status`(`status`) VALUES ('nicht begonnen'), ('in Bearbeitung'), ('erledigt'), ('wartet auf jemanden'), ('zurückgestellt');
INSERT INTO task(`text`) VALUES ('erste Aufgabe');
INSERT INTO tasks(`text`) VALUES ('zweite Aufgabe');
