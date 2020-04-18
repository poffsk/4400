DROP DATABASE IF EXISTS cs4400spring2020;
CREATE DATABASE cs4400spring2020;
USE cs4400spring2020;

-- The following command turns off the Safe Update checks so that your
-- UPDATE and DELETE queries will work without restrictions.  You don't
-- have to replicate this command anywhere else in your code.
SET SQL_SAFE_UPDATES = 0;

CREATE TABLE cs4400spring2020.`User`(
    username VARCHAR(55) PRIMARY KEY,
    `password` VARCHAR(255) NOT NULL,
    firstName VARCHAR(55) NOT NULL,
    lastName VARCHAR(55) NOT NULL,
    UNIQUE(firstName, lastName)
);

CREATE TABLE cs4400spring2020.Building (
	buildingName VARCHAR(55) PRIMARY KEY,
    description TEXT NOT NULL
);

CREATE TABLE cs4400spring2020.Station (
	stationName VARCHAR(55) PRIMARY KEY,
    buildingName VARCHAR(55) NOT NULL UNIQUE,
    capacity INT NOT NULL,
    FOREIGN KEY (buildingName) REFERENCES Building (buildingName)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE cs4400spring2020.Food (
	foodName VARCHAR(55) PRIMARY KEY
);

CREATE TABLE cs4400spring2020.Customer (
	username VARCHAR(55) PRIMARY KEY,
    balance DECIMAL(6, 2) NOT NULL,
    stationName VARCHAR(55),
    FOREIGN KEY (stationName) REFERENCES Station (stationName)
		ON DELETE SET NULL ON UPDATE RESTRICT,
	FOREIGN KEY (username) REFERENCES `User` (username)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE cs4400spring2020.Employee (
	username VARCHAR(55) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (username) REFERENCES `User` (username)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE cs4400spring2020.Manager (
	username VARCHAR(55) PRIMARY KEY,
    FOREIGN KEY (username) REFERENCES Employee (username)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE cs4400spring2020.FoodTruck (
	foodTruckName VARCHAR(55) PRIMARY KEY,
    stationName VARCHAR(55) NOT NULL,
    managerUsername VARCHAR(55) NOT NULL,
    FOREIGN KEY (stationName) REFERENCES Station (stationName)
		ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (managerUsername) REFERENCES Manager (username)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE cs4400spring2020.Staff (
	username VARCHAR(55) PRIMARY KEY,
    foodTruckName VARCHAR(55),
    FOREIGN KEY (username) REFERENCES Employee (username)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (foodTruckName) REFERENCES FoodTruck (foodTruckName)
		ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE cs4400spring2020.`Admin` (
	username VARCHAR(55) PRIMARY KEY,
    FOREIGN KEY (username) REFERENCES Employee (username)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE cs4400spring2020.Orders (
	orderID INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    customerUsername VARCHAR(55) NOT NULL,
    FOREIGN KEY (customerUsername) REFERENCES Customer (username)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE cs4400spring2020.MenuItem (
	price DECIMAL(6,2) NOT NULL,
    foodTruckName VARCHAR(55) NOT NULL,
    foodName VARCHAR(55) NOT NULL,
    PRIMARY KEY (foodTruckName, foodName),
    FOREIGN KEY (foodName) REFERENCES Food (foodName)
		ON UPDATE RESTRICT ON DELETE RESTRICT,
	FOREIGN KEY (foodTruckName) REFERENCES FoodTruck (foodTruckName)
		ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE cs4400spring2020.BuildingTag (
	buildingName VARCHAR(55) NOT NULL,
    tag VARCHAR(55) NOT NULL,
    PRIMARY KEY (buildingName, tag),
    FOREIGN KEY (buildingName) REFERENCES Building (buildingName)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE cs4400spring2020.OrderDetail (
	orderID INT NOT NULL,
    foodTruckName VARCHAR(55) NOT NULL,
    foodName VARCHAR(55) NOT NULL,
    purchaseQuantity INT NOT NULL,
    PRIMARY KEY (orderID, foodTruckName, foodName),
    FOREIGN KEY (orderID) REFERENCES Orders (orderID)
		ON UPDATE RESTRICT ON DELETE RESTRICT,
	FOREIGN KEY (foodTruckName, foodName) REFERENCES MenuItem (foodTruckName, foodName)
		ON UPDATE RESTRICT ON DELETE RESTRICT
);

INSERT INTO cs4400spring2020.Building(buildingName,description) VALUES ("Clough","Has starbucks; located near to transit hub"),("College of Computing","Famously called as CoC"),("CrossLand Tower","Library"),("KLAUS Adv Computing","Connected to CoC through binary bridge"),("Molecular Engineering","Hosts classes for molecular engineering"),("Skiles","Host classes for media and literature students"),("Students_Center","Host for student activities"),("TechTower","Most Iconic building"),("Weber Building","Classes mostly related to space technology");

INSERT INTO cs4400spring2020.Station(stationName,buildingName,capacity) VALUES ("Clough Commons","Clough",20.0),("CoC Court Yard","College of Computing",15.0),("Bio Quad","Molecular Engineering",20.0),("Skiles Walkway","Skiles",11.0),("Campanile","Students_Center",7.0);

INSERT INTO cs4400spring2020.Food(foodName) VALUES ("CeasarSalad"),("Waffles"),("TrailMix"),("ChickenSandwich"),("Nachos"),("ChickenWings"),("HamBurger"),("VegetarianGumbo"),("CheeseBurger"),("Shawarma"),("Noodles"),("ChocolateShake"),("MargheritaPizza"),("Bagels"),("ElkBurger"),("SalmonTacos"),("ChickenTacos"),("SouthWestChickenSalad"),("VegetarianTacos"),("VegSpringRolls"),("VegPizza"),("HotDog"),("Pie"),("ShrimpGumbo");

INSERT INTO cs4400spring2020.BuildingTag(buildingName,tag) VALUES ("College of Computing","Computing"),("Clough","LEED"),("KLAUS Adv Computing","Computing"),("CrossLand Tower","LEED"),("TechTower","ADA"),("Students_Center","LEED"),("TechTower","Registrar"),("Weber Building","ADA"),("Clough","ADA"),("Clough","Labs"),("Weber Building","Sciences"),("Molecular Engineering","Engineering"),("CrossLand Tower","Library"),("Skiles","Liberal Arts");

INSERT INTO cs4400spring2020.`User`(username,`password`,firstname,lastname) VALUES ("2Cool_not_todoschool","4242424242","Smarty","Pants"),("4400_thebestclass","4400440044","Seriously","Itis"),("Aturning_Machine12","3333333333","Alan","Turing"),("beBatman!","5555555555","Bruce","Wayne"),("bestfriends4ever1","44444444433","C3P0","Droid"),("bestfriends4ever2","44444444443","R2D2","Droid"),("BuzzyAsAYellowJacket","1010101010","Buzz","Buzz"),("coxRaycox","4242424242","Ray","Cox"),("customer1","1111111111","One","One"),("customer2","1011111111","Two","Two"),("deer.john","22222022222","John","Deer"),("doe.jane","22222222200","Jane","Doe"),("doe.john","20000000002","John","Doe"),("EmmsBest","1000000011","Emma","Williams"),("employee1","1000111111","Employee","Won"),("Employeeofthemonth","1000011111","Beast","Boy"),("FatherofInfoTheory","2222222222","Claude","Shannon"),("ILikeFlowers","1000000001","Lily","Rose"),("JHallPride","2222222222","James","Hall"),("JNash28TheoryofGaming","1111111111","John","Nash"),("LadyVader1977","54545454545","Leia","Organa"),("LifeIsLikeABoxOfChoco.","4444444444","Forrest","Gump"),("LifeUniverseEverything","4242424242","Forty","Two"),("Manager1","1000001111","First","Manager"),("Manager2","1000000111","Second","Manager"),("Manager3","1000000011","Third","Manager"),("Manager4","1000000001","Fourth","Manager"),("mKJerrY","22222022222","Mike","Jerry"),("Nekonsh","8888888888","Nelsh","Kong"),("RPosince","2222222222","Prince","Ross"),("RRanskans","44444444433","Ruby","Rans"),("scoRa","7000000000","Dhey","Scott"),("sffrgerge","1000000000","Blah","BlahBlah"),("SShen","4444444444","Soms","Shen"),("Staff1","3333333333","One","Staff"),("Staff2","2222222222","Two","Staff"),("notmybusiness","7000000000","Kermit","TheFrog"),("theCustomersAlwaysRight","1001111111","Always","Everytime"),("thereal_GPBurdell","9999999999","George","Burdell"),("TingTong","1000000000","Eva","Bell"),("tkingTom","2222222222","Tom","King"),("TooCuteNottoMention","8888888888","Baby","Yoda"),("toongNonyLongy","20000000002","Tony","Long"),("Violax","4400440044","Violet","Lax"),("WomanWhoSmashedCode","4444444444","Elizabeth","Friedman"),("YayVish","6666666666","Vishy","Yay"),("YouBetterBeNiceToMe","6666666666","Talking","Tina");

-- The following command hashes all of the plaintext passwords that we entered above into a more secure form using MySQL's built-in md5() function
-- Ideally, you would hash the plaintext passwords immediately as they are entered to avoid potential exposure
UPDATE cs4400spring2020.`User` SET `password` = md5(`password`);

INSERT INTO cs4400spring2020.Customer(username,balance,stationName) VALUES ("4400_thebestclass",44.0,"Clough Commons"),("beBatman!",89.99,"Skiles Walkway"),("BuzzyAsAYellowJacket",0.5,"Skiles Walkway"),("coxRaycox",4.5,"CoC Court Yard"),("customer1",46.99,"Clough Commons"),("customer2",47.0,"CoC Court Yard"),("JHallPride",30.9,"Clough Commons"),("LifeUniverseEverything",42.42,"Campanile"),("mKJerrY",44.2,"Bio Quad"),("RPosince",67.89,"Campanile"),("RRanskans",7.78,"Bio Quad"),("sffrgerge",4.09,"Clough Commons"),("notmybusiness",19.55,"Bio Quad"),("theCustomersAlwaysRight",2.99,"CoC Court Yard"),("TingTong",50.25,"Bio Quad"),("tkingTom",70.14,"Skiles Walkway"),("toongNonyLongy",17.9,"Clough Commons"),("Violax",15.2,"Skiles Walkway"),("YouBetterBeNiceToMe",52.63,"Bio Quad");

INSERT INTO cs4400spring2020.Employee(username,email) VALUES ("2Cool_not_todoschool","school@gmail.com"),("4400_thebestclass","4400_thebestclass@gatech.edu"),("Aturning_Machine12","machine12@outlook.com"),("beBatman!","beBatman!@gatech.edu"),("bestfriends4ever1","bff@hotmail.com"),("bestfriends4ever2","bff2@gmail.com"),("BuzzyAsAYellowJacket","BuzzyAsAYellowJacket@gatech.edu"),("deer.john","dj3@outlook.com"),("doe.jane","dj1@outlook.com"),("doe.john","dj2@outlook.com"),("EmmsBest","emmsbest@gatech.edu"),("employee1","employee1@gatech.edu"),("Employeeofthemonth","Employeeofthemonth@gatech.edu"),("FatherofInfoTheory","fot@gmail.com"),("ILikeFlowers","flora@gatech.edu"),("JNash28TheoryofGaming","jg@hotmail.com"),("LadyVader1977","lv1977@gatech.edu"),("LifeIsLikeABoxOfChoco.","chocolate@gmail.com"),("Manager1","manager1@gatech.edu"),("Manager2","manager2@gatech.edu"),("Manager3","manager3@gatech.edu"),("Manager4","manager4@gatech.edu"),("Nekonsh","nekonsh@gatech.edu"),("RRanskans","rranskans@gatech.edu"),("scoRa","scoRa@gatech.edu"),("sffrgerge","sff@outlook.com"),("SShen","sshen@gatech.edu"),("Staff1","staff1@gatech.edu"),("Staff2","staff2@gatech.edu"),("thereal_GPBurdell","gpb@gatech.edu"),("TingTong","tingtong@gatech.edu"),("TooCuteNottoMention","mention@gmail.com"),("Violax","violax@gatech.edu"),("WomanWhoSmashedCode","smashedcode@gmail.com"),("YayVish","yayvish@gatech.edu");

INSERT INTO cs4400spring2020.`Admin`(username) VALUES ("4400_thebestclass"),("Nekonsh"),("scoRa");

INSERT INTO cs4400spring2020.Manager(username) VALUES ("doe.jane"),("FatherofInfoTheory"),("LadyVader1977"),("LifeIsLikeABoxOfChoco."),("Manager1"),("Manager2"),("Manager3"),("Manager4"),("SShen"),("thereal_GPBurdell"),("YayVish");

INSERT INTO cs4400spring2020.FoodTruck(foodTruckName,managerUsername,stationName) VALUES ("JohnJaneAndVenison","doe.jane","Campanile"),("FourAnalystInATacoTruck","FatherofInfoTheory","Clough Commons"),("GoodFoodTruck","FatherofInfoTheory","CoC Court Yard"),("BurgerBird","LadyVader1977","Clough Commons"),("FoodTrolley","LadyVader1977","Skiles Walkway"),("FoodTruckYoureLookingFor","LadyVader1977","Campanile"),("BubbaGumps","LifeIsLikeABoxOfChoco.","Campanile"),("CrazyPies","Manager1","Campanile"),("NachoBizness","Manager2","Campanile"),("TruckOfFood","Manager2","Campanile"),("ShawarmaExpress","Manager3","Bio Quad"),("WaffleTruffle","SShen","CoC Court Yard"),("GoodOnAStudentBudget","thereal_GPBurdell","Bio Quad"),("FusionFoodTruck","YayVish","Campanile");

INSERT INTO cs4400spring2020.Staff(username,foodTruckName) VALUES ("2Cool_not_todoschool","WaffleTruffle"),("Aturning_Machine12","FourAnalystInATacoTruck"),("beBatman!","WaffleTruffle"),("bestfriends4ever1","FoodTruckYoureLookingFor"),("bestfriends4ever2","BurgerBird"),("BuzzyAsAYellowJacket","ShawarmaExpress"),("deer.john","JohnJaneAndVenison"),("doe.john","TruckOfFood"),("EmmsBest","CrazyPies"),("employee1","BurgerBird"),("Employeeofthemonth","ShawarmaExpress"),("ILikeFlowers","CrazyPies"),("JNash28TheoryofGaming","GoodFoodTruck"),("RRanskans","FoodTrolley"),("sffrgerge","GoodOnAStudentBudget"),("Staff1","BubbaGumps"),("Staff2","BubbaGumps"),("TingTong","FusionFoodTruck"),("TooCuteNottoMention","NachoBizness"),("Violax","FoodTrolley"),("WomanWhoSmashedCode","FourAnalystInATacoTruck");

INSERT INTO cs4400spring2020.MenuItem(price,foodTruckName,foodName) VALUES (3.21,"FoodTruckYoureLookingFor","Nachos"),(9.06,"GoodFoodTruck","SouthWestChickenSalad"),(4.51,"FoodTrolley","Pie"),(4.28,"CrazyPies","MargheritaPizza"),(4.51,"GoodOnAStudentBudget","CheeseBurger"),(4.36,"JohnJaneAndVenison","TrailMix"),(6.22,"BubbaGumps","ShrimpGumbo"),(4.4,"GoodFoodTruck","Noodles"),(5.48,"GoodOnAStudentBudget","ChocolateShake"),(2.23,"GoodOnAStudentBudget","HotDog"),(6.65,"WaffleTruffle","Waffles"),(6.58,"NachoBizness","ChickenTacos"),(8.03,"FourAnalystInATacoTruck","SalmonTacos"),(4.7,"NachoBizness","VegetarianTacos"),(7.88,"FoodTruckYoureLookingFor","VegPizza"),(6.3,"ShawarmaExpress","Shawarma"),(3.82,"GoodOnAStudentBudget","HamBurger"),(5.95,"FusionFoodTruck","VegetarianTacos"),(3.53,"TruckOfFood","VegSpringRolls"),(5.21,"BubbaGumps","ChickenTacos"),(5.28,"FourAnalystInATacoTruck","ChickenWings"),(9.57,"FoodTruckYoureLookingFor","SouthWestChickenSalad"),(3.48,"CrazyPies","VegPizza"),(7.59,"NachoBizness","SalmonTacos"),(3.46,"GoodOnAStudentBudget","CeasarSalad"),(7.16,"FusionFoodTruck","SalmonTacos"),(5.82,"FoodTrolley","Waffles"),(6.22,"FourAnalystInATacoTruck","ChickenTacos"),(6.01,"FoodTrolley","ChickenWings"),(4.85,"ShawarmaExpress","ChocolateShake"),(3.11,"GoodFoodTruck","VegSpringRolls"),(6.68,"BurgerBird","ElkBurger"),(4.53,"BurgerBird","Pie"),(3.82,"BubbaGumps","VegetarianGumbo"),(4.19,"CrazyPies","Pie"),(7.54,"FoodTrolley","ChocolateShake"),(5.13,"NachoBizness","Nachos"),(7.05,"BurgerBird","HamBurger"),(4.77,"TruckOfFood","Noodles"),(3.44,"GoodOnAStudentBudget","Waffles"),(5.84,"FourAnalystInATacoTruck","VegetarianTacos"),(4.76,"BurgerBird","CheeseBurger"),(7.58,"FoodTruckYoureLookingFor","MargheritaPizza"),(10.17,"JohnJaneAndVenison","ElkBurger");

INSERT INTO cs4400spring2020.Orders(customerUsername,date) VALUES ("customer1","2020-01-01"),("customer1","2020-01-01"),("customer2","2020-01-01"),("customer2","2020-02-01"),("customer1","2020-02-02"),("customer2","2020-02-03"),("theCustomersAlwaysRight","2020-02-04"),("theCustomersAlwaysRight","2020-02-04"),("notmybusiness","2020-02-04"),("customer1","2020-02-04"),("customer2","2020-02-05"),("theCustomersAlwaysRight","2020-02-05"),("notmybusiness","2020-02-05"),("notmybusiness","2020-02-05"),("notmybusiness","2020-02-06"),("theCustomersAlwaysRight","2020-02-06"),("notmybusiness","2020-02-06"),("customer1","2020-02-10"),("customer2","2020-02-10"),("customer2","2020-02-10"),("customer2","2020-02-10"),("BuzzyAsAYellowJacket","2020-02-10"),("BuzzyAsAYellowJacket","2020-02-10"),("customer1","2020-02-10"),("customer2","2020-02-10"),("BuzzyAsAYellowJacket","2020-02-11"),("customer2","2020-02-11"),("customer2","2020-02-22"),("customer2","2020-02-29"),("customer1","2020-02-29"),("customer1","2020-03-01"),("customer2","2020-03-01"),("customer2","2020-03-01"),("sffrgerge","2020-03-01"),("sffrgerge","2020-03-01"),("customer1","2020-03-01"),("LifeUniverseEverything","2020-03-01"),("beBatman!","2020-03-01"),("beBatman!","2020-03-01"),("YouBetterBeNiceToMe","2020-03-01"),("YouBetterBeNiceToMe","2020-03-01");

INSERT INTO cs4400spring2020.OrderDetail(orderID,foodTruckName,foodName,purchaseQuantity) VALUES (35,"GoodOnAStudentBudget","Waffles",1),(31,"FourAnalystInATacoTruck","ChickenTacos",3),(26,"FoodTrolley","Pie",1),(26,"FoodTrolley","ChickenWings",6),(7,"BurgerBird","HamBurger",2),(24,"TruckOfFood","VegSpringRolls",5),(6,"FourAnalystInATacoTruck","SalmonTacos",1),(7,"BurgerBird","ElkBurger",2),(36,"GoodOnAStudentBudget","HamBurger",1),(36,"GoodOnAStudentBudget","ChocolateShake",1),(40,"CrazyPies","VegPizza",1),(31,"FourAnalystInATacoTruck","ChickenWings",5),(17,"ShawarmaExpress","Shawarma",6),(27,"FoodTruckYoureLookingFor","VegPizza",1),(11,"NachoBizness","ChickenTacos",1),(15,"FoodTrolley","ChickenWings",1),(22,"GoodOnAStudentBudget","Waffles",3),(6,"FourAnalystInATacoTruck","ChickenTacos",3),(11,"NachoBizness","SalmonTacos",3),(8,"ShawarmaExpress","Shawarma",2),(3,"GoodOnAStudentBudget","Waffles",2),(16,"FoodTrolley","ChickenWings",2),(1,"CrazyPies","Pie",2),(32,"BurgerBird","Pie",1),(22,"GoodOnAStudentBudget","CheeseBurger",1),(31,"FourAnalystInATacoTruck","SalmonTacos",3),(23,"GoodOnAStudentBudget","ChocolateShake",2),(10,"TruckOfFood","VegSpringRolls",3),(34,"FourAnalystInATacoTruck","ChickenWings",5),(38,"BubbaGumps","ChickenTacos",7),(32,"BurgerBird","CheeseBurger",3),(41,"BubbaGumps","VegetarianGumbo",1),(37,"BurgerBird","CheeseBurger",1),(19,"FourAnalystInATacoTruck","VegetarianTacos",3),(22,"GoodOnAStudentBudget","CeasarSalad",5),(13,"FoodTrolley","ChocolateShake",1),(20,"FourAnalystInATacoTruck","VegetarianTacos",2),(28,"BurgerBird","CheeseBurger",1),(14,"GoodOnAStudentBudget","HamBurger",4),(2,"GoodOnAStudentBudget","HotDog",1),(29,"FourAnalystInATacoTruck","ChickenWings",6),(33,"FoodTrolley","Pie",1),(41,"BubbaGumps","ShrimpGumbo",1),(24,"TruckOfFood","Noodles",1),(33,"FoodTrolley","Waffles",2),(40,"CrazyPies","MargheritaPizza",1),(35,"GoodOnAStudentBudget","CeasarSalad",2),(23,"GoodOnAStudentBudget","HamBurger",1),(25,"BurgerBird","Pie",1),(31,"FourAnalystInATacoTruck","VegetarianTacos",1),(21,"GoodOnAStudentBudget","ChocolateShake",1),(6,"FourAnalystInATacoTruck","ChickenWings",4),(33,"FoodTrolley","ChickenWings",5),(5,"NachoBizness","SalmonTacos",3),(18,"WaffleTruffle","Waffles",4),(12,"FoodTruckYoureLookingFor","MargheritaPizza",2),(34,"FourAnalystInATacoTruck","SalmonTacos",3),(21,"GoodOnAStudentBudget","CheeseBurger",1),(4,"FoodTrolley","ChickenWings",4),(3,"GoodOnAStudentBudget","CheeseBurger",1),(9,"JohnJaneAndVenison","TrailMix",2),(41,"BubbaGumps","ChickenTacos",1),(22,"GoodOnAStudentBudget","HotDog",1),(26,"FoodTrolley","Waffles",2),(39,"NachoBizness","Nachos",2),(11,"NachoBizness","Nachos",4),(30,"BubbaGumps","VegetarianGumbo",1),(1,"CrazyPies","VegPizza",1),(1,"CrazyPies","MargheritaPizza",1),(3,"GoodOnAStudentBudget","HamBurger",1),(11,"NachoBizness","VegetarianTacos",3),(10,"TruckOfFood","Noodles",1),(20,"FourAnalystInATacoTruck","ChickenWings",1),(12,"FoodTruckYoureLookingFor","VegPizza",2),(21,"GoodOnAStudentBudget","HamBurger",3),(26,"FoodTrolley","ChocolateShake",2),(2,"GoodOnAStudentBudget","CeasarSalad",1),(34,"FourAnalystInATacoTruck","ChickenTacos",3);

DROP VIEW IF EXISTS login_classifier;
CREATE VIEW login_classifier AS
SELECT username, 'Admin' AS userType FROM `Admin`
WHERE username NOT IN (SELECT username FROM Customer)
UNION
SELECT username, 'Manager' AS userType FROM Manager
WHERE username NOT IN (SELECT username FROM Customer)
UNION
SELECT username, 'Staff' AS userType FROM Staff
WHERE username NOT IN (SELECT username FROM Customer)
UNION
SELECT username, 'Admin-Customer' AS userType FROM `Admin`
WHERE username in (SELECT username FROM Customer)
UNION
SELECT username, 'Manager-Customer' AS userType FROM Manager
WHERE username in (SELECT username FROM Customer)
UNION
SELECT username, 'Staff-Customer' AS userType FROM Staff
WHERE username in (SELECT username FROM Customer)
UNION
SELECT username, 'Customer' AS userType FROM Customer
WHERE username NOT IN (SELECT username FROM Employee);

-- Query #1: login [Screen #1 Login]
DROP PROCEDURE IF EXISTS login;
DELIMITER //
CREATE PROCEDURE login(
				IN i_username VARCHAR(50),
				IN i_password VARCHAR(50))
sp_main: BEGIN
	DROP TABLE IF EXISTS login_result;
    CREATE TABLE login_result (
		username VARCHAR(50),
		userType ENUM('Customer', 'Admin', 'Staff', 'Manager', 'Admin-Customer', 'Staff-Customer', 'Manager-Customer')
    );

	IF NOT EXISTS (SELECT username, `password` FROM `User`
		WHERE username = i_username AND `password` = md5(i_password)) THEN LEAVE sp_main; END IF;

    INSERT INTO login_result
    SELECT username, userType FROM login_classifier WHERE username = i_username;

END //
DELIMITER ;

-- Query #2: register  [Screen #2 Register]
-- Don't need to check email format (XXX@XXX.XXX)
-- Make sure you check balance > 0 for customer
-- Make sure you check password length >= 8
DROP PROCEDURE IF EXISTS register;
DELIMITER //
CREATE PROCEDURE register(
				IN i_username VARCHAR(50),
				IN i_email VARCHAR(50),
                IN i_firstname VARCHAR(50),
                IN i_lastname VARCHAR(50),
                IN i_password VARCHAR(50),
                IN i_balance DECIMAL(6,2),
                IN i_type ENUM('Admin', 'Manager', 'Staff'))
BEGIN
if (i_username is not null) and (i_firstname is not null) and (i_lastname is not null) and (i_password is not null) then
	if (((i_email is not null) and (i_type is not null)) or ((i_email is null) and (i_type is null))) then
		if char_length(i_password) > 7 then
			insert into cs4400spring2020.user VALUES (i_username, md5(i_password), i_firstname, i_lastname);
			if (i_email is not null) and (i_type is not null) then -- are they required to specify user type?
				insert into cs4400spring2020.employee VALUES (i_username, i_email);
				if i_type = 'Manager' then
					insert into cs4400spring2020.manager VALUES (i_username);
				end if;
				if i_type = 'Admin' then
					insert into cs4400spring2020.admin VALUES (i_username);
				end if;
				if i_type = 'Staff' then
					insert into cs4400spring2020.staff VALUES (i_username, null);
				end if;
		END IF;
		if (i_balance is not null) then
				if (i_balance > 0) then
					insert into cs4400spring2020.customer VALUES (i_username, i_balance, null);
				end if;
			end if;
		end if;
    end if;
 end if;   
END //
DELIMITER ;

-- Query #3: ad_filter_building_station [Screen #4 Admin Manage Building & Station]
DROP PROCEDURE IF EXISTS ad_filter_building_station;
DELIMITER //
CREATE PROCEDURE ad_filter_building_station(
				IN i_buildingName VARCHAR(50),
				IN i_buildingTag VARCHAR(50),
                IN i_stationName VARCHAR(50),
                IN i_minCapacity INT,
                IN i_maxCapacity INT)
BEGIN
	DROP TABLE IF EXISTS ad_filter_building_station_result;
	CREATE TABLE ad_filter_building_station_result(
		buildingName varchar(100), tags text,
        stationName varchar(100), capacity int, foodTruckNames text
	);
    
	INSERT INTO ad_filter_building_station_result
    SELECT innerTable.buildingName, GROUP_CONCAT(BT2.tag) as "tags", innerTable.stationName, innerTable.capacity, foodTruckNames FROM 
		(SELECT buildingInfo.buildingName, stationInfo.stationName, stationInfo.capacity, foodTruckNames FROM
			(SELECT DISTINCT B.buildingName FROM Building as B LEFT JOIN BuildingTag as BT on B.buildingName = BT.buildingName WHERE (i_buildingTag is NULL OR i_buildingTag = "" OR BT.tag LIKE CONCAT('%', i_buildingTag, '%'))) as buildingInfo LEFT JOIN
			(SELECT S.stationName, S.capacity, S.buildingName, GROUP_CONCAT(F.foodTruckName) as "foodTruckNames" FROM Station as S LEFT JOIN FoodTruck as F on S.stationName = F.stationName GROUP BY S.stationName) as stationInfo
		ON buildingInfo.buildingName = stationInfo.buildingName
		GROUP BY buildingInfo.buildingName) as innerTable
	LEFT JOIN BuildingTag as BT2 on innerTable.buildingName = BT2.buildingName
	WHERE (i_buildingName is NULL OR i_buildingName = "" OR innerTable.buildingName = i_buildingName)
    AND (i_stationName is NULL OR i_stationName = "" OR innerTable.stationName = i_stationName)
    AND (i_minCapacity is NULL OR innerTable.capacity >= i_minCapacity)
    AND (i_maxCapacity is NULL OR innerTable.capacity <= i_maxCapacity)
	GROUP BY innerTable.buildingName;
END //
DELIMITER ;

-- Query #4: ad_delete_building [Screen #4 Admin Manage Building & Station]
DROP PROCEDURE IF EXISTS ad_delete_building;
DELIMITER //
CREATE PROCEDURE ad_delete_building(
				IN i_buildingName VARCHAR(50))
BEGIN

	DELETE FROM Building WHERE buildingName = i_buildingName;

END //
DELIMITER ;

-- Query #5: ad_delete_station [Screen #4 Admin Manage Building & Station]
DROP PROCEDURE IF EXISTS ad_delete_station;
DELIMITER //
CREATE PROCEDURE ad_delete_station(
                IN i_stationName VARCHAR(50))
BEGIN

	DELETE FROM Station WHERE stationName = i_stationName;

END //
DELIMITER ;

-- Query #6a: ad_add_building_tag [Screen #5 Admin Add Building Tag]
DROP PROCEDURE IF EXISTS ad_add_building_tag;
DELIMITER //
CREATE PROCEDURE ad_add_building_tag(IN i_buildingName VARCHAR(55), IN i_tag VARCHAR(55))
BEGIN

    INSERT INTO BuildingTag VALUES (i_buildingName, i_tag);

END //
DELIMITER ;

-- Query #6b: ad_remove_building_tag [Screen #5 Admin Remove Building Tag]
DROP PROCEDURE IF EXISTS ad_remove_building_tag;
DELIMITER //
CREATE PROCEDURE ad_remove_building_tag(IN i_buildingName VARCHAR(55), IN i_tag VARCHAR(55))
BEGIN

    DELETE FROM BuildingTag WHERE buildingName = i_buildingName AND tag = i_tag;

END //
DELIMITER ;

-- Query #7: ad_create_building [Screen #5 Admin Create Building]
DROP PROCEDURE IF EXISTS ad_create_building;
DELIMITER //
CREATE PROCEDURE ad_create_building(IN i_buildingName VARCHAR(55), IN i_description TEXT)
BEGIN

	INSERT INTO Building VALUES (i_buildingName, i_description);

END //
DELIMITER ;

-- Query #8a: ad_view_building_general [Screen #6 Admin Update Building]
DROP PROCEDURE IF EXISTS ad_view_building;
DELIMITER //
CREATE PROCEDURE ad_view_building_general(IN i_buildingName VARCHAR(55))
BEGIN
    DROP TABLE IF EXISTS ad_view_building_general_result;
    CREATE TABLE ad_view_building_general_result(buildingName varchar(55), `description` text);

    INSERT INTO ad_view_building_general_result
    SELECT buildingName, description
    FROM Building
    WHERE buildingName = i_buildingName;

END //
DELIMITER ;

-- Query #8b: ad_view_building_tags [Screen #6 Admin Update Building]
DROP PROCEDURE IF EXISTS ad_view_building_tags;
DELIMITER //
CREATE PROCEDURE ad_view_building_tags(IN i_buildingName VARCHAR(55))
BEGIN
    DROP TABLE IF EXISTS ad_view_building_tags_result;
    CREATE TABLE ad_view_building_tags_result(tag VARCHAR(55));

    INSERT INTO ad_view_building_tags_result
    SELECT tag
    FROM BuildingTag
    WHERE buildingName = i_buildingName;

END //
DELIMITER ;

-- Query #9: ad_update_building [Screen #6 Admin Update Building]
-- select * from foodtruck
DROP PROCEDURE IF EXISTS ad_update_building;
DELIMITER //
CREATE PROCEDURE ad_update_building(IN i_oldBuildingName VARCHAR(55), IN i_newBuildingName VARCHAR(55), IN i_description TEXT)
BEGIN
    UPDATE Building
    SET buildingName = i_newBuildingName, `description` = i_description
    WHERE buildingName = i_oldBuildingName;

END //
DELIMITER ;

-- Query #10: ad_get_available_building [Screen #7 Admin Create Station]
DROP PROCEDURE IF EXISTS ad_get_available_building;
DELIMITER //
CREATE PROCEDURE ad_get_available_building()
BEGIN
    DROP TABLE IF EXISTS ad_get_available_building_result;
    CREATE TABLE ad_get_available_building_result(buildingName varchar(100));

    INSERT INTO ad_get_available_building_result
    SELECT buildingName
    FROM Building
    WHERE buildingName NOT IN (SELECT buildingName FROM Station);

END //
DELIMITER ;

-- Query #11: ad_create_station [Screen #7 Admin Create Station]
DROP PROCEDURE IF EXISTS ad_create_station;
DELIMITER //
CREATE PROCEDURE ad_create_station(IN i_stationName VARCHAR(100), IN  i_buildingName VARCHAR(100), IN i_capacity INT)
BEGIN

    IF i_buildingName in (
        SELECT buildingName
        FROM ad_get_available_building_result) THEN
        INSERT INTO Station (stationName, buildingName, capacity)
        VALUES (i_stationName,  i_buildingName, i_capacity);
    END IF;

END //
DELIMITER ;

-- Query #12: ad_view_station [Screen #8 Admin Update Station]
DROP PROCEDURE IF EXISTS ad_view_station;
DELIMITER //
CREATE PROCEDURE ad_view_station(IN i_stationName VARCHAR(100))
BEGIN
    DROP TABLE IF EXISTS ad_view_station_result;
    CREATE TABLE ad_view_station_result(stationName varchar(100), capacity int, buildingName varchar(100));

	INSERT INTO ad_view_station_result
    SELECT stationName, capacity, buildingName
    FROM Station
    WHERE stationName = i_stationName;

END //
DELIMITER ;

-- Query #13: ad_update_station [Screen #8 Admin Update Station]
DROP PROCEDURE IF EXISTS ad_update_station;
DELIMITER //
CREATE PROCEDURE ad_update_station(IN i_stationName VARCHAR(100), IN i_capacity INT, IN i_buildingName VARCHAR(100))
BEGIN
if (i_capacity is not null) then
    UPDATE Station
    SET capacity = i_capacity
    WHERE stationName = i_stationName;
end if;

UPDATE Station
    SET buildingName = i_buildingName
    WHERE stationName = i_stationName;

END //
DELIMITER ;

-- Query #14: ad_filter_food [Screen #9 Admin Manage Food]
DROP PROCEDURE IF EXISTS ad_filter_food;
DELIMITER //
CREATE PROCEDURE ad_filter_food(IN i_foodName VARCHAR(100), IN i_sortedBy ENUM('foodName', 'menuCount', 'purchaseCount'), IN i_sortDirection ENUM('ASC', 'DESC'))
BEGIN
    DROP TABLE IF EXISTS ad_filter_food_result;
    CREATE TABLE ad_filter_food_result(foodName varchar(100), menuCount int, purchaseCount int);

	INSERT INTO ad_filter_food_result
	SELECT * FROM
		(SELECT MenuCounts.foodName, MenuCounts.menuCount, COALESCE(SUM(OrderDetail.purchaseQuantity), 0) AS purchaseCount FROM 
			(SELECT Food.foodName, count(MenuItem.foodTruckName) AS menuCount FROM Food LEFT JOIN MenuItem ON Food.foodName = MenuItem.foodName GROUP BY foodName) AS MenuCounts
		LEFT JOIN OrderDetail 
		ON MenuCounts.foodName = OrderDetail.foodName
		GROUP BY MenuCounts.foodName) as innerTable
    WHERE (i_foodName = '' OR i_foodName is NULL OR foodName = i_foodName)
    ORDER BY
        CASE WHEN (i_sortedBy = "foodName" AND (i_sortDirection = "ASC" OR i_sortDirection = NULL)) THEN foodName END ASC,
        CASE WHEN i_sortedBy = "foodName" AND i_sortDirection = "DESC" THEN foodName END DESC,
		CASE WHEN i_sortedBy = "menuCount" AND (i_sortDirection = "ASC" OR i_sortDirection = NULL) THEN menuCount END ASC,
		CASE WHEN i_sortedBy = "menuCount" AND i_sortDirection = "DESC" THEN menuCount END DESC,
		CASE WHEN i_sortedBy = "purchaseCount" AND (i_sortDirection = "ASC" OR i_sortDirection = NULL) THEN purchaseCount END ASC,
		CASE WHEN i_sortedBy = "purchaseCount" AND i_sortDirection = "DESC" THEN purchaseCount END DESC;
        
END //
DELIMITER ;

-- Query #15: ad_delete_food [Screen #9 Admin Manage Food]
DROP PROCEDURE IF EXISTS ad_delete_food;
DELIMITER //
CREATE PROCEDURE ad_delete_food(IN i_foodName VARCHAR(100))
BEGIN

	DELETE FROM ORDERDETAIL
    WHERE foodName = i_foodName;
    
	DELETE FROM MENUITEM
    WHERE foodName = i_foodName;
    
    DELETE FROM Food
    WHERE foodName = i_foodName;

END //
DELIMITER ;

select * from food

-- Query #16: ad_create_food [Screen #10 Admin Create Food]
DROP PROCEDURE IF EXISTS ad_create_food;
DELIMITER //
CREATE PROCEDURE ad_create_food(IN i_foodName VARCHAR(100))
BEGIN

    INSERT INTO Food(foodName)
    VALUES (i_foodName);

END //
DELIMITER ;

-- Query #17: mn_filter_foodTruck [Screen #11 Manager Manage Food Truck]
DROP PROCEDURE IF EXISTS mn_filter_foodTruck;
DELIMITER //
CREATE PROCEDURE mn_filter_foodTruck(
    IN i_managerUsername VARCHAR(50),
    IN i_foodTruckName VARCHAR(50),
    IN i_stationName VARCHAR(50),
	IN i_minStaffCount INT,
	IN i_maxStaffCount INT,
    IN i_hasRemainingCapacity BOOLEAN)
BEGIN

	DROP TABLE IF EXISTS mn_filter_foodTruck_result;
     CREATE TABLE mn_filter_foodTruck_result(foodTruckName varchar(100), stationName varchar(100),
		remainingCapacity int, staffCount int, menuItemCount int);


	DROP TABLE IF EXISTS cols124;
	CREATE TABLE cols124(foodTruckName VARCHAR(55), stationName VARCHAR(55), staffCount int, managerUsername VARCHAR(55));
	INSERT INTO cols124
    select foodtruck.foodTruckName, foodtruck.stationName, count(distinct(staff.username)) as 'Staff(s)', foodtruck.managerUsername
    from foodtruck
    left join staff on foodtruck.foodtruckname = staff.foodtruckname
    group by foodtruck.foodtruckname;
    
        
    DROP TABLE IF EXISTS cols23;
	CREATE TABLE cols23(stationName VARCHAR(55), remcapacity int);
	INSERT INTO cols23
	select station.stationName, (station.capacity - count(foodtruck.foodtruckname)) as 'remaining capacity'
    from station left join foodtruck on station.stationName = foodtruck.stationName
    group by station.stationName;
    
    
    
	DROP TABLE IF EXISTS cols15;
	CREATE TABLE cols15(foodTruckName VARCHAR(55), menuItemCount int);
	INSERT INTO cols15
    select foodtruck.foodTruckName, count(menuitem.foodName)
    from foodtruck
    left join menuitem
    on foodtruck.foodTruckName = menuitem.foodTruckName
    group by foodtruck.foodTruckName;
    
    
    DROP TABLE IF EXISTS cols1245;
	CREATE TABLE cols1245(foodTruckName VARCHAR(55), stationName VARCHAR(55), menuItemCount int, staffCount int, managerUsername VARCHAR(55));
	INSERT INTO cols1245
    select cols124.foodTruckName, cols124.stationName, cols15.menuItemCount, cols124.staffCount, cols124.managerUsername
    from cols124
    left join cols15 on cols124.foodTruckName = cols15.foodTruckName;
    
    -- CALL mn_filter_foodTruck("LadyVader1977", null, null, 2, null, false)
    -- select * from cols1245 where managerUsername = 'LadyVader1977'
    -- select * from mn_filter_foodTruck_result
        
    -- DROP TABLE IF EXISTS cols12345;
	-- CREATE TABLE cols12345(foodTruckName VARCHAR(55), stationName VARCHAR(55), remainingCapacity int, staffCount int, menuItemCount int);
	INSERT INTO mn_filter_foodTruck_result
    select cols1245.foodTruckName, cols1245.stationName, cols23.remcapacity, cols1245.staffCount, cols1245.menuItemCount
    from cols1245
    left join cols23 on cols1245.stationName = cols23.stationName
	WHERE
    (i_managerUsername = cols1245.managerUsername) 
    AND
    (i_foodTruckName IS NULL OR cols1245.foodTruckName LIKE CONCAT('%', i_foodTruckName, '%') ) AND
   (i_stationName = cols1245.stationName OR i_stationName IS NUll) AND
   ((i_hasRemainingCapacity = TRUE AND cols23.remcapacity>0) OR (i_hasRemainingCapacity = FALSE))
   group by cols1245.foodTruckName
    HAVING
   ((i_minStaffCount IS NULL AND i_maxStaffCount IS NULL) OR (i_minStaffCount IS NULL AND staffCount <= i_maxStaffCount) OR (i_maxStaffCount IS NULL AND staffCount >= i_minStaffCount) OR (staffCount BETWEEN i_minStaffCount AND i_maxStaffCount));
END //
DELIMITER ;

-- Query #18: mn_delete_foodTruck [Screen #11 Manager Manage Food Truck]
DROP PROCEDURE IF EXISTS mn_delete_foodTruck;
DELIMITER //
CREATE PROCEDURE mn_delete_foodTruck(IN i_foodTruckName VARCHAR(50))
BEGIN

	DELETE FROM OrderDetail
    WHERE foodTruckName = i_foodTruckName;
    
	DELETE FROM menuItem
    WHERE foodTruckName = i_foodTruckName;
    
    DELETE FROM FOODTRUCK
    WHERE foodTruckName = i_foodTruckName;

END //
DELIMITER ;

-- Query #19a: mn_create_foodTruck_add_station [Screen #12 Manager Create Food Truck]
DROP PROCEDURE IF EXISTS mn_create_foodTruck_add_station;
DELIMITER //
CREATE PROCEDURE mn_create_foodTruck_add_station(IN i_foodTruckName VARCHAR(50), IN i_stationName VARCHAR(50), IN i_managerUsername VARCHAR(50))
BEGIN


    
    IF (SELECT COUNT(stationName) FROM foodtruck WHERE foodtruck.stationName = i_stationName) < (SELECT capacity FROM station WHERE station.stationName = i_stationName) THEN
	    INSERT INTO FoodTruck(foodTruckName, stationName, managerUsername)
	VALUES (i_foodTruckName, i_stationName, i_managerUsername);


   -- INSERT INTO FoodTruck(foodTruckName, stationName, managerUsername)
	-- VALUES (i_foodTruckName, i_stationName, i_managerUsername);
    -- mn_create_foodTruck_add_station("CaddyShak", "Campanile", "LadyVader1977")
	END IF;
    
END //
DELIMITER ;

-- Query #19b: mn_create_foodTruck_add_staff [Screen #12 Manager Create Food Truck]
-- i_staffName parameter is the Staff's username

DROP PROCEDURE IF EXISTS mn_create_foodTruck_add_staff;
DELIMITER //
CREATE PROCEDURE mn_create_foodTruck_add_staff(IN i_foodTruckName VARCHAR(50), IN i_staffName VARCHAR(50))
BEGIN

    UPDATE Staff
    SET foodTruckName = i_foodTruckName
    WHERE username = i_staffName;

    
    -- select * from staff

END //
DELIMITER ;

-- Query #19c: mn_create_foodTruck_add_menu_item [Screen #12 Manager Create Food Truck]
DROP PROCEDURE IF EXISTS mn_create_foodTruck_add_menu_item;
DELIMITER //
CREATE PROCEDURE mn_create_foodTruck_add_menu_item(IN i_foodTruckName VARCHAR(50), IN i_price DECIMAL(6,2), IN i_foodName VARCHAR(50))
BEGIN

    INSERT INTO MENUITEM(price, foodTruckName, foodName)
    VALUES (i_price, i_foodTruckName, i_foodName);

END //
DELIMITER ;


-- select * from foodtruck where managerusername = 'LadyVader1977'

-- call mn_view_foodTruck_available_staff('LadyVader1977', 'FoodTrolley')
-- call mn_view_foodTruck_available_staff(null, null)
-- select * from mn_view_foodTruck_available_staff_result

-- Query #20a: mn_view_foodTruck_available_staff [Screen #13 Manager Update Food Truck]
-- Should show all staff available to be assigned (i.e. all unassigned staff)
-- Should be shown as FirstName LastName
DROP PROCEDURE IF EXISTS mn_view_foodTruck_available_staff;
DELIMITER //
CREATE PROCEDURE mn_view_foodTruck_available_staff()
BEGIN

	DROP TABLE IF EXISTS mn_view_foodTruck_available_staff_result;
     CREATE TABLE mn_view_foodTruck_available_staff_result(availableStaff varchar(100))
          
     SELECT CONCAT(firstName , ' ' , lastName) as fullName
     FROM STAFF
     INNER JOIN `User` ON Staff.username = `User`.username
     WHERE Staff.foodTruckName is Null;


END //
DELIMITER ;

-- select * from foodtruck where managerusername = 'LadyVader1977'
-- call mn_view_foodTruck_staff('FoodTrolley')
-- select * from mn_view_foodTruck_staff_result

-- Query #20b: mn_view_foodTruck_staff [Screen #13 Manager Update Food Truck]
-- Should be shown as FirstName LastName
DROP PROCEDURE IF EXISTS mn_view_foodTruck_staff;
DELIMITER //
CREATE PROCEDURE mn_view_foodTruck_staff(i_foodTruckName VARCHAR(50))
BEGIN

    DROP TABLE IF EXISTS mn_view_foodTruck_staff_result;
    CREATE TABLE mn_view_foodTruck_staff_result(assignedStaff varchar(100))
SELECT CONCAT(firstName , ' ' , lastName) as fullName
    FROM FoodTruck
    INNER JOIN STAFF
    ON FoodTruck.foodTruckName = STAFF.foodTruckName
    INNER JOIN USER
    ON STAFF.username = USER.username
    WHERE
    (i_foodTruckName = FoodTruck.foodTruckName);
    
    END //
    DELIMITER ;



-- call mn_view_foodTruck_menu('FoodTrolley') 
-- select * from mn_view_foodTruck_menu_result
-- Query #21: mn_view_foodTruck_menu [Screen #13 Manager Update Food Truck]


-- call mn_view_foodTruck_menu(null)
-- select * from mn_view_foodTruck_menu_result
DROP PROCEDURE IF EXISTS mn_view_foodTruck_menu;
DELIMITER //
CREATE PROCEDURE mn_view_foodTruck_menu(i_foodTruckName VARCHAR(50))
BEGIN

    DROP TABLE IF EXISTS mn_view_foodTruck_menu_result;
 	CREATE TABLE mn_view_foodTruck_menu_result(foodTruckName varchar(100), stationName varchar(100), foodName varchar(100), price DECIMAL(6,2));
 	INSERT INTO mn_view_foodTruck_menu_result
    SELECT foodtruck.foodTruckName, stationName, foodName, price
 	FROM FOODTRUCK
 	INNER JOIN MENUITEM
 	ON FOODTRUCK.foodTruckName = MENUITEM.foodTruckName
 	WHERE
 	(i_foodTruckName = foodtruck.foodTruckName);

END //
DELIMITER ;

-- call mn_update_foodTruck_station ('FoodTrolley', 'Campanile')
-- select * from foodtruck where foodtruckname = 'FoodTrolley'
-- Query #22a: mn_update_foodTruck_station [Screen #13 Manager Update Food Truck]
DROP PROCEDURE IF EXISTS mn_update_foodTruck_station;
DELIMITER //

CREATE PROCEDURE mn_update_foodTruck_station(IN i_foodTruckName VARCHAR(55), IN i_stationName VARCHAR(55))
BEGIN

-- select station.capacity as capacity from station where station.stationName = i_stationName;

-- set @current_num = (select count(*) from foodtruck where foodtruck.stationName = i_stationName);

if (Select Station.capacity - COUNT(FoodTruck.foodTruckName) as 'Remaining Capacity'
FROM Station INNER JOIN FoodTruck ON Station.stationName = FoodTruck.stationName
where Station.stationName = i_stationName GROUP BY Station.stationName) > 0 then
UPDATE FOODTRUCK
  set foodtruck.stationName = i_stationName
  WHERE foodtruck.foodTruckName = i_foodTruckName;
end if;

END //
DELIMITER ;


-- Query #22b: mn_update_foodTruck_staff [Screen #13 Manager Update Food Truck]
DROP PROCEDURE IF EXISTS mn_update_foodTruck_staff;
DELIMITER //
CREATE PROCEDURE mn_update_foodTruck_staff(IN i_foodTruckName VARCHAR(55), IN i_staffName VARCHAR(55))
BEGIN

	UPDATE STAFF
	SET Staff.foodTruckName = i_foodTruckName
	WHERE Staff.username = i_staffName;

END //

select * from staff

-- Query #22c: mn_update_foodTruck_menu_item [Screen #13 Manager Update Food Truck]

DROP PROCEDURE IF EXISTS mn_update_foodTruck_menu_item;
DELIMITER //
CREATE PROCEDURE mn_update_foodTruck_menu_item(IN i_foodTruckName VARCHAR(55), IN i_price DECIMAL(6,2), IN i_foodName VARCHAR(55))
BEGIN

	INSERT INTO MenuItem(price, foodTruckName, foodName)
	VALUES (i_price, i_foodTruckName, i_foodName);

END //
DELIMITER ;


-- call mn_get_station('tharvin')
-- select * from mn_get_station_result
-- Query #23: mn_get_station [Screen #14 Manager Food Truck Summary]
-- Get list of stations that have foodTrucks managed by the given manager
DROP PROCEDURE IF EXISTS mn_get_station;
DELIMITER //
CREATE PROCEDURE mn_get_station(IN i_managerUsername VARCHAR(50))
BEGIN
    DROP TABLE IF EXISTS mn_get_station_result;
    CREATE TABLE mn_get_station_result(stationName varchar(100));

    INSERT INTO mn_get_station_result
    SELECT DISTINCT(stationName)
    FROM FoodTruck
    WHERE managerUsername = i_managerUsername;

END //
DELIMITER ;

-- call mn_filter_summary('tharvin', null, null, null, null, null, 'ASC')
-- select * from mn_filter_summary_result
-- select * from foodtruck where managerUsername = 'tharvin'

-- Query #24: mn_filter_summary [Screen #14 Manager Food Truck Summary]
DROP PROCEDURE IF EXISTS mn_filter_summary;
DELIMITER //
CREATE PROCEDURE mn_filter_summary(
    IN i_managerUsername VARCHAR(50),
    IN i_foodTruckName VARCHAR(50),
    IN i_stationName VARCHAR(50),
    IN i_minDate DATE,
    IN i_maxDate DATE,
    IN i_sortedBy ENUM('foodTruckName', 'totalOrder', 'totalRevenue', 'totalCustomer'),
    IN i_sortedDirection ENUM('ASC', 'DESC'))
BEGIN
    DROP TABLE IF EXISTS mn_filter_summary_result;
    CREATE TABLE mn_filter_summary_result(foodTruckName varchar(100), totalOrder int, totalRevenue DECIMAL(6,2), totalCustomer int);

    INSERT INTO mn_filter_summary_result
    SELECT foodTruckName, totalOrder, totalRevenue, totalCustomer
    FROM
    (   SELECT FoodTruck.foodTruckName as foodTruckName, COUNT(DISTINCT (Orders.orderID)) as totalOrder, SUM(MenuItem.price * OrderDetail.purchaseQuantity) as totalRevenue, COUNT(DISTINCT customerUsername) as totalCustomer
        FROM Orders
        INNER JOIN
        OrderDetail ON Orders.orderID = OrderDetail.orderID
        INNER JOIN
        MenuItem ON (OrderDetail.foodName = MenuItem.foodName AND OrderDetail.foodTruckName = MenuItem.foodTruckName)
        INNER JOIN
        FoodTruck ON OrderDetail.foodTruckName = FoodTruck.foodTruckName
        WHERE
        (i_managerUsername = FoodTruck.managerUsername) AND
        (i_foodTruckName IS NULL OR FoodTruck.foodTruckName LIKE CONCAT('%', i_foodTruckName, '%') ) AND
        (i_stationName IS NULL OR FoodTruck.stationName LIKE CONCAT('%', i_stationName, '%') ) AND
        (i_minDate IS NULL OR Orders.date >= i_minDate) AND (i_maxDate IS NULL OR Orders.date <= i_maxDate)
        GROUP BY FoodTruck.foodTruckName
    ) T
    ORDER BY
        CASE WHEN (i_sortedBy IS NULL AND (i_sortedDirection = "ASC" OR i_sortedDirection IS NULL)) THEN foodTruckName END ASC,
        CASE WHEN (i_sortedBy IS NULL AND i_sortedDirection = "DESC") THEN foodTruckName END DESC,
        CASE WHEN i_sortedBy = "foodTruckName" AND (i_sortedDirection = "ASC" OR i_sortedDirection IS NULL) THEN foodTruckName END ASC,
        CASE WHEN i_sortedBy = "foodTruckName" AND i_sortedDirection = "DESC" THEN foodTruckName END DESC,
        CASE WHEN i_sortedBy = "totalOrder" AND (i_sortedDirection = "ASC" OR i_sortedDirection IS NULL) THEN totalOrder END ASC,
        CASE WHEN i_sortedBy = "totalOrder" AND i_sortedDirection = "DESC" THEN totalOrder END DESC,
        CASE WHEN i_sortedBy = "totalRevenue" AND (i_sortedDirection = "ASC" OR i_sortedDirection IS NULL) THEN totalRevenue END ASC,
        CASE WHEN i_sortedBy = "totalRevenue" AND i_sortedDirection = "DESC" THEN totalRevenue END DESC,
        CASE WHEN i_sortedBy = "totalCustomer" AND (i_sortedDirection = "ASC" OR i_sortedDirection IS NULL) THEN totalCustomer END ASC,
        CASE WHEN i_sortedBy = "totalCustomer" AND i_sortedDirection = "DESC" THEN totalCustomer END DESC
        ;

END //
DELIMITER ;

-- Query #25: mn_summary_detail [Screen #15 Manager Summary Detail]
-- call mn_summary_detail('tharvin', 'newtrukkkk')
-- select * from orderdetail where foodtruckname = 'newtrukkkk'
-- select * from mn_summary_detail_result
-- select * from orders where orderID > 1000
DROP PROCEDURE IF EXISTS mn_summary_detail;
DELIMITER //
CREATE PROCEDURE mn_summary_detail(IN i_managerUsername VARCHAR(50), IN i_foodTruckName VARCHAR(50))
BEGIN
    DROP TABLE IF EXISTS mn_summary_detail_result;
    CREATE TABLE mn_summary_detail_result(`date` date, customerName varchar(100), totalPurchase DECIMAL(6, 2),
        orderCount int, foodNames text);

    DROP TABLE IF EXISTS orderIDCost;
CREATE TABLE orderIDCost  (orderID int, orderCost DECIMAL(6,2));
insert into orderIDCost (orderID, orderCost)
select orderdetail.orderID, sum(orderdetail.purchaseQuantity * menuitem.price) from orderdetail INNER JOIN menuitem on orderdetail.foodTruckName = menuitem.foodTruckName and orderdetail.foodName = menuitem.foodName GROUP BY orderID;

select * from orderIDCost; -- orderID, and the total cost associated with that order.

DROP TABLE IF EXISTS orderIDDateCusFood; -- orderID, the date of the order, the customerUsername, and the foods they ordered. The unique key is orderID. 
CREATE TABLE orderIDDateCusFood (orderID int, `date` date, customerUsername VARCHAR(55), foods VARCHAR(120));
insert into orderIDDateCusFood
select orders.orderID, orders.date, orders.customerUsername, GROUP_CONCAT(foodName SEPARATOR ', ') "foods"
from orderdetail INNER JOIN orders on orders.orderID = orderdetail.orderID 
WHERE foodTruckName in (SELECT foodTruckName from foodtruck WHERE managerUsername = i_managerUsername and foodTruckName = i_foodTruckName)
GROUP BY orderID;

select `date`, customerUsername,  GROUP_CONCAT(foods SEPARATOR ', ') "foods", COUNT(orderID) "numOrders" from orderIDDateCusFood GROUP BY customerUsername; #this is all except for total cost.

DROP TABLE IF EXISTS customer_date_cost;
CREATE TABLE customer_date_cost (netCost DECIMAL(6,2), `date` date, customerUsername VARCHAR(55));
INSERT INTO customer_date_cost
select SUM(orderCost) "netCost", `date`, customerUsername from orderIDCost INNER JOIN orderIDDateCusFood on orderIDCOst.orderID = orderIDDateCusFood.orderID GROUP BY `date`, customerUsername;

select * from customer_date_cost; 

DROP TABLE IF EXISTS customer_2;
CREATE TABLE customer_2 (`date` date, customerUsername VARCHAR(55), foods VARCHAR(120), numOrders int);
insert into customer_2
select `date`, customerUsername,  GROUP_CONCAT(distinct foods SEPARATOR ', ') "foods", COUNT(orderID) "numOrders" from orderIDDateCusFood GROUP BY `date`;

INSERT INTO mn_summary_detail_result
select customer_2.date "Date", customer_2.customerUsername "Customer", customer_date_cost.netCost "Total Purchase", customer_2.numOrders " Orders", customer_2.foods "Food (s)" from customer_2 INNER JOIN customer_date_cost on customer_2.customerUsername = customer_date_cost.CustomerUsername and customer_2.date = customer_date_cost.date ORDER BY customer_date_cost.date desc;


END //
DELIMITER ;

-- Query #26: cus_filter_explore [Screen #16 Customer Explore]
-- call cus_filter_explore(null, null, 'A', null, null)
-- select * from cus_filter_explore_result
-- select * from buildingTag
DROP PROCEDURE IF EXISTS cus_filter_explore;
DELIMITER //
CREATE PROCEDURE cus_filter_explore(IN i_buildingName VARCHAR(50), IN i_stationName VARCHAR(50), IN i_buildingTag VARCHAR(50), IN i_foodTruckName VARCHAR(50), IN i_foodName VARCHAR(50))
BEGIN
    DROP TABLE IF EXISTS cus_filter_explore_result;
    CREATE TABLE cus_filter_explore_result(stationName varchar(100), buildingName varchar(100),
        foodTruckNames text, foodNames text);

    INSERT INTO cus_filter_explore_result
    SELECT Station.stationName, Station.buildingName, (GROUP_CONCAT(DISTINCT(FoodTruck.foodTruckName) SEPARATOR ', ')) AS foodTruckNames, GROUP_CONCAT(DISTINCT(MenuItem.foodName) SEPARATOR ', ') AS foodNames
        FROM Station
        INNER JOIN
        FoodTruck ON Station.stationName = FoodTruck.stationName
        INNER JOIN
        MenuItem  ON FoodTruck.foodTruckName = MenuItem.foodTruckName
        INNER JOIN
        BuildingTag ON Station.buildingName  = BuildingTag.buildingName
        WHERE
        (i_buildingName is NULL OR i_buildingName = Station.buildingName) AND
        (i_stationName is NULL OR i_stationName = Station.stationName) AND
        (i_buildingTag is NULL OR BuildingTag.tag LIKE CONCAT('%', i_buildingTag, '%')) AND
        (i_foodTruckName is NULL OR FoodTruck.foodTruckName LIKE CONCAT('%', i_foodTruckName, '%')) AND
        (i_foodName is NULL OR MenuItem.foodName LIKE CONCAT('%', i_foodName, '%'))
        GROUP BY Station.stationName;

END //
DELIMITER ;

-- call cus_select_location('tharvin', 'Campanile')
-- select * from station
-- select * from customer where username = 'tharvin'
-- Query #27: cus_select_location [Screen #16 Customer Explore]
DROP PROCEDURE IF EXISTS cus_select_location;
DELIMITER //
CREATE PROCEDURE cus_select_location( IN i_customerUsername VARCHAR(50), IN i_stationName VARCHAR(50))
BEGIN
    IF i_stationName in (SELECT stationName FROM Station)
    THEN
    UPDATE Customer
    SET stationName = i_stationName
    WHERE username = i_customerUsername;
    END IF;

END //
DELIMITER ;


-- Query #28: cus_current_information_basic [Screen #17 Customer Current Information]
DROP PROCEDURE IF EXISTS cus_current_information_basic;
DELIMITER //
CREATE PROCEDURE cus_current_information_basic(IN i_customerUsername VARCHAR(55))
BEGIN
        DROP TABLE IF EXISTS cus_current_information_basic_result;
    CREATE TABLE cus_current_information_basic_result(stationName varchar(100), buildingName varchar(100), tags text, `description` text, balance DECIMAL(6, 2));

--  Intermediate_1 stores 1 row with the customer’s station, that station's corresponding building, and the customer’s balance

    DROP TABLE IF EXISTS intermediate_1;
    CREATE TABLE intermediate_1(stationName varchar(100), buildingName varchar(100),
		balance DECIMAL(6, 2));
    INSERT INTO intermediate_1 (stationName, buildingName, balance) (
    SELECT Customer.stationName, Station.buildingName, Customer.balance
    FROM Customer
    INNER JOIN Station ON Customer.stationName = Station.stationName 
    WHERE Customer.username = i_customerUsername);

-- Intermediate 2 stores 1 row with the customer's stations' building name (from intermediate_1), and that building's tags and description

    DROP TABLE IF EXISTS intermediate_2;
    CREATE TABLE intermediate_2(buildingName varchar(100), tags text, `description` text);
    INSERT INTO intermediate_2 (buildingName, tags) 
    
    SELECT BuildingTag.buildingName, GROUP_CONCAT(DISTINCT(BuildingTag.tag) SEPARATOR ', ') FROM BuildingTag 
    WHERE BuildingTag.buildingName in (SELECT buildingName FROM intermediate_1) GROUP BY BuildingTag.buildingName;
    
    UPDATE intermediate_2 SET `description` = 
    (SELECT Building.`description` FROM Building WHERE (Building.buildingName in (SELECT (buildingName) FROM intermediate_1))) WHERE buildingName = (SELECT (buildingName) FROM intermediate_1);

--  Inserts ordered result by joining the 2 intermediate tables above based on their common building name

    INSERT INTO cus_current_information_basic_result(stationName, buildingName, tags, `description`, balance)
    (SELECT intermediate_1.stationName, intermediate_1.buildingName, intermediate_2.tags, intermediate_2.`description`, intermediate_1.balance
     FROM intermediate_1 INNER JOIN intermediate_2 ON (intermediate_1.buildingName = intermediate_2.buildingName)); 
--
END //
DELIMITER ;

-- Query #29: cus_current_information_foodTruck [Screen #17 Customer Current Information]

-- call cus_current_information_foodTruck('tharvin')
-- select * from cus_current_information_foodTruck_result
-- insert into customer values ('tharvin', 420, 'Bio Quad')
-- select * from customer

DROP PROCEDURE IF EXISTS cus_current_information_foodTruck;
DELIMITER //
CREATE PROCEDURE cus_current_information_foodTruck(IN i_customerUsername VARCHAR(55))
BEGIN
    DROP TABLE IF EXISTS cus_current_information_foodTruck_result;
    CREATE TABLE cus_current_information_foodTruck_result(foodTruckName varchar(100), managerName varchar(100), foodNames text);

--  Intermediate_4 joins the food truck table to the customer table having the same station. It then picks the truck name and manager username of the trucks located at the customer's location

    DROP TABLE IF EXISTS intermediate_4;
    CREATE TABLE intermediate_4(foodTruckName varchar(100), managerUsername varchar(55));
    INSERT INTO intermediate_4 (foodTruckName, managerUsername) (
        SELECT FoodTruck.foodTruckName, FoodTruck.managerUsername
        FROM FoodTruck 
        INNER JOIN Customer ON FoodTruck.stationName = Customer.stationName
        WHERE Customer.username = i_customerUsername);

--  Intermediate_5 stores the manager username and full name for managers managing trucks in Intermediate_2 

    DROP TABLE IF EXISTS intermediate_5;
    CREATE TABLE intermediate_5(managerUsername varchar(55), managerName text);
    INSERT INTO intermediate_5(managerUsername, managerName) (
    SELECT `User`.username, CONCAT(`User`.firstName, ' ', `User`.lastName) AS managerName
    FROM `User` WHERE `User`.username in (SELECT managerUsername FROM intermediate_4));

--  Intermediate_6 stores each of the food trucks in Intermediate_4 along with a list of their food names

    DROP TABLE IF EXISTS intermediate_6;
    CREATE TABLE intermediate_6(foodTruckName varchar(55), foodNames text);
    INSERT INTO intermediate_6(foodTruckName, foodNames)
	(SELECT MenuItem.foodTruckName, GROUP_CONCAT(DISTINCT(MenuItem.foodName) SEPARATOR ', ') FROM MenuItem
    WHERE MenuItem.foodTruckName IN (SELECT foodTruckName FROM intermediate_4)
    GROUP BY foodTruckName);

--  Inserting the results by joining the intermediates on their shared columns (manager username & food truck name)

    INSERT INTO cus_current_information_foodTruck_result(foodTruckName, managerName, foodNames)
    SELECT intermediate_4.foodTruckName, managerName, foodNames
    FROM intermediate_4
    INNER JOIN intermediate_5 ON intermediate_4.managerUsername = intermediate_5.managerUsername
    INNER JOIN intermediate_6 ON intermediate_4.foodTruckName = intermediate_6.foodTruckName;
--
END //
DELIMITER ;

-- call cus_order ('2020-01-04', 'tharvin')
-- select * from orders
-- Query #30: cus_order [Screen #18 Customer Order]
DROP PROCEDURE IF EXISTS cus_order;
DELIMITER //
CREATE PROCEDURE cus_order(IN i_date DATE, IN i_customerUsername VARCHAR(55))
BEGIN

	INSERT INTO orders(date, customerUsername)
	VALUES (i_date, i_customerUsername);


END //
DELIMITER ;

-- Query #31: cus_add_item_to_order [Screen #18 Customer Order]
-- Adds a quantity of food to an order if and only if a customer's balance can
-- afford the food price x quantity. If successful, make sure to deduct
-- from their balance too.

-- call cus_add_item_to_order('newtrukkkk', 'Pie', 1, 1014)
-- select * from add_result
-- select * from customer
DROP PROCEDURE IF EXISTS cus_add_item_to_order;
DELIMITER //
CREATE PROCEDURE cus_add_item_to_order(IN i_foodTruckName VARCHAR(55), IN i_foodName VARCHAR(55), IN i_purchaseQuantity INT, IN i_orderId INT)
BEGIN

	-- DROP TABLE IF EXISTS added_result;
   -- CREATE TABLE added_result(foodTruckName VARCHAR(55), foodName VARCHAR(55), foodPrice DECIMAL(6,2), purchaseQuantity INT, orderId INT, username VARCHAR(55), customerBalance decimal(6,2));
    -- need total price (item price, quantity), balance
    -- -- check if the customer can afford it
    -- -- if so, deduct from balance
    -- -- if not, do nothing
-- here I am just making a table to keep track of all the variables
	-- INSERT INTO added_result(foodTruckName, foodName, foodPrice, purchaseQuantity, orderId, username, customerBalance)
   -- VALUES (i_foodTruckName, i_foodName, 

-- select * from add_result
-- select * from orders where customerusername = 'beBatman!'
-- select * from orderdetail where orderID = 2024
-- select * from customer where username = 'beBatman!'
-- call cus_add_item_to_order("CrazyPies", "MargheritaPizza", "1", "2017")

-- set @cost = (SELECT price FROM menuitem WHERE menuitem.foodTruckName = 'FoodTruckYoureLookingFor' AND menuitem.foodName = 'Nachos')*2;
	set @custusername = (SELECT customerUsername FROM orders INNER JOIN customer ON customer.username = orders.customerUsername WHERE orderID = i_orderID);
	set @cost = (SELECT price FROM menuitem WHERE menuitem.foodTruckName = i_foodTruckName AND menuitem.foodName = i_foodName)*i_purchaseQuantity;
    set @oldbalance = (SELECT balance FROM customer WHERE username = @custusername);
    
	IF (@cost <= @oldbalance) THEN
		INSERT INTO orderdetail(orderID, foodTruckName, foodName, purchaseQuantity)
		VALUES (i_orderID, i_foodTruckName, i_foodName, i_purchaseQuantity);
    set @newbalance = @oldbalance - @cost; 
    
    update customer set balance = @newbalance where username = @custusername;
    set @oldbalance = @newbalance;
    -- (SELECT customerUsername FROM orders INNER JOIN customer ON customer.username = orders.customerUsername WHERE orderID = i_orderID);
    END IF;
    
END //
DELIMITER ;

-- call cus_add_item_to_order('BurgerBird', 'Pie', 5, 2015)
-- select * from menuItem where foodtruckName = 'BurgerBird'

-- Query #32: cus_order_history [Screen #19 Customer Order History]

-- call cus_order_history('tharvin')
-- select * from cus_order_history_result


-- call cus_order_history('tharvin')
-- select * from cus_order_history_result

-- select * from ordersList

DROP PROCEDURE IF EXISTS cus_order_history;
DELIMITER //
CREATE PROCEDURE cus_order_history(IN i_customerUsername VARCHAR(55))
BEGIN
	DROP TABLE IF EXISTS cus_order_history_result;
    CREATE TABLE cus_order_history_result(`date` date, orderID char(10), orderTotal DECIMAL(6, 2), foodNames varchar(100), foodQuantity int);
        
			DROP TABLE IF EXISTS ordersList;
			CREATE TABLE ordersList (orderID INT);
			insert into ordersList(orderId) (
			select orderID from orders where customerUsername = i_customerUsername); -- this will be the starting list of orderID's.

			DROP TABLE IF EXISTS orderMaster; -- this table containts ORDER ID, food truck name, food name, purchase qty. 
			CREATE TABLE orderMaster (orderID INT, foodTruckName  VARCHAR(55), foodName VARCHAR(55), purchaseQuantity INT);
			insert into orderMaster(orderID, foodTruckName, foodName, purchaseQuantity) (
				select orderslist.orderID, foodTruckName, foodName, purchaseQuantity from orderdetail INNER JOIN orderslist on orderdetail.orderID = ordersList.orderID);
                
             --   select * from orderMaster2;

			DROP TABLE IF EXISTS orderMaster2; -- this table is intermediary
			CREATE TABLE orderMaster2 (orderID INT, foodName VARCHAR(55), purchaseQuantity INT, orderTotal DEC(6,2));
			insert into orderMaster2(orderID, foodName, purchaseQuantity, orderTotal) (
				select orderID, menuitem.foodName, orderMaster.purchaseQuantity "purchaseQuantity", menuitem.price * orderMaster.purchaseQuantity as "orderTotal"
			from menuitem JOIN orderMaster on orderMaster.foodTruckName = menuitem.foodTruckName AND orderMaster.foodName = menuitem.foodName);
 
			DROP TABLE IF EXISTS tempTable2;
			CREATE TABLE tempTable2 (orderID INT, OrderTotal DEC(6,2), FoodQuantity INT);
			INSERT INTO tempTable2(orderID, OrderTotal, FoodQuantity) (
				select T.orderID "OrderID", T.OrderTotal "OrderTotal", T.FoodQuantity "FoodQuantity" from (
					select orderMaster2.orderID, sum(purchaseQuantity) "FoodQuantity", sum(orderTotal) "OrderTotal" from orderMaster2 GROUP BY orderId) as T);
			-- select * from tempTable2
            
            insert into cus_order_history_result (`date`, orderID, orderTotal, foodNames, foodquantity) (        
				select orders.date as "`date`", tempTable2.orderID "orderID", tempTable2.orderTotal "orderTotal", T.foods "foodNames", tempTable2.foodquantity "foodQuantity" from tempTable2 join orders on orders.orderID = tempTable2.orderID
				INNER JOIN (select orderID, GROUP_CONCAT(foodName SEPARATOR ', ') "foods"
		from orderMaster2
		GROUP BY orderID) as T on T.orderID = orders.orderID);
        
        -- select * from cus_order_history_result

END //
DELIMITER ;