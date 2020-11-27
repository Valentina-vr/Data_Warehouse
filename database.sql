CREATE DATABASE `data_warehouse`;

CREATE TABLE IF NOT EXISTS `data_warehouse`.`user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
SELECT * FROM data_warehouse.user;

CREATE TABLE IF NOT EXISTS `data_warehouse`.`region` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `data_warehouse`.`country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `regionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `regionId` (`regionId`),
  CONSTRAINT `country_ibfk_1` FOREIGN KEY (`regionId`) REFERENCES `region` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `data_warehouse`.`contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `company` varchar(50) NOT NULL,
  `region` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `interest` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `data_warehouse`.`company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `data_warehouse`.`city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `countryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `countryId` (`countryId`),
  CONSTRAINT `city_ibfk_1` FOREIGN KEY (`countryId`) REFERENCES `country` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `data_warehouse`.`region`
(`id`,`name`,`createdAt`,`updatedAt`)
VALUES
    ('1','America del sur','2020-11-27 00:50:50','2020-11-27 00:50:50'),
    ('2','Europa occidental','2020-11-27 00:50:50','2020-11-27 00:50:50'),
    ('3','Europa central','2020-11-27 00:50:50','2020-11-27 00:50:50'),
    ('4','Nordeste de Asia','2020-11-27 00:50:50','2020-11-27 00:50:50')
;

INSERT INTO `data_warehouse`.`country`
    (`id`,`name`,`createdAt`,`updatedAt`,`regionId`)
VALUES
    ('1','Colombia','2020-11-27 00:50:50','2020-11-27 00:50:50','1'),
    ('2','france','2020-11-27 00:50:50','2020-11-27 00:50:50','2'),
    ('3','Germany','2020-11-27 00:50:50','2020-11-27 00:50:50','3'),
    ('4','Japan','2020-11-27 00:50:50','2020-11-27 00:50:50','4')
;

INSERT INTO `data_warehouse`.`city`
    (`id`,`name`,`countryId`)
VALUES
    ('1','Medellin','1'),
    ('2','Bogotá','1'),
    ('3','Cali','1'),
    ('4','Paris','2'),
    ('5','Toulouse','2'),
    ('6','Montpellier','2'),
    ('7','Berlín','3'),
    ('8','Hamburgo','3'),
    ('9','Munich','3'),
    ('10','Amsterdam','4')
;

INSERT INTO `data_warehouse`.`user`
    (`id`,`name`,`lastname`,`email`,`password`,`rol`,`createdAt`,`updatedAt`)
VALUES
    ('1','Valentina','Villada','admin@advantage.com','admin','Administrador','2020-11-27 00:50:50','2020-11-27 00:50:50'),
    ('2','Alondra','Ferrero','alondra@advantage.com','1234','Usuario','2020-11-27 00:50:50','2020-11-27 00:50:50'),
    ('3','Cassandra','Montana','alexandra@advantage.com','1234','Usuario','2020-11-27 00:50:50','2020-11-27 00:50:50'),
    ('4','Federico','Castaño','Federico@advantage.com','1234','Administrador','2020-11-27 00:50:50','2020-11-27 00:50:50')
;

INSERT INTO `data_warehouse`.`company`
    (`id`,`name`,`country`,`city`,`address`,`email`,`phone`,`createdAt`,`updatedAt`)
VALUES
    ('1','Bancolombia','1','1','Carrera 48 #26-85','bancolombia@bancolombia.com','5109000','2020-11-27 00:50:50','2020-11-27 00:50:50'),
    ('2','Louis Vuitton','2','2','Carrera 49 #63-95','louis@vuitton.com','5108956','2020-11-27 00:50:50','2020-11-27 00:50:50'),
    ('3','Volkswagen','3','3','Carrera 89 #56-89','volkswagen@volkswagen.com','5103265','2020-11-27 00:50:50','2020-11-27 00:50:50'),
    ('4','Nintendo','4','4','Carrera 96 #14-36','nintendo@nintendo.com','5107898','2020-11-27 00:50:50','2020-11-27 00:50:50')
;

INSERT INTO `data_warehouse`.`contacts`
    (`id`,`name`,`lastname`,`role`,`email`,`company`,`region`,`country`,`city`,`address`,`interest`,`createdAt`,`updatedAt`)
VALUES
    ('1','Freddie','Mercury','Singer','freddie@gmail.com','3','1','1','1','Street 25 # 4567','25','2020-11-27 00:50:50','2020-11-27 00:50:50'),
    ('2','Shuntaro','Furukawa','CEO','Furukawa@gmail.com','4','4','4','4','Street 98 # 4897','25','2020-11-27 00:50:50','2020-11-27 00:50:50')
;