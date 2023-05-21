-- Host: 167.172.108.73

# Create Users Table

CREATE TABLE `leinecke_COP4331`.`Users` ( `ID` INT NOT NULL AUTO_INCREMENT , `DateCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `DateLastLoggedIn` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `FirstName` VARCHAR(50) NOT NULL DEFAULT '' , `LastName` VARCHAR(50) NOT NULL DEFAULT '' , `Login` VARCHAR(50) NOT NULL DEFAULT '' , `Password` VARCHAR(50) NOT NULL DEFAULT '' , PRIMARY KEY (`ID`)) ENGINE = InnoDB;

CREATE TABLE `leinecke_COP4331`.`Colors` ( `ID` INT NOT NULL AUTO_INCREMENT , `Name` VARCHAR(50) NOT NULL DEFAULT '' , `UserID` INT NOT NULL DEFAULT '0' , PRIMARY KEY (`ID`)) ENGINE = InnoDB;

insert into Users (FirstName,LastName,Login,Password) VALUES ('Rick','Leinecker','RickL','COP4331');
insert into Users (FirstName,LastName,Login,Password) VALUES ('Mike','Burke','MikeB','footBall');
insert into Users (FirstName,LastName,Login,Password) VALUES ('Salma','Hassanin','SalmaH','tennis');
insert into Users (FirstName,LastName,Login,Password) VALUES ('Jack','Mabal','JackM','basketBall');
insert into Users (FirstName,LastName,Login,Password) VALUES ('Korinne','Ramcharitar','KorinneR','volleyBall');
insert into Users (FirstName,LastName,Login,Password) VALUES ('Schander','Joseph','SchanderJ','baseBall');


insert into Contacts(Name,Phone,Email,UserID) VALUES ('Rick Leinecker','4078230169','Richard.Leinecker@ucf.edu',1);
