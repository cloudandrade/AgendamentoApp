CREATE SCHEMA `agendamento` DEFAULT CHARACTER SET utf8;

USE `agendamento`;

CREATE TABLE `paciente` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nome` varchar(255) NOT NULL,
	`idade` INT NOT NULL,
	`telefone` VARCHAR(11) NOT NULL,
	`endereco_id` INT NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	`senha` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `medico` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nome` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	`senha` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `agendamento` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`horario` varchar(5) NOT NULL,
	`data` varchar(255) NOT NULL,
	`id_paciente` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `endereco` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`logradouro` varchar(255) NOT NULL,
	`numero` INT NOT NULL,
	`bairro` varchar(255) NOT NULL,
	`cidade` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

insert into medico (nome, email, senha) values ('Roberto Miranda', 'admin@admin.com','$2a$08$IlSG4lrXtDfWV5nprqvEMOS8upzN3e8THUR5EKKbnbNGU/5KSDpt2');

insert into endereco (logradouro, numero, bairro, cidade) values ('rua das margaridas', 36, 'vale do limoreiro', 'salvador');
insert into paciente (nome, idade, telefone, endereco_id, email, senha ) values ('João Claudio Andrade', 28, 71986712633, 1, 'claudio@gmail.com', '1234567');
insert into endereco (logradouro, numero, bairro, cidade) values ('rua jardim das margaridas', 33, 'itapoã', 'salvador');
insert into paciente (nome, idade, telefone, endereco_id, email, senha ) values ('Joana Simões', 36, 71958623458, 2, 'joanasims@gmail.com', '1234567');
insert into endereco (logradouro, numero, bairro, cidade) values ('travessa da taboca', 11, 'vale dos rios', 'salvador');
insert into paciente (nome, idade, telefone, endereco_id, email, senha ) values ('Juliano Silva', 48, 71945782134, 3, 'julianoss@gmail.com', '1234567');
insert into endereco (logradouro, numero, bairro, cidade) values ('av brasiliana', 142, 'cabula', 'salvador');
insert into paciente (nome, idade, telefone, endereco_id, email, senha ) values ('Alex Souza', 50, 7198671263, 4, 'alexus@gmail.com', '1234567');



