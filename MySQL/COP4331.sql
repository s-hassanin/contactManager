-- Host: 167.172.108.73

# Create Users Table


CREATE TABLE `COP4331`.`Users`
(
    `ID` INT NOT NULL AUTO_INCREMENT ,
    `DateCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    `DateLastLoggedIn` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    `FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
    `LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
    `Login` VARCHAR(50) NOT NULL DEFAULT '' ,
    `Password` VARCHAR(50) NOT NULL DEFAULT '' ,
    PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

CREATE TABLE `COP4331`.`Contacts`
(
    `ContactID` INT NOT NULL AUTO_INCREMENT ,
    `UserID` INT NOT NULL,
    `FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
    `LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
    `Phone` VARCHAR(50) NOT NULL DEFAULT '' ,
    `Email` VARCHAR(50) NOT NULL DEFAULT '' ,
    CONSTRAINT FK_ID FOREIGN KEY (UserID) REFERENCES Users(ID),
    PRIMARY KEY (`ContactID`)
) ENGINE = InnoDB;


insert into Users (FirstName,LastName,Login,Password) VALUES ('Rick','Leinecker','RickL','COP4331');
insert into Users (FirstName,LastName,Login,Password) VALUES ('Mike','Burke','MikeB','footBall');
insert into Users (FirstName,LastName,Login,Password) VALUES ('Salma','Hassanin','SalmaH','tennis');
insert into Users (FirstName,LastName,Login,Password) VALUES ('Jack','Mabal','JackM','basketBall');
insert into Users (FirstName,LastName,Login,Password) VALUES ('Korinne','Ramcharitar','KorinneR','volleyBall');
insert into Users (FirstName,LastName,Login,Password) VALUES ('Schander','Joseph','SchanderJ','baseBall');


insert into Contacts(FirstName,LastName,Phone,Email,UserID) VALUES ('Rick', 'Leinecker','4078230169','Richard.Leinecker@ucf.edu',1);
insert into Contacts(FirstName,LastName,Phone,Email,UserID) VALUES ('Sam', 'Smith','4078237799','Sam.smith@gmail.com',1);
insert into Contacts(FirstName,LastName,Phone,Email,UserID) VALUES ('William', 'Jiovani','4079907799','w.jio@gmail.com',1);
insert into Contacts(FirstName,LastName,Phone,Email,UserID) VALUES ('Kylie', 'Esteleniski','4076007129','kylieE@gmail.com',1);

insert into Contacts(FirstName,LastName,Phone,Email,UserID) VALUES ('Luis', 'Gonzalez','4077651234','lgon7334@gmail.com',2);
insert into Contacts(FirstName,LastName,Phone,Email,UserID) VALUES ('Nathan', 'Carter','4074653578','nathan342@gmail.com',2);

insert into Contacts(FirstName,LastName,Phone,Email,UserID) VALUES ('Adam', 'Wilson','9973451243','Adamw490@outlook.com',3);
insert into Contacts(FirstName,LastName,Phone,Email,UserID) VALUES ('Juan', 'Martinez','9978904357','jmartinez77@outlook.com',3);
insert into Contacts(FirstName,LastName,Phone,Email,UserID) VALUES ('Jessica', 'Brown','8892134454','jbrown890@hotmail.com',3);

insert into Contacts(FirstName,LastName,Phone,Email,UserID) VALUES ('Aly', 'buradi','7198806655','alya22@gmail.com',4);

insert into Contacts(FirstName,LastName,Phone,Email,UserID) VALUES ('Jasmine', 'Cooper','6658902134','jcooper11@gmail.com',5);


