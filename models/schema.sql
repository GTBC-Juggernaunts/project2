DROP DATABASE IF EXISTS currentdb;
CREATE DATABASE currentdb;

USE currentdb;

CREATE TABLE `property` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`landlordid` INT NOT NULL,
	`address` VARCHAR(255) NOT NULL,
	`description` VARCHAR(255) NOT NULL,
	`capacity` INT NOT NULL,
	`rent` FLOAT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `landlords` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`landlordname` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	`createdtimestamp` DATETIME NOT NULL,
	`lastupdatedtimestamp` DATETIME NOT NULL,
	`tenantid` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `maintenance` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`requesttypeid` INT NOT NULL,
	`description` VARCHAR(255) NOT NULL,
	`propertyid` INT NOT NULL,
	`landlordid` INT NOT NULL,
	`tenantid` INT NOT NULL,
	`requeststatus` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `requesttype` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`type` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `leases` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`propertyid` INT NOT NULL,
	`tenantid` INT NOT NULL,
	`leasename` VARCHAR(255) NOT NULL,
	`binaryfile` BINARY NOT NULL,
	`signdate` DATE NOT NULL,
	`updateddate` DATE NOT NULL,
	`isActive` BOOLEAN NOT NULL,
	`startdate` DATE NOT NULL,
	`enddate` DATE NOT NULL,
	`rent` FLOAT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `payments` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`leaseid` INT NOT NULL,
	`datedue` DATE NOT NULL,
	`paymentamt` FLOAT NOT NULL,
	`paymentstatus` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `paymentstatus` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`status` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `tenants` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`tenantname` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	`createdtimestamp` DATETIME NOT NULL,
	`lastupdatedtimestamp` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `images` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`imageurl` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `property` ADD CONSTRAINT `property_fk0` FOREIGN KEY (`landlordid`) REFERENCES `landlords`(`id`);

ALTER TABLE `landlords` ADD CONSTRAINT `landlords_fk0` FOREIGN KEY (`tenantid`) REFERENCES `tenants`(`id`);

ALTER TABLE `maintenance` ADD CONSTRAINT `maintenance_fk0` FOREIGN KEY (`requesttypeid`) REFERENCES `requesttype`(`id`);

ALTER TABLE `maintenance` ADD CONSTRAINT `maintenance_fk1` FOREIGN KEY (`propertyid`) REFERENCES `property`(`id`);

ALTER TABLE `maintenance` ADD CONSTRAINT `maintenance_fk2` FOREIGN KEY (`landlordid`) REFERENCES `landlords`(`id`);

ALTER TABLE `maintenance` ADD CONSTRAINT `maintenance_fk3` FOREIGN KEY (`tenantid`) REFERENCES `tenants`(`id`);

ALTER TABLE `leases` ADD CONSTRAINT `leases_fk0` FOREIGN KEY (`propertyid`) REFERENCES `property`(`id`);

ALTER TABLE `leases` ADD CONSTRAINT `leases_fk1` FOREIGN KEY (`tenantid`) REFERENCES `tenants`(`id`);

ALTER TABLE `payments` ADD CONSTRAINT `payments_fk0` FOREIGN KEY (`leaseid`) REFERENCES `leases`(`id`);

ALTER TABLE `payments` ADD CONSTRAINT `payments_fk1` FOREIGN KEY (`paymentstatus`) REFERENCES `paymentstatus`(`id`);
