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
    REFERENCES `user` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `priority`
    FOREIGN KEY (`priority`)
    REFERENCES `priority` (`id`),
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `status`
    FOREIGN KEY (`status`)
    REFERENCES `status` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);
    
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
