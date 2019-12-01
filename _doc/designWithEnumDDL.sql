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
  `text` VARCHAR(255) NOT NULL,
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
